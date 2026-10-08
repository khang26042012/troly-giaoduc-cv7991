import React from "react";
import { CheckCircle2, HelpCircle, BookOpen, Layers } from "lucide-react";

export function MatrixGuide() {
  return (
    <section id="matrix-guide" className="py-16 bg-white border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Quy Chuẩn Khảo Thí
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Cấu Trúc Ma Trận & Thang Điểm Chuẩn CV 7991
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Khung phân bổ tỉ lệ nhận thức và 4 dạng thức trắc nghiệm mới áp dụng từ năm học 2024–2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tỉ Lệ 40-30-30 */}
          <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              4:3:3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Tỉ Lệ Mức Độ Nhận Thức</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Nhận biết (40% - 4.0đ):</strong> Nhận diện, nhớ lại khái niệm, định lý, công thức cơ bản.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Thông hiểu (30% - 3.0đ):</strong> Giải thích, suy luận đơn giản, so sánh, phân loại kiến thức.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Vận dụng (30% - 3.0đ):</strong> Vận dụng giải quyết tình huống thực tiễn (VD: 2.0đ, VDC: 1.0đ).</span>
              </li>
            </ul>
          </div>

          {/* Card 2: 4 Dạng thức câu hỏi */}
          <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              Dạng
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4 Dạng Thức Trắc Nghiệm</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Phần I:</strong> Trắc nghiệm 4 lựa chọn (chọn 1 phương án đúng, 0.25đ/câu).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Phần II:</strong> Đúng/Sai (1 lệnh hỏi + 4 ý a,b,c,d; tính điểm lũy tiến 0.1 - 0.25 - 0.5 - 1.0đ).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Phần III:</strong> Trả lời ngắn (điền số/đáp số, 0.25đ hoặc 0.5đ/câu).</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Thể thức Word & In ấn */}
          <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-200 text-sky-600 flex items-center justify-center font-bold mb-4">
              A4
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Thể Thức Nghị Định 30</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Căn lề chuẩn A4:</strong> Lề trái 3.0cm, Lề phải 1.5cm, Lề trên 2.0cm, Lề dưới 2.0cm.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Phông chữ:</strong> Times New Roman cỡ 12-13pt, tiêu đề in hoa đậm rõ ràng.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Xuất DOCX nguyên bản:</strong> Mở trực tiếp bằng Microsoft Word, Google Docs không lệch bảng.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
