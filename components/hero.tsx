"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, CheckCircle2, FileCheck2, Zap, ArrowDown, BookOpen } from "lucide-react";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 60 FPS compositor timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
      })
      .from(subtextRef.current, {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
      }, "-=0.5")
      .from(badgesRef.current?.children || [], {
        y: 15,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.4");

      // Floating ambient badges (GPU translate only)
      if (floatCard1Ref.current) {
        gsap.to(floatCard1Ref.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (floatCard2Ref.current) {
        gsap.to(floatCard2Ref.current, {
          y: 8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white border-b border-sky-100/60">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-70 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-sky-200 text-sky-800 shadow-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Phụ Lục Công Văn Số 7991/BGDĐT-GDTrH (17/12/2024)</span>
            <span className="text-sky-300">|</span>
            <span className="text-sky-600">Chuẩn 100% Khảo Thí</span>
          </div>

          {/* Main Headline */}
          <h1 ref={headlineRef} className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Tạo <span className="text-sky-600 underline decoration-sky-300 decoration-wavy underline-offset-8">Khung Ma Trận</span> & Bản Đặc Tả Đề Kiểm Tra Trong 30 Giây
          </h1>

          {/* Subtext */}
          <p ref={subtextRef} className="mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Hỗ trợ Thầy/Cô tự động hóa phân bổ tỉ lệ nhận thức <strong className="text-slate-900 font-semibold">40% Biết – 30% Hiểu – 30% Vận dụng</strong>, chuẩn hóa 4 dạng thức câu hỏi mới và xuất file Word chuẩn thể thức Nghị định 30 chỉ với 1-Click.
          </p>

          {/* Trust Value Badges */}
          <div ref={badgesRef} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-slate-700">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-200/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Chính xác 10.0 điểm</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-200/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Đúng 4 Dạng thức CV 7991</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-200/80 shadow-sm">
              <FileCheck2 className="w-4 h-4 text-sky-600" />
              <span>Xuất Word (.docx) sạch chuẩn A4</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-200/80 shadow-sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Zero-Token Client Export</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#workspace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-200 hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-sky-200" />
              <span>Bắt Đầu Khởi Tạo Ma Trận</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <a
              href="#matrix-guide"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold bg-white text-slate-700 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Xem Bảng Tra Tỉ Lệ Chuẩn</span>
            </a>
          </div>
        </div>

        {/* Floating Mini Widgets */}
        <div className="relative mt-12 max-w-5xl mx-auto hidden md:block">
          {/* Floating Pill 1 (Left) */}
          <div
            ref={floatCard1Ref}
            className="absolute -top-12 -left-6 bg-white/95 border border-sky-200 rounded-2xl p-4 shadow-xl shadow-sky-100/50 backdrop-blur-md max-w-xs z-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold text-sm">
                40%
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Mức Độ Nhận Biết (4.0đ)</p>
                <p className="text-[11px] text-slate-500">Phần I: 12 câu | Phần II: 2 câu</p>
              </div>
            </div>
          </div>

          {/* Floating Pill 2 (Right) */}
          <div
            ref={floatCard2Ref}
            className="absolute -bottom-6 -right-6 bg-white/95 border border-sky-200 rounded-2xl p-4 shadow-xl shadow-sky-100/50 backdrop-blur-md max-w-xs z-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold text-sm">
                30%
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Thông Hiểu & Vận Dụng</p>
                <p className="text-[11px] text-slate-500">Chuẩn hóa ma trận năng lực GDPT 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
