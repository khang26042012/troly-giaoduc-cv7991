"use client";

import React, { useState } from "react";
import { Sparkles, Download, Printer, RotateCcw, ShieldCheck, AlertCircle, Loader2, Edit3, Check } from "lucide-react";
import { DEFAULT_EXAM_DATA, FullExamAssessment, MatrixRow, SpecificationItem } from "@/lib/cv7991-schema";
import { generateWordDocx } from "@/lib/docx-generator";

export function ExamWorkspace() {
  const [data, setData] = useState<FullExamAssessment>(DEFAULT_EXAM_DATA);
  const [activeTab, setActiveTab] = useState<"matrix" | "spec">("matrix");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [statusStep, setStatusStep] = useState("");
  const [topicPrompt, setTopicPrompt] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Form selections
  const [subject, setSubject] = useState("Toán");
  const [grade, setGrade] = useState("10");
  const [duration, setDuration] = useState(90);
  const [semester, setSemester] = useState("Kiểm tra Giữa Học kỳ I");
  const [textbook, setTextbook] = useState("Kết nối tri thức với cuộc sống");
  const [schoolName, setSchoolName] = useState("TRƯỜNG THPT CHUYÊN NGUYỄN BỈNH KHIÊM");
  const [creatorName, setCreatorName] = useState("Tổ Toán - Tin học");

  // Call AI Backend (9router with rate limit & Gemini 3.6)
  const handleGenerate = async () => {
    if (cooldown > 0) return;
    setIsLoading(true);
    setErrorMsg("");
    setStatusStep("Đang kết nối AI Backend & chuẩn bị dữ liệu...");

    try {
      setStatusStep("Đang phân bổ ma trận 40-30-30 theo chuẩn CV 7991...");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          grade,
          duration,
          semester,
          textbook,
          schoolName,
          creatorName,
          topicPrompt
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Không thể khởi tạo ma trận");
      }

      const result = await res.json();

      if (result.matrix && result.specifications) {
        setData({
          config: {
            subject,
            grade,
            duration,
            semester,
            textbook,
            schoolName,
            creatorName
          },
          matrix: result.matrix,
          specifications: result.specifications,
          scoreSummary: {
            knowing: 4.0,
            understanding: 3.0,
            applying: 3.0,
            totalScore: 10.0
          }
        });
      }

      // Kích hoạt cooldown 30s để bảo vệ tài khoản
      setCooldown(30);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setStatusStep("Tạo thành công!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Inline edit helper cho Matrix
  const handleEditMatrix = (id: string, field: keyof MatrixRow, value: string | number) => {
    setData((prev) => ({
      ...prev,
      matrix: prev.matrix.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      })
    }));
  };

  // Inline edit helper cho Specification
  const handleEditSpec = (id: string, field: keyof SpecificationItem, value: string) => {
    setData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value };
        }
        return s;
      })
    }));
  };

  // Zero-token Export Word DOCX
  const handleDownloadWord = async () => {
    try {
      setIsExporting(true);
      const blob = await generateWordDocx(data);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Ma_Tran_CV7991_${data.config.subject}_Lop_${data.config.grade}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Lỗi xuất file Word. Vui lòng thử lại!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="workspace" className="py-12 bg-slate-50/60 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Workspace Khảo Thí Định Kỳ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bảng Điều Khiển & Xem Trước A4 Thời Gian Thực
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Nhập thông tin đề kiểm tra bên trái ➔ Bản xem trước A4 chuẩn thể thức cập nhật ngay lập tức bên phải.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setData(DEFAULT_EXAM_DATA)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
              title="Khôi phục lại dữ liệu mẫu ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt Lại Mẫu</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>In A4</span>
            </button>
            <button
              onClick={handleDownloadWord}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Xuất Word (.docx)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI: FORM CẤU HÌNH & THUẬT TOÁN (5 Cột) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-6 sticky top-20">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
                <span>1. Cấu Hình Kỳ Thi</span>
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  Chuẩn 4:3:3
                </span>
              </h3>
            </div>

            {/* Môn & Lớp */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Môn học</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Toán">Toán học</option>
                  <option value="Ngữ văn">Ngữ văn</option>
                  <option value="Tiếng Anh">Tiếng Anh</option>
                  <option value="Vật lí">Vật lí</option>
                  <option value="Hóa học">Hóa học</option>
                  <option value="Sinh học">Sinh học</option>
                  <option value="Lịch sử">Lịch sử</option>
                  <option value="Địa lí">Địa lí</option>
                  <option value="Tin học">Tin học</option>
                  <option value="KHTN">Khoa học tự nhiên</option>
                  <option value="Lịch sử & Địa lí">Lịch sử & Địa lí</option>
                  <option value="GDKT&PL">GDKT & Pháp luật</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="6">Lớp 6 (THCS)</option>
                  <option value="7">Lớp 7 (THCS)</option>
                  <option value="8">Lớp 8 (THCS)</option>
                  <option value="9">Lớp 9 (THCS)</option>
                  <option value="10">Lớp 10 (THPT)</option>
                  <option value="11">Lớp 11 (THPT)</option>
                  <option value="12">Lớp 12 (THPT)</option>
                </select>
              </div>
            </div>

            {/* Thời lượng & Kỳ thi */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thời lượng</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={45}>45 phút</option>
                  <option value={60}>60 phút</option>
                  <option value={90}>90 phút</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đợt kiểm tra</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Kiểm tra Giữa Học kỳ I">Giữa Học kỳ I</option>
                  <option value="Kiểm tra Cuối Học kỳ I">Cuối Học kỳ I</option>
                  <option value="Kiểm tra Giữa Học kỳ II">Giữa Học kỳ II</option>
                  <option value="Kiểm tra Cuối Học kỳ II">Cuối Học kỳ II</option>
                </select>
              </div>
            </div>

            {/* Bộ sách & Trường */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bộ sách giáo khoa</label>
              <select
                value={textbook}
                onChange={(e) => setTextbook(e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống</option>
                <option value="Cánh Diều">Cánh Diều</option>
                <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị trường</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tổ chuyên môn</label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Chủ đề trọng tâm (Tùy chọn) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yêu cầu chủ đề / Giới hạn kiến thức (Tùy chọn)
              </label>
              <textarea
                rows={2}
                value={topicPrompt}
                onChange={(e) => setTopicPrompt(e.target.value)}
                placeholder="VD: Kiểm tra kiến thức Chương 1 Mệnh đề tập hợp và Chương 2 Bất phương trình bậc nhất..."
                className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Thanh đo Năng lượng Điểm 40 - 30 - 30 */}
            <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Cân Bằng Điểm Số (Tổng 10.0đ):</span>
                <span className="font-bold text-sky-700">100% Đạt Chuẩn</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-sky-600 h-full w-[40%]" title="Biết 40% (4.0đ)" />
                <div className="bg-sky-400 h-full w-[30%]" title="Hiểu 30% (3.0đ)" />
                <div className="bg-emerald-500 h-full w-[30%]" title="Vận dụng 30% (3.0đ)" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-600 inline-block" /> Biết: 4.0đ (40%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> Hiểu: 3.0đ (30%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> VD: 3.0đ (30%)</span>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Main Action Trigger */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || cooldown > 0}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-md transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
                  <span>{statusStep || "Đang xử lý..."}</span>
                </>
              ) : cooldown > 0 ? (
                <span>⏳ Đợi {cooldown}s (Điều hòa lưu lượng)</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  <span>⚡ Tạo Ma Trận & Đặc Tả Bằng AI</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400">
              *Tích hợp bảo vệ lưu lượng Antigravity & tự động tối ưu hóa Token.
            </p>
          </div>

          {/* CỘT PHẢI: LIVE PREVIEW A4 CANVAS (7 Cột) */}
          <div className="lg:col-span-8 space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("matrix")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "matrix" ? "bg-sky-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  I. Khung Ma Trận 10.0 Điểm
                </button>
                <button
                  onClick={() => setActiveTab("spec")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "spec" ? "bg-sky-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  II. Bản Đặc Tả YCCĐ Chi Tiết
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 pr-2">
                <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">Bấm vào ô bảng để sửa trực tiếp</span>
              </div>
            </div>

            {/* Khung Giấy Trắng A4 Chuẩn Thể Thức */}
            <div className="overflow-x-auto pb-6">
              <div className="a4-canvas border border-slate-200 text-[13px]">
                {/* Header Tiêu Đề Văn Bản */}
                <div className="grid grid-cols-2 text-center pb-4 border-b border-black/20 mb-4">
                  <div>
                    <p className="font-bold uppercase tracking-tight text-[13px]">{data.config.schoolName}</p>
                    <p className="font-bold text-[12px]">TỔ: {data.config.creatorName.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-tight text-[13px]">KHUNG MA TRẬN & BẢN ĐẶC TẢ ĐỀ KIỂM TRA</p>
                    <p className="font-bold text-[13px]">MÔN: {data.config.subject.toUpperCase()} - KHỐI {data.config.grade}</p>
                    <p className="italic text-[12px]">({data.config.semester} - Thời gian: {data.config.duration} phút)</p>
                  </div>
                </div>

                {/* TAB 1: BẢNG MA TRẬN */}
                {activeTab === "matrix" && (
                  <div>
                    <p className="font-bold text-[13px] mb-2 uppercase">
                      I. KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (Tỉ lệ 40% Biết - 30% Hiểu - 30% Vận dụng):
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-black text-center text-[11px] leading-tight">
                        <thead>
                          <tr className="bg-slate-100 font-bold">
                            <th rowSpan={2} className="border border-black p-1 w-6">TT</th>
                            <th rowSpan={2} className="border border-black p-1 min-w-[120px] text-left">Chủ đề / Mạch kiến thức</th>
                            <th rowSpan={2} className="border border-black p-1 min-w-[130px] text-left">Đơn vị kiến thức</th>
                            <th colSpan={4} className="border border-black p-1 bg-sky-50">Nhận biết (40%)</th>
                            <th colSpan={4} className="border border-black p-1 bg-sky-50">Thông hiểu (30%)</th>
                            <th colSpan={4} className="border border-black p-1 bg-sky-50">Vận dụng (30%)</th>
                            <th rowSpan={2} className="border border-black p-1 w-12 bg-amber-50">Tổng điểm</th>
                            <th rowSpan={2} className="border border-black p-1 w-12 bg-amber-50">%</th>
                          </tr>
                          <tr className="bg-slate-50 font-bold text-[10px]">
                            <th className="border border-black p-1">P.I</th>
                            <th className="border border-black p-1">P.II</th>
                            <th className="border border-black p-1">P.III</th>
                            <th className="border border-black p-1">P.IV</th>
                            <th className="border border-black p-1">P.I</th>
                            <th className="border border-black p-1">P.II</th>
                            <th className="border border-black p-1">P.III</th>
                            <th className="border border-black p-1">P.IV</th>
                            <th className="border border-black p-1">P.I</th>
                            <th className="border border-black p-1">P.II</th>
                            <th className="border border-black p-1">P.III</th>
                            <th className="border border-black p-1">P.IV</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.matrix.map((row) => (
                            <tr key={row.id} className="hover:bg-sky-50/30">
                              <td className="border border-black p-1">{row.stt}</td>
                              <td className="border border-black p-1 text-left font-semibold">
                                <input
                                  type="text"
                                  value={row.topic}
                                  onChange={(e) => handleEditMatrix(row.id, "topic", e.target.value)}
                                  className="w-full bg-transparent hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400 p-0.5 rounded"
                                />
                              </td>
                              <td className="border border-black p-1 text-left">
                                <input
                                  type="text"
                                  value={row.subTopic}
                                  onChange={(e) => handleEditMatrix(row.id, "subTopic", e.target.value)}
                                  className="w-full bg-transparent hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400 p-0.5 rounded"
                                />
                              </td>
                              {/* Biết */}
                              <td className="border border-black p-1">{row.p1_biet || "-"}</td>
                              <td className="border border-black p-1">{row.p2_biet || "-"}</td>
                              <td className="border border-black p-1">{row.p3_biet || "-"}</td>
                              <td className="border border-black p-1">{row.p4_biet || "-"}</td>
                              {/* Hiểu */}
                              <td className="border border-black p-1">{row.p1_hieu || "-"}</td>
                              <td className="border border-black p-1">{row.p2_hieu || "-"}</td>
                              <td className="border border-black p-1">{row.p3_hieu || "-"}</td>
                              <td className="border border-black p-1">{row.p4_hieu || "-"}</td>
                              {/* Vận dụng */}
                              <td className="border border-black p-1">{row.p1_vandung || "-"}</td>
                              <td className="border border-black p-1">{row.p2_vandung || "-"}</td>
                              <td className="border border-black p-1">{row.p3_vandung || "-"}</td>
                              <td className="border border-black p-1">{row.p4_vandung || "-"}</td>
                              {/* Tổng */}
                              <td className="border border-black p-1 font-bold">{row.totalScore}đ</td>
                              <td className="border border-black p-1 font-bold">{row.percentage}%</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-100 font-bold">
                            <td colSpan={3} className="border border-black p-1.5 text-center">
                              TỔNG ĐIỂM THEO MỨC ĐỘ
                            </td>
                            <td colSpan={4} className="border border-black p-1.5 text-sky-800">4.0 điểm (40%)</td>
                            <td colSpan={4} className="border border-black p-1.5 text-sky-800">3.0 điểm (30%)</td>
                            <td colSpan={4} className="border border-black p-1.5 text-sky-800">3.0 điểm (30%)</td>
                            <td className="border border-black p-1.5 text-amber-900 font-extrabold">10.0đ</td>
                            <td className="border border-black p-1.5 text-amber-900 font-extrabold">100%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: BẢN ĐẶC TẢ NĂNG LỰC */}
                {activeTab === "spec" && (
                  <div>
                    <p className="font-bold text-[13px] mb-2 uppercase">
                      II. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ THEO YÊU CẦU CẦN ĐẠT (YCCĐ):
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-black text-left text-[11px] leading-snug">
                        <thead>
                          <tr className="bg-slate-100 font-bold text-center">
                            <th className="border border-black p-1.5 w-6">TT</th>
                            <th className="border border-black p-1.5 min-w-[140px]">Chủ đề / Đơn vị kiến thức</th>
                            <th className="border border-black p-1.5 min-w-[260px]">Yêu cầu cần đạt (YCCĐ)</th>
                            <th className="border border-black p-1.5 w-16">Phần I (Nhiều LC)</th>
                            <th className="border border-black p-1.5 w-20">Phần II (Đúng/Sai)</th>
                            <th className="border border-black p-1.5 w-16">Phần III (Trả lời ngắn)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.specifications.map((s) => (
                            <tr key={s.id} className="hover:bg-sky-50/30">
                              <td className="border border-black p-1.5 text-center">{s.stt}</td>
                              <td className="border border-black p-1.5 font-bold">
                                {s.topic} - {s.subTopic}
                              </td>
                              <td className="border border-black p-1.5">
                                <textarea
                                  rows={3}
                                  value={s.criteria}
                                  onChange={(e) => handleEditSpec(s.id, "criteria", e.target.value)}
                                  className="w-full bg-transparent hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400 p-1 rounded resize-y"
                                />
                              </td>
                              <td className="border border-black p-1.5 text-center">{s.p1_count}</td>
                              <td className="border border-black p-1.5 text-center">{s.p2_count}</td>
                              <td className="border border-black p-1.5 text-center">{s.p3_count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
