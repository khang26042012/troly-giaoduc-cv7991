"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Check, 
  Sparkles, 
  Layers, 
  FileText, 
  Sliders, 
  BookOpen, 
  ShieldCheck, 
  GraduationCap, 
  ChevronRight,
  BarChart3,
  CheckCircle2,
  Share2,
  Download
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"ratio" | "formats" | "spec">("ratio");

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-100 selection:text-neutral-900">
      {/* BACKGROUND GRID (CHUẨN DUB.CO) */}
      <div className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Subtle Square Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 1. TOP PILL BADGE (CHUẨN DUB.CO) */}
          <div className="flex justify-center">
            <a
              href="#quy-chuan"
              className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-medium text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-300 active:scale-95"
            >
              <span>Công Văn Số 7991/BGDĐT-GDTrH</span>
              <ArrowUpRight className="size-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-700" />
            </a>
          </div>

          {/* 2. MAIN HEADLINE (CHUẨN DUB.CO - BOLD, COMPACT, TIGHT TRACKING) */}
          <h1 className="mt-6 text-balance text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] max-w-4xl mx-auto">
            Chuẩn hóa ma trận & đề kiểm tra
          </h1>

          {/* 3. SUBTITLE (CHUẨN DUB.CO) */}
          <p className="mt-5 max-w-xl text-pretty text-base sm:text-lg font-normal text-neutral-600 mx-auto leading-relaxed">
            Trợ lý khảo thí hiện đại hỗ trợ giáo viên phổ thông xây dựng ma trận 10 điểm, phân bổ chuẩn xác tỉ lệ 40-30-30 và tích hợp 4 dạng thức đánh giá mới.
          </p>

          {/* 4. TWO CTA BUTTONS (CHUẨN DUB.CO) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#mockup"
              className="flex h-11 items-center justify-center rounded-lg bg-neutral-900 px-6 text-sm font-medium text-white transition-all hover:bg-neutral-800 shadow-sm active:scale-95"
            >
              Bắt đầu ngay
            </a>
            <a
              href="#tinh-nang"
              className="flex h-11 items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 shadow-sm active:scale-95"
            >
              Tìm hiểu quy chuẩn
            </a>
          </div>

          {/* 5. FLOATING PILL TABS ABOVE MOCKUP (CHUẨN BỐ CỤC DUB.CO TRONG ẢNH) */}
          <div className="mt-16 sm:mt-20 flex flex-col items-center gap-3">
            {/* Pill 1 (Center Top) */}
            <button
              onClick={() => setActiveTab("ratio")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-95 ${
                activeTab === "ratio"
                  ? "border-purple-300 bg-white text-purple-900 ring-2 ring-purple-100"
                  : "border-neutral-200 bg-white/90 text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <span className="flex size-4 items-center justify-center rounded bg-purple-100 text-purple-600 text-[10px]">
                ⚖️
              </span>
              <span>Tỉ Lệ 40-30-30 Chuẩn Bộ</span>
            </button>

            {/* Pill 2 & 3 (Bottom Left & Right) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => setActiveTab("formats")}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-95 ${
                  activeTab === "formats"
                    ? "border-emerald-300 bg-white text-emerald-900 ring-2 ring-emerald-100"
                    : "border-neutral-200 bg-white/90 text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span className="flex size-4 items-center justify-center rounded bg-emerald-100 text-emerald-600 text-[10px]">
                  📊
                </span>
                <span>4 Dạng Thức Khảo Thí Mới</span>
              </button>

              <button
                onClick={() => setActiveTab("spec")}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-95 ${
                  activeTab === "spec"
                    ? "border-amber-300 bg-white text-amber-900 ring-2 ring-amber-100"
                    : "border-neutral-200 bg-white/90 text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span className="flex size-4 items-center justify-center rounded bg-amber-100 text-amber-600 text-[10px]">
                  📄
                </span>
                <span>Bản Đặc Tả Yêu Cầu Cần Đạt</span>
              </button>
            </div>
          </div>

          {/* 6. PRODUCT UI MOCKUP WINDOW (MÔ PHỎNG NGUYÊN BẢN CỬA SỔ DUB.CO) */}
          <div id="mockup" className="mt-8 text-left">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-400/80" />
                  <div className="size-3 rounded-full bg-amber-400/80" />
                  <div className="size-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-medium text-neutral-500 hidden sm:inline">
                    Khung Ma Trận Đề Kiểm Tra Định Kỳ • Chuẩn CV 7991
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                    <Check className="size-3 text-emerald-600" /> Đạt Chuẩn 10.0 Điểm
                  </span>
                </div>
              </div>

              {/* Dashboard Content Inside Mockup */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Stats Bar (Tương tự Pending payouts & Total paid của Dub) */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/50">
                    <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Tổng Điểm Bài Thi</p>
                    <p className="text-xl font-bold text-neutral-900 mt-0.5">10.00 Điểm</p>
                    <p className="text-[11px] text-neutral-500 mt-1">Chuẩn 100% thang điểm</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-purple-100 bg-purple-50/40">
                    <p className="text-[11px] font-medium text-purple-700 uppercase tracking-wider">Nhận Biết (40%)</p>
                    <p className="text-xl font-bold text-purple-950 mt-0.5">4.00 Điểm</p>
                    <p className="text-[11px] text-purple-600 mt-1">12 câu P.I + 1 câu P.II</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/40">
                    <p className="text-[11px] font-medium text-sky-700 uppercase tracking-wider">Thông Hiểu (30%)</p>
                    <p className="text-xl font-bold text-sky-950 mt-0.5">3.00 Điểm</p>
                    <p className="text-[11px] text-sky-600 mt-1">4 câu P.I + 1 câu P.II + 2 câu P.III</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40">
                    <p className="text-[11px] font-medium text-emerald-700 uppercase tracking-wider">Vận Dụng (30%)</p>
                    <p className="text-xl font-bold text-emerald-950 mt-0.5">3.00 Điểm</p>
                    <p className="text-[11px] text-emerald-600 mt-1">2 câu P.II + 2 câu P.III</p>
                  </div>
                </div>

                {/* Data Table (Bảng chuẩn Dub.co) */}
                <div className="overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-500 text-[11px]">
                        <th className="p-3 font-semibold">Chủ đề / Đơn vị kiến thức</th>
                        <th className="p-3 font-semibold">Nhận biết (40%)</th>
                        <th className="p-3 font-semibold">Thông hiểu (30%)</th>
                        <th className="p-3 font-semibold">Vận dụng (30%)</th>
                        <th className="p-3 font-semibold">Tổng điểm</th>
                        <th className="p-3 font-semibold text-right">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-800">
                      <tr className="hover:bg-neutral-50/60 transition-colors">
                        <td className="p-3 font-medium">Mệnh đề & Tập hợp</td>
                        <td className="p-3 text-neutral-600">1.5đ (6 câu)</td>
                        <td className="p-3 text-neutral-600">1.0đ (2 câu)</td>
                        <td className="p-3 text-neutral-600">1.0đ (2 câu)</td>
                        <td className="p-3 font-bold text-neutral-900">3.50đ</td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            ● Đạt chuẩn
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-50/60 transition-colors">
                        <td className="p-3 font-medium">Bất phương trình bậc nhất hai ẩn</td>
                        <td className="p-3 text-neutral-600">1.5đ (6 câu)</td>
                        <td className="p-3 text-neutral-600">1.0đ (2 câu)</td>
                        <td className="p-3 text-neutral-600">1.0đ (2 câu)</td>
                        <td className="p-3 font-bold text-neutral-900">3.50đ</td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            ● Đạt chuẩn
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-50/60 transition-colors">
                        <td className="p-3 font-medium">Hệ thức lượng trong tam giác</td>
                        <td className="p-3 text-neutral-600">1.0đ (4 câu)</td>
                        <td className="p-3 text-neutral-600">1.0đ (2 câu)</td>
                        <td className="p-3 text-neutral-600">1.0đ (2 câu)</td>
                        <td className="p-3 font-bold text-neutral-900">3.00đ</td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            ● Đạt chuẩn
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bottom Active Pill (Giống thanh tag dưới đáy của Dub) */}
                <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                  <span>Khung đề mẫu: Môn Toán • Lớp 10 • Thời gian: 90 phút</span>
                  <span className="font-semibold text-neutral-800">Bộ Sách: Kết nối tri thức</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. FEATURES GRID (CHUẨN DUB.CO MARKETING SECTION) */}
      <section id="tinh-nang" className="py-20 border-t border-neutral-200 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Thiết kế chuyên biệt cho công tác khảo thí
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Giải quyết trọn vẹn các thách thức chuyên môn khi triển khai Công văn 7991 trong trường học.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
              <div className="size-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Tự Động Cân Bằng 40-30-30</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Hệ thống tự động tính toán số lượng câu hỏi và điểm số cho từng mức độ nhận thức, đảm bảo luôn khớp tròn 10.0 điểm mà không cần tính nhẩm thủ công.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
              <div className="size-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Đúng 4 Dạng Thức Khảo Thí Mới</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Tích hợp đầy đủ dạng thức trắc nghiệm nhiều lựa chọn, dạng đúng/sai chấm điểm lũy tiến (0.1 - 0.25 - 0.5 - 1.0đ) và câu trả lời ngắn theo đúng quy chế mới.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
              <div className="size-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Xuất Bản A4 Chuẩn Nghị Định 30</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Định dạng tệp văn bản hoàn chỉnh với phông chữ Times New Roman 13pt, lề trang in chuẩn (trái 3cm, phải 1.5cm, trên/dưới 2cm) và bảng biểu không bao giờ bị lệch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER TỐI GIẢN (CHUẨN DUB.CO FOOTER) */}
      <footer className="border-t border-neutral-200 py-12 bg-white text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 text-sm">Trợ Lý Khảo Thí</span>
            <span className="text-neutral-300">|</span>
            <span>Công văn số 7991/BGDĐT-GDTrH</span>
          </div>
          <p className="text-neutral-500">
            Sáng kiến số hóa giáo dục phục vụ giáo viên THCS & THPT 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
