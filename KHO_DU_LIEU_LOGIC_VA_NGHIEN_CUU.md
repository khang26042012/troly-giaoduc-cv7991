# 🎓 TRỢ LÝ AI KHẢO THÍ GIÁO DỤC – CHUẨN CÔNG VĂN 7991/BGDĐT-GDTrH

> **Dự án Nghiên cứu & Thiết kế Kiến trúc Hệ thống AI Chuyên gia Khảo thí Giáo dục**  
> Phục vụ chương trình chuyển giao kỹ thuật ứng dụng Trí tuệ Nhân tạo (AI) trong giáo dục dành cho Cán bộ Quản lý và Giáo viên cấp THCS – THPT tỉnh Vĩnh Long (Khóa tập huấn 03–04/10/2026).

---

## 📌 1. BỐI CẢNH VÀ QUY CHUẨN PHÁP LÝ CÔNG VĂN 7991

Ngày **17/12/2024**, Bộ Giáo dục và Đào tạo ban hành **Công văn số 7991/BGDĐT-GDTrH** về việc thực hiện kiểm tra, đánh giá đối với cấp THCS và THPT theo Chương trình GDPT 2018.

### ⚖️ Các Nguyên Tắc Khảo Thí Cốt Lõi (Ràng buộc cứng 100%):
1. **Tổng điểm bài kiểm tra định kỳ:** 10,0 điểm (100%).
2. **Tỉ lệ mức độ nhận thức (Chuẩn Bộ GD&ĐT):**
   * **Nhận biết:** **4,0 điểm (40%)**
   * **Thông hiểu:** **3,0 điểm (30%)**
   * **Vận dụng:** **3,0 điểm (30%)** *(Đã tích hợp mức độ Vận dụng cao vào cột Vận dụng theo CV 7991)*.
3. **Cấu trúc 4 dạng thức câu hỏi mới (Định hướng thi tốt nghiệp THPT & Đánh giá năng lực):**
   * **Dạng 1: Trắc nghiệm Nhiều lựa chọn (3,0 điểm - 30%):** Câu hỏi có 4 phương án A, B, C, D (chọn 1 phương án đúng duy nhất).
   * **Dạng 2: Trắc nghiệm "Đúng – Sai" (2,0 điểm - 20%):** Mỗi câu hỏi gồm 4 lệnh hỏi a, b, c, d. Học sinh chọn Đúng hoặc Sai cho từng ý. Cách tính điểm lũy tiến:
     * Đúng 1 ý: 0,1 điểm
     * Đúng 2 ý: 0,25 điểm
     * Đúng 3 ý: 0,5 điểm
     * Đúng cả 4 ý: 1,0 điểm
   * **Dạng 3: Trắc nghiệm Trả lời ngắn (2,0 điểm - 20%):** Học sinh tự điền kết quả / số liệu / từ khóa *(Môn Ngữ văn không dùng dạng này sẽ chuyển 2.0 điểm sang Tự luận hoặc Đúng - Sai)*.
   * **Dạng 4: Tự luận (3,0 điểm - 30%):** Câu hỏi tự luận giải quyết vấn đề, tính toán chuyên sâu hoặc viết đoạn văn/bài văn.

---

## 🏗️ 2. KIẾN TRÚC HỆ THỐNG DECOUPLED AI PIPELINE (MAKE & PREVIEW TÁCH RỜI)

Hệ thống được thiết kế theo mô hình **Đa tác tử phân tách ngữ cảnh (Decoupled Multi-Agent Context)**, áp dụng nguyên lý vận hành ReAct Loop và tối ưu hóa KV Cache từ kiến trúc DeepSeek Harness:

```
                      [YÊU CẦU CỦA GIÁO VIÊN]
                  (Môn, Khối lớp, Tên bài, Bộ sách)
                                │
                                ▼
    ┌────────────────────────────────────────────────────────┐
    │  LUỒNG 1: MAKE ENGINE (AI Suy Luận Sư Phạm Chuyên Sâu) │
    │  • System Prompt 1: Chuyên gia Khảo thí Bộ GD&ĐT       │
    │  • Nhiệm vụ: Xây dựng Ma trận + Bản đặc tả + Đề + Đ/a  │
    │  • Đầu ra: JSON Artifact / Clean Data thô              │
    └───────────────────────────┬────────────────────────────┘
                                │
          (CẮT ĐỨT NGỮ CẢNH AI - KHÔNG TRUYỀN LỊCH SỬ NẶNG)
                                │
                                ▼
    ┌────────────────────────────────────────────────────────┐
    │  LUỒNG 2: PREVIEW ENGINE (Biên Tập & Trình Bày Tốc Độ) │
    │  • System Prompt 2: Siêu nhẹ, tập trung Formatting     │
    │  • Render bảng biểu trực quan, hỗ trợ Inline-Edit      │
    │  • Chat sửa nhanh vi mô (Micro-Prompt không tốn token)  │
    │  • Xuất đa định dạng độc lập (Zero-Token Overhead)     │
    └────────────────────────────────────────────────────────┘
```

