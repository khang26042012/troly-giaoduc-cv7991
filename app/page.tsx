"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Download,
  Zap,
  Printer,
  MousePointerClick
} from "lucide-react";
import gsap from "gsap";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"ratio" | "formats" | "spec">("ratio");

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const pillGroupRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  // GSAP 60 FPS Compositor Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
      })
      .from(subtextRef.current, {
        y: 18,
        autoAlpha: 0,
        duration: 0.6,
      }, "-=0.4")
      .from(ctaGroupRef.current?.children || [], {
        y: 14,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.5,
      }, "-=0.3")
      .from(pillGroupRef.current, {
        y: 16,
        autoAlpha: 0,
        duration: 0.5,
      }, "-=0.2")
      .from(mockupRef.current, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
      }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animation mượt mà khi đổi Tab
  const handleTabChange = (tab: "ratio" | "formats" | "spec") => {
    if (tab === activeTab) return;
    if (tabContentRef.current) {
      gsap.to(tabContentRef.current, {
        autoAlpha: 0,
        y: -6,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(
            tabContentRef.current,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }
          );
        }
      });
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-100 selection:text-neutral-900">
      {/* BACKGROUND GRID CHUẨN QUỐC TẾ */}
      <div className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 1. TOP PILL BADGE (TỰ NHIÊN, KHÔNG CÔNG VĂN) */}
          <div className="flex justify-center">
            <div className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-medium text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-300">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Nền Tảng Khảo Thí & Đề Thi Thế Hệ Mới</span>
              <span className="text-neutral-300">|</span>
              <span className="text-neutral-500 font-normal">Tự động hóa 100%</span>
            </div>
          </div>

          {/* 2. MAIN HEADLINE (ĐẬM NÉT, GỌN GÀNG, SẮC SẢO) */}
          <h1
            ref={headlineRef}
            className="mt-6 text-balance text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] max-w-4xl mx-auto"
          >
            Kiến tạo ma trận & đề kiểm tra chuẩn mực
          </h1>

          {/* 3. SUBTITLE (VIẾT TỰ NHIÊN NHƯ NGƯỜI THẬT) */}
          <p
            ref={subtextRef}
            className="mt-5 max-w-xl text-pretty text-base sm:text-lg font-normal text-neutral-600 mx-auto leading-relaxed"
          >
            Giải pháp chuyên biệt cho giáo viên: tự động cân bằng ma trận 10 điểm, chuẩn hóa 4 dạng thức đánh giá và xuất bản tệp văn bản A4 hoàn hảo trong 30 giây.
          </p>

          {/* 4. TWO CTA BUTTONS */}
          <div ref={ctaGroupRef} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#mockup"
              className="flex h-11 items-center justify-center rounded-lg bg-neutral-900 px-6 text-sm font-medium text-white transition-all hover:bg-neutral-800 shadow-sm active:scale-95"
            >
              Trải nghiệm bảng điều khiển
            </a>
            <a
              href="#tinh-nang"
              className="flex h-11 items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 shadow-sm active:scale-95"
            >
              Xem cấu trúc đánh giá
            </a>
          </div>

          {/* 5. FLOATING PILL TABS SWITCHER */}
          <div ref={pillGroupRef} className="mt-14 sm:mt-18 flex flex-col items-center gap-2.5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handleTabChange("ratio")}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-95 ${
                  activeTab === "ratio"
                    ? "border-purple-300 bg-purple-50/80 text-purple-900 ring-2 ring-purple-100 font-semibold"
                    : "border-neutral-200 bg-white/90 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <span>⚖️</span>
                <span>Tỉ Lệ Vàng 40 : 30 : 30</span>
              </button>

              <button
                onClick={() => handleTabChange("formats")}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-95 ${
                  activeTab === "formats"
                    ? "border-emerald-300 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-100 font-semibold"
                    : "border-neutral-200 bg-white/90 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <span>📝</span>
                <span>4 Dạng Thức Câu Hỏi Mới</span>
              </button>

              <button
                onClick={() => handleTabChange("spec")}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-95 ${
                  activeTab === "spec"
                    ? "border-sky-300 bg-sky-50/80 text-sky-900 ring-2 ring-sky-100 font-semibold"
                    : "border-neutral-200 bg-white/90 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <span>📄</span>
                <span>Bản Đặc Tả Năng Lực Chi Tiết</span>
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 flex items-center gap-1">
              <MousePointerClick className="size-3" />
              <span>Bấm vào từng thẻ để đổi góc nhìn trực quan bên dưới</span>
            </p>
          </div>

          {/* 6. PRODUCT UI MOCKUP WINDOW (TINH TẾ, CHÂN THỰC) */}
          <div id="mockup" ref={mockupRef} className="mt-6 text-left">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden ring-1 ring-neutral-900/5">
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-400/80" />
                  <div className="size-3 rounded-full bg-amber-400/80" />
                  <div className="size-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-medium text-neutral-500 hidden sm:inline">
                    Bảng Điều Khiển Ma Trận Kiểm Tra Định Kỳ
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                    <Check className="size-3 text-emerald-600" />
                    <span>Tròn 10.0 Điểm Tuyệt Đối</span>
                  </span>
                </div>
              </div>

              {/* Dynamic Content Container */}
              <div ref={tabContentRef} className="p-4 sm:p-6 space-y-6">
                {/* VIEW 1: TỈ LỆ 40-30-30 */}
                {activeTab === "ratio" && (
                  <div className="space-y-6">
                    {/* Thống kê 4 ô */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60">
                        <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Tổng Điểm</p>
                        <p className="text-xl font-bold text-neutral-900 mt-0.5">10.00 Điểm</p>
                        <p className="text-[11px] text-neutral-500 mt-1">Khớp tròn 100%</p>
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

                    {/* Thanh cân bằng trực quan */}
                    <div className="space-y-1.5 p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200">
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                        <span>Cân Bằng Phân Bổ Năng Lực</span>
                        <span className="text-neutral-500">40% Biết : 30% Hiểu : 30% Vận dụng</span>
                      </div>
                      <div className="h-2.5 w-full bg-neutral-200 rounded-full overflow-hidden flex">
                        <div className="bg-purple-600 h-full w-[40%]" title="Biết 40%" />
                        <div className="bg-sky-500 h-full w-[30%]" title="Hiểu 30%" />
                        <div className="bg-emerald-500 h-full w-[30%]" title="Vận dụng 30%" />
                      </div>
                    </div>

                    {/* Bảng ma trận dữ liệu bài học */}
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
                  </div>
                )}

                {/* VIEW 2: 4 DẠNG THỨC MỚI */}
                {activeTab === "formats" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900">Phần I: Trắc nghiệm 4 lựa chọn</span>
                          <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-mono">0.25đ / câu</span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          Chọn 1 đáp án đúng duy nhất trong 4 phương án A, B, C, D. Đánh giá nhận diện khái niệm, định lý và kỹ năng giải toán cơ bản.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900">Phần II: Đúng / Sai lũy tiến</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">0.1 - 0.25 - 0.5 - 1.0đ</span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          Gồm 1 đề dẫn và 4 phát biểu a, b, c, d. Điểm số tăng lũy tiến khi thí sinh làm đúng 1, 2, 3 hoặc toàn bộ 4 ý.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900">Phần III: Trả lời ngắn</span>
                          <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-mono">0.25đ - 0.50đ / câu</span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          Thí sinh tự điền con số hoặc kết quả vào ô trả lời. Loại bỏ hoàn toàn yếu tố may rủi đoán mò, đo lường năng lực tính toán sâu.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900">Phần IV: Tự luận (nếu có)</span>
                          <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-mono">Linh hoạt theo môn</span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          Dành cho các câu hỏi vận dụng giải quyết bài toán thực tiễn phức tạp hoặc phần viết mở rộng trong môn Ngữ văn.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 3: BẢN ĐẶC TẢ YÊU CẦU CẦN ĐẠT */}
                {activeTab === "spec" && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-xl border border-neutral-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-500 text-[11px]">
                            <th className="p-3 font-semibold">Chủ đề & Đơn vị kiến thức</th>
                            <th className="p-3 font-semibold">Yêu cầu cần đạt</th>
                            <th className="p-3 font-semibold text-center">Phần I</th>
                            <th className="p-3 font-semibold text-center">Phần II</th>
                            <th className="p-3 font-semibold text-center">Phần III</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-neutral-800">
                          <tr className="hover:bg-neutral-50/60 transition-colors">
                            <td className="p-3 font-medium">Mệnh đề toán học</td>
                            <td className="p-3 text-neutral-600 leading-relaxed">
                              Nhận biết mệnh đề, mệnh đề phủ định. Xác định tính đúng sai trong các tình huống cơ bản.
                            </td>
                            <td className="p-3 text-center text-neutral-600 font-mono">C1, C2, C3</td>
                            <td className="p-3 text-center text-neutral-600 font-mono">C13 (Ý a, b)</td>
                            <td className="p-3 text-center text-neutral-600 font-mono">-</td>
                          </tr>
                          <tr className="hover:bg-neutral-50/60 transition-colors">
                            <td className="p-3 font-medium">Tập hợp và các phép toán</td>
                            <td className="p-3 text-neutral-600 leading-relaxed">
                              Sử dụng đúng ký hiệu tập con, giao, hợp, hiệu. Giải quyết bài toán thực tế đếm phần tử.
                            </td>
                            <td className="p-3 text-center text-neutral-600 font-mono">C4, C5, C6</td>
                            <td className="p-3 text-center text-neutral-600 font-mono">C14 (Ý c, d)</td>
                            <td className="p-3 text-center text-neutral-600 font-mono">C17 (VD)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Footer cửa sổ */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100 gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span>Môn: Toán học • Khối 10 • Thời lượng: 90 phút</span>
                  </span>
                  <span className="text-neutral-700 font-medium">Hỗ trợ đầy đủ các bộ sách giáo khoa hiện hành</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. THREE PILLARS (TỐI GIẢN, GỌN GÀNG, SANG TRỌNG) */}
      <section id="tinh-nang" className="py-20 border-t border-neutral-200 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Kiến tạo chuẩn mực đánh giá năng lực
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Mọi công đoạn phức tạp trong quá trình xây dựng đề thi được tối ưu hóa chỉ với một cú nhấp chuột.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
              <div className="size-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Tự Động Cân Bằng Điểm Số</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Thuật toán ma trận tự động tính toán và chia điểm cho từng mức độ nhận thức, cam kết tổng số điểm luôn tròn 10.0 tuyệt đối.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
              <div className="size-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Đồng Bộ Bản Đặc Tả Năng Lực</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Gắn nhãn rõ ràng từng câu hỏi với yêu cầu cần đạt của bài học, giúp việc giải trình trước hội đồng chuyên môn trở nên minh bạch và dễ dàng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all">
              <div className="size-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Xuất Bản Văn Bản Chuẩn In Ấn</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Tạo tệp Word (.docx) trực tiếp trên máy người dùng theo đúng quy chuẩn trang in A4, phông chữ Times New Roman và bảng biểu sạch sẽ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER TỐI GIẢN */}
      <footer className="border-t border-neutral-200 py-10 bg-white text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 text-sm">Trợ Lý Khảo Thí</span>
            <span className="text-neutral-300">|</span>
            <span>Nền tảng kiến tạo đề kiểm tra định kỳ</span>
          </div>
          <p className="text-neutral-500">
            Dành cho giáo viên và các tổ chuyên môn THCS & THPT 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
