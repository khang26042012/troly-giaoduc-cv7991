import React from "react";
import { 
  ShieldCheck, 
  Layers, 
  FileCheck2, 
  BookOpen, 
  Check, 
  Sparkles,
  Award,
  Compass,
  FileSpreadsheet
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* 1. THANH ĐIỀU HƯỚNG TỐI GIẢN (MICRO HEADER) */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold text-xs">
              7991
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900">
              Trợ Lý Khảo Thí
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">Quy chuẩn GDPT 2018</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>CV 7991/BGDĐT-GDTrH</span>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION - ĐẲNG CẤP, TỰ NHIÊN, KHOA HỌC */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Nhãn văn bản quy chuẩn */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/80 mb-6">
          <Award className="w-3.5 h-3.5 text-sky-600" />
          <span>Chuẩn Khảo Thí Định Kỳ Bộ GD&ĐT</span>
        </div>

        {/* Tiêu đề chính lớn, tracking chặt, tương phản cao */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.15] max-w-4xl mx-auto">
          Chuẩn Hóa Ma Trận & Bản Đặc Tả Đề Kiểm Tra Theo{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
            Công Văn 7991
          </span>
        </h1>

        {/* Đoạn dẫn dắt tự nhiên, thoát ý */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Nền tảng số hóa học thuật hỗ trợ giáo viên phổ thông xây dựng khung ma trận 10 điểm, phân bổ chuẩn xác tỉ lệ 40-30-30 và tích hợp 4 dạng thức đánh giá năng lực mới một cách khoa học.
        </p>

        {/* 3 CHỈ SỐ CỐT LÕI - THIẾT KẾ PHẲNG TINH TẾ */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100 text-left">
            <div className="text-xs font-bold text-sky-700 tracking-wide uppercase">Tỉ Lệ Vàng</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">40 : 30 : 30</div>
            <p className="text-xs text-slate-500 mt-1.5 leading-snug">
              40% Nhận biết – 30% Thông hiểu – 30% Vận dụng trên thang điểm 10.0
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100 text-left">
            <div className="text-xs font-bold text-sky-700 tracking-wide uppercase">Cấu Trúc Đề</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">4 Dạng Thức</div>
            <p className="text-xs text-slate-500 mt-1.5 leading-snug">
              Trắc nghiệm 4 lựa chọn, Đúng/Sai lũy tiến, Trả lời ngắn & Tự luận
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100 text-left">
            <div className="text-xs font-bold text-sky-700 tracking-wide uppercase">Văn Bản Hành Chính</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">Nghị Định 30</div>
            <p className="text-xs text-slate-500 mt-1.5 leading-snug">
              Định dạng trang in A4 chuẩn lề, phông Times New Roman đồng nhất
            </p>
          </div>
        </div>

        {/* 3. VISUAL SHOWCASE: MÔ PHỎNG MA TRẬN A4 KỸ THUẬT SỐ */}
        <div className="mt-16 text-left max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-100 shadow-xl shadow-sky-100/50 relative overflow-hidden">
            {/* Header khung xem trước */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Cấu Trúc Khung Mẫu</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Khung Ma Trận Kiểm Tra Định Kỳ (Phụ Lục CV 7991)</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                <Check className="w-3.5 h-3.5" />
                <span>Tổng Điểm: 10.0 (100%)</span>
              </div>
            </div>

            {/* Thanh cân bằng năng lực thị giác */}
            <div className="py-6 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Phân Bổ Tỉ Lệ Mức Độ Nhận Thức</span>
                <span className="text-slate-400">Thang 10 điểm</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-sky-600 h-full w-[40%]" title="Nhận biết 40%" />
                <div className="bg-sky-400 h-full w-[30%]" title="Thông hiểu 30%" />
                <div className="bg-sky-200 h-full w-[30%]" title="Vận dụng 30%" />
              </div>
              <div className="grid grid-cols-3 text-center text-xs pt-1 text-slate-600">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  <span>Biết: <strong>4.0đ</strong> (40%)</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Hiểu: <strong>3.0đ</strong> (30%)</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-200 border border-sky-300" />
                  <span>Vận dụng: <strong>3.0đ</strong> (30%)</span>
                </div>
              </div>
            </div>

            {/* Bảng mini mô phỏng trực quan */}
            <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-slate-50/40 p-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                    <th className="p-2.5 font-bold">Phần</th>
                    <th className="p-2.5 font-bold">Hình Thức Câu Hỏi</th>
                    <th className="p-2.5 font-bold">Cơ Chế Tính Điểm</th>
                    <th className="p-2.5 font-bold text-right">Mức Độ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-2.5 font-bold text-sky-700">Phần I</td>
                    <td className="p-2.5">Trắc nghiệm 4 lựa chọn</td>
                    <td className="p-2.5 text-slate-500">0.25 điểm / câu đúng</td>
                    <td className="p-2.5 text-right font-medium">Nhận biết & Thông hiểu</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-2.5 font-bold text-sky-700">Phần II</td>
                    <td className="p-2.5">Trắc nghiệm Đúng / Sai</td>
                    <td className="p-2.5 text-slate-500">Lũy tiến: 0.1 – 0.25 – 0.5 – 1.0đ</td>
                    <td className="p-2.5 text-right font-medium">Thông hiểu & Vận dụng</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-2.5 font-bold text-sky-700">Phần III</td>
                    <td className="p-2.5">Câu hỏi trả lời ngắn</td>
                    <td className="p-2.5 text-slate-500">0.25đ hoặc 0.5 điểm / câu</td>
                    <td className="p-2.5 text-right font-medium">Vận dụng giải quyết vấn đề</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BỐN TRỤ CỘT CHỨC NĂNG - BENTO GRID HIỆN ĐẠI */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Hệ Thống Tiêu Chuẩn</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Bốn Trụ Cột Đổi Mới Khảo Thí Định Kỳ
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Bám sát từng chỉ dẫn kỹ thuật trong Công văn 7991/BGDĐT-GDTrH ban hành ngày 17/12/2024.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bento Card 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">01</span>
                <Layers className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Khung Ma Trận Ma Trận Đa Chiều 10 Điểm</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tự động liên kết mạch kiến thức, đơn vị bài học với 3 mức độ nhận thức. Đảm bảo tổng số điểm tròn 10.0 tuyệt đối, giải quyết triệt để lỗi làm tròn hoặc lệch tỉ lệ thường gặp khi lập thủ công.
              </p>
            </div>

            {/* Bento Card 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">02</span>
                <BookOpen className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Bản Đặc Tả Yêu Cầu Cần Đạt (YCCĐ)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mô tả chi tiết năng lực người học cần thể hiện theo từng câu hỏi. Phân định rõ câu nào thuộc Phần I, Phần II hay Phần III, giúp tổ bộ môn dễ dàng bảo vệ đề trước ban giám hiệu và thanh tra chuyên môn.
              </p>
            </div>

            {/* Bento Card 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">03</span>
                <Compass className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Chuẩn Hóa 4 Dạng Thức Trắc Nghiệm Mới</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đáp ứng trọn vẹn định dạng đề thi mới nhất từ kỳ thi tốt nghiệp THPT và kiểm tra định kỳ cấp THCS: từ dạng trắc nghiệm nhiều phương án đến câu hỏi Đúng/Sai tính điểm lũy tiến và câu hỏi trả lời ngắn.
              </p>
            </div>

            {/* Bento Card 4 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">04</span>
                <FileCheck2 className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Xuất Bản Học Thuật Chuẩn Nghị Định 30</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trình bày văn bản khoa học theo quy định hành chính nhà nước: căn lề trang in chuẩn (trái 3cm, phải 1.5cm, trên/dưới 2cm), phông chữ Times New Roman 13pt và bảng biểu không bao giờ bị vỡ khung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHẠM VI ÁP DỤNG & GIÁ TRỊ THỰC TIỄN */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Phạm Vi Triển Khai</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight text-white">
              Đồng Hành Cùng Mọi Tổ Chuyên Môn THCS & THPT
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tương thích đầy đủ với cả 3 bộ sách giáo khoa hiện hành (Kết nối tri thức, Cánh Diều, Chân trời sáng tạo) cho tất cả các môn học từ Lớp 6 đến Lớp 12 trong toàn bộ các đợt kiểm tra Giữa học kỳ và Cuối học kỳ.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Cấp THCS (Lớp 6, 7, 8, 9)</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Cấp THPT (Lớp 10, 11, 12)</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Kiểm tra Giữa kỳ & Cuối kỳ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER SANG TRỌNG, KHOA HỌC */}
      <footer className="border-t border-slate-100 py-10 text-slate-500 text-xs bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-sky-100 text-sky-700 font-bold text-[10px] flex items-center justify-center">
              7991
            </div>
            <span className="font-bold text-slate-900">Trợ Lý Khảo Thí CV 7991</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Căn cứ pháp lý: Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo.
          </p>
          <p className="text-slate-400 text-[11px]">
            Sáng kiến chuyển đổi số sư phạm 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