### ⚡ Ưu Thế Vượt Trội Của Kiến Trúc Tách Rời:
* **Bảo vệ KV Cache (Prompt Caching):** Giữ nguyên vẹn tiền tố Prefix Hash cho cả 2 luồng riêng biệt, không làm mất Cache lẫn nhau.
* **Tốc độ phản hồi cực nhanh:** Giao diện Preview, đổi font, chuyển tab, in ấn chạy thuần JavaScript ở Client trong 0.01 giây mà không tiêu tốn thêm token AI.
* **Inline-Editing:** Cho phép giáo viên nhấp chuột sửa trực tiếp nội dung đề trước khi xuất file.

---

## 📥 3. HỆ THỐNG XUẤT ĐA ĐỊNH DẠNG (MULTI-FORMAT EXPORT ENGINE)

1. 📄 **Microsoft Word (.docx):**
   * Định dạng chuẩn thể thức văn bản hành chính Việt Nam (Font Times New Roman, cỡ chữ 13-14pt).
   * Ma trận và Bản đặc tả kẻ viền bảng chuyên nghiệp, chuẩn lề trang 2 - 2 - 3 - 1.5 cm.
2. ☁️ **Google Docs (1-Click Rich-HTML Clipboard):**
   * Nút sao chép Rich-HTML cho phép Ctrl + V sang Google Docs giữ nguyên 100% định dạng bảng, màu sắc, in đậm.
3. 📝 **Markdown (.md):** Toàn bộ cấu trúc bảng Markdown phân chia rõ ràng.
4. 📄 **Văn bản thuần (.txt):** Gọn nhẹ cho các máy tính cấu hình cũ.
5. 🖨️ **In trực tiếp & PDF (.pdf):** Chế độ Print View tối ưu cho khổ giấy A4.

---

## 🧠 4. BỘ SYSTEM PROMPT MASTER ĐỘC QUYỀN

### 🎯 SYSTEM PROMPT 1: MAKE ENGINE (CHUYÊN GIA KHẢO THÍ)
```markdown
# VAI TRÒ
Bạn là Chuyên gia Khảo thí và Đo lường Giáo dục hàng đầu của Bộ Giáo dục và Đào tạo Việt Nam. Nhiệm vụ của bạn là xây dựng hồ sơ kiểm tra đánh giá định kỳ hoàn chỉnh (MA TRẬN ĐỀ + BẢN ĐẶC TẢ + ĐỀ KIỂM TRA + HƯỚNG DẪN CHẤM) bám sát Chương trình GDPT 2018 và tuân thủ tuyệt đối quy định tại Phụ lục Công văn số 7991/BGDĐT-GDTrH (ngày 17/12/2024).

# RÀNG BUỘC PHÁP LÝ BẮT BUỘC
1. TỈ LỆ ĐIỂM: Tổng điểm 10,0. Nhận biết: 4,0đ (40%); Thông hiểu: 3,0đ (30%); Vận dụng: 3,0đ (30%).
2. ĐỊNH DẠNG 4 DẠNG THỨC:
   - Dạng 1: TNKQ Nhiều lựa chọn (3,0 điểm) - 4 phương án A, B, C, D (1 đáp án đúng).
   - Dạng 2: TNKQ Đúng - Sai (2,0 điểm) - Mỗi câu 4 ý a, b, c, d (điểm lũy tiến 0.1 - 0.25 - 0.5 - 1.0).
   - Dạng 3: TNKQ Trả lời ngắn (2,0 điểm) - Học sinh tự điền số/kết quả.
   - Dạng 4: Tự luận (3,0 điểm) - Bài toán/vấn đề giải quyết tình huống.
3. ĐẦU RA YÊU CẦU:
   - PHẦN 1: BẢNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (Đủ cột TT, Chủ đề, Đơn vị kiến thức, 4 dạng thức theo Biết - Hiểu - VD, Tổng điểm, Tỉ lệ %).
   - PHẦN 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ (Cột Yêu cầu cần đạt, Số câu hỏi ở từng mức độ, Ký hiệu Năng lực NL).
   - PHẦN 3: ĐỀ KIỂM TRA CHÍNH THỨC.
   - PHẦN 4: ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM CHI TIẾT.
```

