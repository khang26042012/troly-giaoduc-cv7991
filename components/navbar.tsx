"use client";

import React from "react";
import { GraduationCap, ShieldCheck, Sparkles, FileText, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Trợ Lý Khảo Thí AI</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200">
                <ShieldCheck className="w-3 h-3 text-sky-600" />
                CV 7991
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Chuẩn Khung Ma Trận & Bản Đặc Tả Bộ GD&ĐT</p>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#workspace" className="hover:text-sky-600 transition-colors">Khu Vực Tạo Đề</a>
          <a href="#matrix-guide" className="hover:text-sky-600 transition-colors">Quy Chuẩn 40-30-30</a>
          <a href="#spec-guide" className="hover:text-sky-600 transition-colors">Bản Đặc Tả</a>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-200">
            <Sparkles className="w-3 h-3 text-sky-500" />
            Tập Huấn Vĩnh Long 2026
          </span>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#workspace"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-sm hover:shadow-sky-100 hover:shadow-lg active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Tạo Ma Trận Ngay</span>
            <ArrowRight className="w-4 h-4 opacity-75" />
          </a>
        </div>
      </div>
    </header>
  );
}
