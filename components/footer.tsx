import React from "react";
import { GraduationCap, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-sky-600" />
          <span className="font-bold text-slate-900">Trợ Lý Giáo Dục AI - Khảo Thí CV 7991</span>
        </div>
        <p className="text-center text-slate-500">
          Căn cứ pháp lý: Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo.
        </p>
        <p className="flex items-center gap-1 text-slate-500">
          <span>Xây dựng cho Bài tập tập huấn Vĩnh Long 2026</span>
        </p>
      </div>
    </footer>
  );
}
