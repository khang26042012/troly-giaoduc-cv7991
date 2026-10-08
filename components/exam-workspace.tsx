"use client";

import React, { useState } from "react";
import { Sparkles, Download, Printer, RotateCcw, AlertCircle, Loader2, Edit3 } from "lucide-react";
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
    setStatusStep("Đang kết nối AI Backend...");

    try {
      setStatusStep("Đang phân bổ ma trận 40-30-30 theo CV 7991...");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Thanh hành động chính */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-sky-100 shadow-sm mb-6">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "matrix" ? "bg-white text-sky-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            I. Khung Ma Trận 10.0đ
          </button>
          <button
            onClick={() => setActiveTab("spec")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "spec" ? "bg-white text-sky-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            II. Bản Đặc Tả Năng Lực
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setData(DEFAULT_EXAM_DATA)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all border border-slate-200"
            title="Đặt lại dữ liệu mẫu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all border border-slate-200"
            title="In đề A4"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownloadWord}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>Xuất File Word (.docx)</span>
          </button>
        </div>
      </div>

      {/* 2 Cột Workspace: Cấu hình bên trái - Bản A4 bên phải */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI: FORM CẤU HÌNH (4 Cột) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-sky-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-sm">Thiết Lập Đề Thi</h2>
            <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              Tỉ lệ 4:3:3
            </span>
          </div>

          {/* Môn & Lớp */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Môn học</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Khối lớp</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="6">Lớp 6</option>
                <option value="7">Lớp 7</option>
                <option value="8">Lớp 8</option>
                <option value="9">Lớp 9</option>
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
              </select>
            </div>
          </div>

          {/* Thời lượng & Kỳ thi */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Thời lượng</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value={45}>45 phút</option>
                <option value={60}>60 phút</option>
                <option value={90}>90 phút</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Kỳ thi</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Kiểm tra Giữa Học kỳ I">Giữa HK I</option>
                <option value="Kiểm tra Cuối Học kỳ I">Cuối HK I</option>
                <option value="Kiểm tra Giữa Học kỳ II">Giữa HK II</option>
                <option value="Kiểm tra Cuối Học kỳ II">Cuối HK II</option>
              </select>
            </div>
          </div>

          {/* Bộ sách */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Bộ sách giáo khoa</label>
            <select
              value={textbook}
              onChange={(e) => setTextbook(e.target.value)}
              className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống</option>
              <option value="Cánh Diều">Cánh Diều</option>
              <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
            </select>
          </div>

          {/* Đơn vị trường & Tổ */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Tên trường</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Tổ chuyên môn</label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Giới hạn kiến thức */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Phạm vi bài học / Yêu cầu riêng (Tùy chọn)
            </label>
            <textarea
              rows={2}
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              placeholder="VD: Kiểm tra kiến thức từ bài 1 đến bài 4..."
              className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Thanh đo Năng lượng 4:3:3 */}
          <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
              <span>Cân Bằng Điểm Số (Tổng 10.0đ):</span>
              <span className="text-sky-700">100% Chuẩn CV 7991</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div className="bg-sky-600 h-full w-[40%]" title="Biết 40%" />
              <div className="bg-sky-400 h-full w-[30%]" title="Hiểu 30%" />
              <div className="bg-emerald-500 h-full w-[30%]" title="Vận dụng 30%" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-600 font-medium">
              <span>Biết: 4.0đ (40%)</span>
              <span>Hiểu: 3.0đ (30%)</span>
              <span>VD: 3.0đ (30%)</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Nút bấm AI */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || cooldown > 0}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
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
                <span>⚡ Bắt Đầu Tạo Bằng AI</span>
              </>
            )}
          </button>
        </div>

        {/* CỘT PHẢI: LIVE A4 PREVIEW (8 Cột) */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
            <span className="font-semibold text-slate-700">Bản Xem Trước Giấy A4 (Chuẩn Nghị Định 30)</span>
            <span className="flex items-center gap-1 text-sky-600">
              <Edit3 className="w-3.5 h-3.5" /> Bấm trực tiếp vào chữ để sửa
            </span>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="a4-canvas border border-slate-200 text-[13px] bg-white rounded-lg">
              {/* Header Tiêu Đề Văn Bản */}
              <div className="grid grid-cols-2 text-center pb-3 border-b border-black/20 mb-3">
                <div>
                  <p className="font-bold uppercase tracking-tight text-[12px]">{data.config.schoolName}</p>
                  <p className="font-bold text-[11px]">TỔ: {data.config.creatorName.toUpperCase()}</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-tight text-[12px]">KHUNG MA TRẬN & BẢN ĐẶC TẢ ĐỀ KIỂM TRA</p>
                  <p className="font-bold text-[12px]">MÔN: {data.config.subject.toUpperCase()} - KHỐI {data.config.grade}</p>
                  <p className="italic text-[11px]">({data.config.semester} - Thời gian: {data.config.duration} phút)</p>
                </div>
              </div>

              {/* TAB 1: BẢNG MA TRẬN */}
              {activeTab === "matrix" && (
                <div>
                  <p className="font-bold text-[12px] mb-2 uppercase">
                    I. KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (Tỉ lệ 40% Biết - 30% Hiểu - 30% Vận dụng):
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-black text-center text-[11px] leading-tight">
                      <thead>
                        <tr className="bg-slate-100 font-bold">
                          <th rowSpan={2} className="border border-black p-1 w-6">TT</th>
                          <th rowSpan={2} className="border border-black p-1 min-w-[120px] text-left">Chủ đề</th>
                          <th rowSpan={2} className="border border-black p-1 min-w-[130px] text-left">Đơn vị kiến thức</th>
                          <th colSpan={4} className="border border-black p-1 bg-sky-50">Nhận biết (40%)</th>
                          <th colSpan={4} className="border border-black p-1 bg-sky-50">Thông hiểu (30%)</th>
                          <th colSpan={4} className="border border-black p-1 bg-sky-50">Vận dụng (30%)</th>
                          <th rowSpan={2} className="border border-black p-1 w-12 bg-amber-50">Tổng</th>
                          <th rowSpan={2} className="border border-black p-1 w-12 bg-amber-50">%</th>
                        </tr>
                        <tr className="bg-slate-50 font-bold text-[10px]">
                          <th className="border border-black p-0.5">P.I</th>
                          <th className="border border-black p-0.5">P.II</th>
                          <th className="border border-black p-0.5">P.III</th>
                          <th className="border border-black p-0.5">P.IV</th>
                          <th className="border border-black p-0.5">P.I</th>
                          <th className="border border-black p-0.5">P.II</th>
                          <th className="border border-black p-0.5">P.III</th>
                          <th className="border border-black p-0.5">P.IV</th>
                          <th className="border border-black p-0.5">P.I</th>
                          <th className="border border-black p-0.5">P.II</th>
                          <th className="border border-black p-0.5">P.III</th>
                          <th className="border border-black p-0.5">P.IV</th>
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

              {/* TAB 2: BẢN ĐẶC TẢ */}
              {activeTab === "spec" && (
                <div>
                  <p className="font-bold text-[12px] mb-2 uppercase">
                    II. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ THEO YÊU CẦU CẦN ĐẠT (YCCĐ):
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-black text-left text-[11px] leading-snug">
                      <thead>
                        <tr className="bg-slate-100 font-bold text-center">
                          <th className="border border-black p-1.5 w-6">TT</th>
                          <th className="border border-black p-1.5 min-w-[130px]">Chủ đề & Đơn vị KT</th>
                          <th className="border border-black p-1.5 min-w-[240px]">Yêu cầu cần đạt (YCCĐ)</th>
                          <th className="border border-black p-1.5 w-16">Phần I</th>
                          <th className="border border-black p-1.5 w-20">Phần II</th>
                          <th className="border border-black p-1.5 w-16">Phần III</th>
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
  );
}