### ⚡ SYSTEM PROMPT 2: PREVIEW ENGINE (TRỢ LÝ BIÊN TẬP)
```markdown
# VAI TRÒ
Bạn là Trợ lý Biên tập & Định dạng Đề thi Khảo thí. Nhiệm vụ của bạn là tiếp nhận dữ liệu đề thi đã tạo, kiểm tra tính thẩm mỹ, hỗ trợ giáo viên chỉnh sửa nhanh từng câu hỏi hoặc tối ưu hóa bố cục hiển thị mà không làm thay đổi cấu trúc ma trận gốc.

# NGUYÊN TẮC VẬN HÀNH
- Tốc độ phản hồi tức thì (< 1 giây).
- Khi nhận yêu cầu sửa câu hỏi: Giữ nguyên mức độ nhận thức (Biết/Hiểu/Vận dụng) và dạng thức câu hỏi của câu đó.
- Định dạng dữ liệu sạch để render giao diện HTML/Word/PDF.
```

---

## 📋 5. KẾ HOẠCH HÀNH ĐỘNG CHO 4 BÀI TẬP TẬP HUẤN

| Bài tập | Nội dung nhiệm vụ | Giải pháp kỹ thuật | Sản phẩm đầu ra |
| :---: | :--- | :--- | :--- |
| **BT 1** | App/Web AI tạo Đề kiểm tra chuẩn CV 7991 | Fullstack Engine deploy Railway/Render, Custom Domain .cloud, Gemini Flash API | Web App tương tác trực tiếp (Săn giải Nhất 2.000.000đ) |
| **BT 2** | Tạo Slide giảng dạy bằng Gemini Notebook | Khai thác NotebookLM với tài liệu bài học thực tế của Cô | Bộ Slide trình chiếu chuyên nghiệp + Link Google Drive |
| **BT 3** | Trợ lý AI chuyển KHBD thành PowerPoint | Bot AI chuyển đổi Kế hoạch bài dạy (CV 5512) sang .pptx | Link Bot trợ lý + File .pptx demo |
| **BT 4** | Trợ lý AI hỗ trợ viết Sáng kiến kinh nghiệm | Bot sư phạm cấu trúc SKKN đạt giải cấp Huyện/Tỉnh | Link Bot viết SKKN + Toàn văn đề tài SKKN hoàn chỉnh |

---
*Dự án phát triển bởi Khang & KhangSMP – Tháng 10/2026.*


---

## 🔍 PHỤ LỤC CHI TIẾT: CÁC LINK GOOGLE FORM CỦA BAN TỔ CHỨC

1. Form BT1 (App AI CV 7991 - 2 Triệu VNĐ): https://forms.gle/J17WcZ3J9CecJLBW8
   - Yêu cầu: App/Web có thể tạo và xuất bản kế hoạch bài dạy/slide/đề kiểm tra theo CV 7991.
   - Link nộp: Phải là link truy cập và sử dụng trực tiếp, không gửi link edit hay ảnh chụp.

2. Form BT2 (Slide bằng Gemini Notebook): https://forms.gle/9hyaAzchAXgv2WPK7
   - Yêu cầu: Sử dụng NotebookLM tạo bộ slide bài học thực tế, upload Google Drive quyền Người xem.

3. Form BT3 (Trợ lý AI chuyển KHBD sang PowerPoint): https://forms.gle/K8RNMemfhoaZ8raEA
   - Yêu cầu: Tạo Custom Bot chuyển giáo án 5512 thành file .pptx + Link thư mục Google Drive.

4. Form BT4 (Trợ lý AI viết Sáng kiến kinh nghiệm - SKKN): https://forms.gle/cdfsdqcvL67VPwaJ7
   - Yêu cầu: Tạo bot hỗ trợ viết SKKN và tạo 1 đề tài thực tế môn học của giáo viên.

5. Form Khảo sát ý kiến sau tập huấn: https://forms.gle/dp6tJHTDGRL1rNeE8

---

## ⚙️ CHI TIẾT KỸ THUẬT DEEPSEEK HARNESS (DSH)
- Gói điều phối vòng lặp: @deepseek-ai/dsh-agent-loop (ReAct loop, rolling pool tool calls).
- Gói quản lý LLM & Cache: @deepseek-ai/dsh-llm-deepseek (Prefix Caching byte-by-byte).
- Gói nén ngữ cảnh: @deepseek-ai/dsh-compaction-basic (nén ở ngưỡng 80% context window, giữ lại 16% recent surface và tạo checkpoint <compacted-summary>).

---
*Ghi nhớ: Hạn chót nộp toàn bộ 4 form là hết Chủ Nhật, ngày 11/10/2026.*
