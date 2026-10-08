import React from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  FileCheck2, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Cpu,
  Clock
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* 1. HERO - GIỚI THIỆU CHÍNH */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>Sáng Kiến Chuyển Đổi Số Giáo Dục</span>
          <span className="text-sky-300">•</span>
          <span className="text-sky-600 font-bold">Chuẩn Công Văn 7991/BGDĐT-GDTrH</span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          Nền Tảng Trợ Lý Khảo Thí & <br className="hidden sm:inline" />
          <span className="text-sky-600 underline decoration-sky-200 decoration-wavy underline-offset-8">
            Chuẩn Hóa Ma Trận Đề Thi
          </span>
        </h1>

        {/* Đoạn giới thiệu ngắn */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
          Giải pháp công nghệ chuyên biệt dành cho giáo viên phổ thông: Số hóa quy trình xây dựng Khung Ma trận và Bản đặc tả đề kiểm tra định kỳ, đảm bảo tính chuẩn xác khoa học và tuân thủ tuyệt đối quy định của Bộ Giáo dục & Đào tạo.
        </p>

        {/* 3 Thẻ thống kê cốt lõi */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm hover:border-sky-200 transition-all">
            <div className="text-2xl font-extrabold text-sky-600 mb-1">40 - 30 - 30</div>
            <div className="text-xs font-bold text-slate-900">Tỉ Lệ Nhận Thức Chuẩn</div>
            <div className="text-[11px] text-slate-500 mt-1">40% Biết – 30% Hiểu – 30% Vận dụng trên thang 10.0 điểm</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm hover:border-sky-200 transition-all">
            <div className="text-2xl font-extrabold text-sky-600 mb-1">4 Dạng Thức</div>
            <div className="text-xs font-bold text-slate-900">Quy Định Đánh Giá Mới</div>
            <div className="text-[11px] text-slate-500 mt-1">Trắc nghiệm nhiều LC, Đúng/Sai lũy tiến, Điền ngắn & Tự luận</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm hover:border-sky-200 transition-all">
            <div className="text-2xl font-extrabold text-sky-600 mb-1">Nghị Định 30</div>
            <div className="text-xs font-bold text-slate-900">Chuẩn Thể Thức Học Thuật</div>
            <div className="text-[11px] text-slate-500 mt-1">Định dạng A4 chuẩn lề, phông Times New Roman đồng nhất</div>
          </div>
        </div>
      </section>

      {/* 2. Ý NGHĨA & BỐI CẢNH (TẠI SAO CẦN NỀN TẢNG NÀY?) */}
      <section className="py-16 bg-slate-50/50 border-y border-sky-100/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Bối Cảnh Thực Tiễn</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Giải Quyết Khó Khăn Của Giáo Viên Trong Công Tác Ra Đề
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Chương trình GDPT 2018 đặt ra yêu cầu đánh giá năng lực khắt khe với hệ thống ma trận và bản đặc tả chi tiết.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box Trở ngại cũ */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Trở ngại thực tế trong thực hiện thủ công</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Mất nhiều giờ tính toán phân bổ điểm lẻ cho dạng thức Đúng/Sai (0.1đ - 0.25đ - 0.5đ - 1.0đ) để khớp tròn 10.0 điểm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Khó đối chiếu chính xác từng Yêu cầu cần đạt (YCCĐ) trong chương trình môn học với các câu hỏi kiểm tra.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Định dạng bảng biểu trong phần mềm soạn thảo thường bị tràn lề, vỡ khung khi chia sẻ giữa các đồng nghiệp.</span>
                </li>
              </ul>
            </div>

            {/* Box Giá trị mang lại */}
            <div className="p-6 rounded-2xl bg-white border border-sky-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/50 rounded-full blur-2xl -z-10" />
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Giá trị tối ưu hóa của nền tảng</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span>Tự động cân bằng tỉ lệ nhận thức chuẩn xác 100%, không xảy ra sai lệch điểm số hay lệch ma trận.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span>Chuẩn hóa Bản đặc tả theo từng mạch kiến thức, giúp giáo viên dễ dàng giải trình trước Hội đồng chuyên môn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span>Tiết kiệm hơn 85% thời gian chuẩn bị hồ sơ kiểm tra định kỳ cho mỗi giáo viên bộ môn.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BỐN TRỤ CỘT CHỨC NĂNG CỐT LÕI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Hệ Thống Chức Năng</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Bốn Trụ Cột Đạt Chuẩn Bộ Giáo Dục & Đào Tạo
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Được nghiên cứu và thiết kế bám sát từng điều khoản trong Công văn 7991/BGDĐT-GDTrH ngày 17/12/2024.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trụ cột 1 */}
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. Khung Ma Trận Đa Chiều 10 Điểm</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thiết lập tự động mối quan hệ giữa Chủ đề, Đơn vị kiến thức và 3 mức độ nhận thức (Biết 4.0đ – Hiểu 3.0đ – Vận dụng 3.0đ), đảm bảo phân bổ đồng đều số câu theo từng thời lượng kiểm tra 45, 60 hoặc 90 phút.
            </p>
          </div>

          {/* Trụ cột 2 */}
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. Bản Đặc Tả Năng Lực Chi Tiết</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mô tả tường minh các Yêu cầu cần đạt (YCCĐ) theo chương trình giáo dục hiện hành, gắn nhãn chính xác từng câu hỏi thuộc Phần I, Phần II hay Phần III để việc ra đề thi thực tế hoàn toàn bám sát mục tiêu bài học.
            </p>
          </div>

          {/* Trụ cột 3 */}
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. Chuẩn Hóa 4 Dạng Thức Khảo Thí Mới</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hỗ trợ đầy đủ các dạng câu hỏi hiện đại: Trắc nghiệm 4 lựa chọn (Phần I), Câu hỏi Đúng/Sai với thang điểm lũy tiến (Phần II), Câu hỏi trả lời ngắn (Phần III) và phần Tự luận phù hợp cho từng bộ môn.
            </p>
          </div>

          {/* Trụ cột 4 */}
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4. Trực Quan Hóa & Xuất Bản Học Thuật</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Giao diện mô phỏng trang giấy A4 trực quan, cho phép giáo viên tinh chỉnh trực tiếp nội dung trước khi xuất bản thành tệp văn bản định dạng chuẩn để in ấn hoặc lưu trữ trong hồ sơ kiểm định của nhà trường.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ĐỐI TƯỢNG PHỤC VỤ & PHẠM VI ỨNG DỤNG */}
      <section className="py-16 bg-gradient-to-b from-white to-sky-50/40 border-t border-sky-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-sky-200/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-3">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <span>Phạm Vi Ứng Dụng Chuyên Môn</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Phục Vụ Tất Cả Bộ Môn Từ Lớp 6 Đến Lớp 12
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nền tảng được xây dựng tương thích linh hoạt với cả 3 bộ sách giáo khoa (Kết nối tri thức, Cánh Diều, Chân trời sáng tạo) và phục vụ cho tất cả các đợt kiểm tra Giữa học kỳ và Cuối học kỳ của bậc THCS và THPT.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-2.5">
              <div className="px-4 py-3 rounded-xl bg-sky-50/70 border border-sky-100 text-xs font-semibold text-slate-800 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Trung học Cơ sở (Khối 6, 7, 8, 9)</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-sky-50/70 border border-sky-100 text-xs font-semibold text-slate-800 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Trung học Phổ thông (Khối 10, 11, 12)</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-sky-50/70 border border-sky-100 text-xs font-semibold text-slate-800 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Kiểm tra Giữa kỳ & Cuối kỳ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER TRANG NHÃ */}
      <footer className="border-t border-slate-200 py-10 bg-white text-slate-500 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <GraduationCap className="w-5 h-5 text-sky-600" />
            <span>Trợ Lý Khảo Thí CV 7991</span>
          </div>
          <p className="text-slate-500 text-xs">
            Căn cứ pháp lý: Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo.
          </p>
          <p className="text-slate-400 text-xs">
            Sáng kiến hỗ trợ giáo dục số 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
