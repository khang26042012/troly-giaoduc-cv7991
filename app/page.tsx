import React from "react";
import { ExamWorkspace } from "@/components/exam-workspace";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Trang giới thiệu ngắn gọn, tinh khiết - Bỏ hoàn toàn header và hero rối rắm */}
      <section className="pt-8 pb-4 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>Công Văn 7991/BGDĐT-GDTrH (17/12/2024)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Trợ Lý Tạo Ma Trận & Bản Đặc Tả Đề Thi
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Tự động phân bổ tỉ lệ 40% Biết – 30% Hiểu – 30% Vận dụng, chuẩn hóa 4 dạng thức câu hỏi mới và xuất file Word chuẩn thể thức Nghị định 30.
        </p>
      </section>

      {/* Trực tiếp vào Workspace làm việc */}
      <ExamWorkspace />

      <Footer />
    </main>
  );
}
