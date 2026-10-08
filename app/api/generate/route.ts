import { NextRequest, NextResponse } from "next/server";

// Cooldown & Rate Limit trong RAM server
const ipTracker = new Map<string, { lastRequest: number; count: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local-client";
    const now = Date.now();
    const track = ipTracker.get(ip) || { lastRequest: 0, count: 0 };

    // Cooldown 30s giữa 2 lần bấm tạo đề
    if (now - track.lastRequest < 30000) {
      const waitSec = Math.ceil((30000 - (now - track.lastRequest)) / 1000);
      return NextResponse.json(
        { error: `Hệ thống đang điều hòa lưu lượng. Vui lòng đợi ${waitSec}s trước khi tạo lại!` },
        { status: 429 }
      );
    }

    // Giới hạn 20 lần tạo / giờ cho mỗi IP để bảo vệ tài khoản Antigravity
    if (track.count >= 20 && now - track.lastRequest < 3600000) {
      return NextResponse.json(
        { error: "Đã đạt giới hạn 20 lượt tạo trong 1 giờ. Vui lòng chỉnh sửa trực tiếp trên bản xem trước!" },
        { status: 429 }
      );
    }

    // Cập nhật lượt
    ipTracker.set(ip, { lastRequest: now, count: track.count + 1 });

    const body = await req.json();
    const { subject, grade, duration, semester, textbook, topicPrompt } = body;

    const apiKey = process.env.NINE_ROUTER_API_KEY || "sk-8f7041f3855b1b1a-wmv4fk-2ea26ec8";
    const baseUrl = process.env.NINE_ROUTER_BASE_URL || "https://9router-production-8466.up.railway.app/v1";
    const model = process.env.NINE_ROUTER_MODEL || "ag/gemini-3.6-flash-low";

    // System prompt tinh gọn (<400 tokens) để bảo toàn quota
    const systemPrompt = `BẠN LÀ CHUYÊN GIA KHẢO THÍ VÀ THIẾT KẾ ĐỀ KIỂM TRA ĐỊNH KỲ.
QUY TẮC BẮT BUỘC:
- Tổng điểm: 10.0đ. Tỉ lệ: Biết 40% (4.0đ), Hiểu 30% (3.0đ), Vận dụng 30% (3.0đ).
- 4 Dạng thức: P.I (Trắc nghiệm nhiều lựa chọn 0.25đ/câu), P.II (Đúng/Sai chấm lũy tiến 0.1-0.25-0.5-1.0đ), P.III (Trả lời ngắn 0.25-0.5đ/câu), P.IV (Tự luận nếu có).
- TRẢ VỀ JSON NGUYÊN BẢN (KHÔNG markdown codeblock, KHÔNG chú thích):
{
  "matrix": [
    {
      "id": "m-1", "stt": 1, "topic": "Tên chủ đề", "subTopic": "Đơn vị kiến thức",
      "p1_biet": 2, "p2_biet": 1, "p3_biet": 0, "p4_biet": 0,
      "p1_hieu": 1, "p2_hieu": 1, "p3_hieu": 1, "p4_hieu": 0,
      "p1_vandung": 0, "p2_vandung": 0, "p3_vandung": 1, "p4_vandung": 0,
      "totalScore": 3.5, "percentage": 35
    }
  ],
  "specifications": [
    {
      "id": "s-1", "stt": 1, "topic": "Tên chủ đề", "subTopic": "Đơn vị kiến thức",
      "criteria": "Yêu cầu cần đạt chi tiết cho Biết, Hiểu, Vận dụng",
      "p1_count": "C1, C2 (NB)", "p2_count": "C13 (TH)", "p3_count": "C17 (VD)", "p4_count": "-"
    }
  ]
}`;

    const userPrompt = `Hãy lập ma trận và bản đặc tả cho môn: ${subject}, Lớp: ${grade}, Thời lượng: ${duration} phút, Kỳ thi: ${semester}, Bộ sách: ${textbook}. Yêu cầu nội dung kiến thức: ${topicPrompt || "Toàn bộ chương trình chuẩn theo phân phối học kỳ"}.`;

    const aiResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 3000,
        stream: false
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      return NextResponse.json({ error: "Lỗi kết nối AI Backend: " + errText }, { status: 502 });
    }

    const aiData = await aiResponse.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Clean codeblock nếu có
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const parsed = JSON.parse(content);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ rawText: content });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
