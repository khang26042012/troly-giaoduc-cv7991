export interface ExamConfig {
  subject: string;
  grade: string;
  duration: number; // 45, 60, 90 phut
  semester: string; // Giữa kỳ I, Cuối kỳ I, Giữa kỳ II, Cuối kỳ II
  textbook: string; // Kết nối tri thức, Cánh Diều, Chân trời sáng tạo
  schoolName: string;
  creatorName: string;
}

export interface MatrixRow {
  id: string;
  stt: number;
  topic: string; // Chủ đề / Mạch kiến thức
  subTopic: string; // Đơn vị kiến thức
  // Nhận biết
  p1_biet: number;
  p2_biet: number;
  p3_biet: number;
  p4_biet: number;
  // Thông hiểu
  p1_hieu: number;
  p2_hieu: number;
  p3_hieu: number;
  p4_hieu: number;
  // Vận dụng
  p1_vandung: number;
  p2_vandung: number;
  p3_vandung: number;
  p4_vandung: number;
  totalScore: number;
  percentage: number;
}

export interface SpecificationItem {
  id: string;
  stt: number;
  topic: string;
  subTopic: string;
  criteria: string; // Yêu cầu cần đạt (YCCĐ)
  // Số câu hỏi theo dạng thức
  p1_count: string; // VD: "C1, C2 (NB)"
  p2_count: string; // VD: "C13 (TH)"
  p3_count: string; // VD: "C17 (VD)"
  p4_count: string; // VD: "C21 (VDC)"
}

export interface FullExamAssessment {
  config: ExamConfig;
  matrix: MatrixRow[];
  specifications: SpecificationItem[];
  scoreSummary: {
    knowing: number;      // 4.0đ (40%)
    understanding: number;// 3.0đ (30%)
    applying: number;     // 3.0đ (30%)
    totalScore: number;   // 10.0đ
  };
}

// Dữ liệu mẫu khởi tạo chuẩn Công văn 7991 (Toán 10 - Giữa học kỳ I)
export const DEFAULT_EXAM_DATA: FullExamAssessment = {
  config: {
    subject: "Toán",
    grade: "10",
    duration: 90,
    semester: "Kiểm tra Giữa Học kỳ I",
    textbook: "Kết nối tri thức với cuộc sống",
    schoolName: "TRƯỜNG THPT CHUYÊN NGUYỄN BỈNH KHIÊM",
    creatorName: "Tổ Toán - Tin học"
  },
  scoreSummary: {
    knowing: 4.0,
    understanding: 3.0,
    applying: 3.0,
    totalScore: 10.0
  },
  matrix: [
    {
      id: "m-1",
      stt: 1,
      topic: "Mệnh đề và Tập hợp",
      subTopic: "Mệnh đề, mệnh đề chứa biến, phủ định",
      p1_biet: 3, p2_biet: 1, p3_biet: 0, p4_biet: 0,
      p1_hieu: 2, p2_hieu: 1, p3_hieu: 1, p4_hieu: 0,
      p1_vandung: 0, p2_vandung: 0, p3_vandung: 1, p4_vandung: 0,
      totalScore: 3.5,
      percentage: 35
    },
    {
      id: "m-2",
      stt: 2,
      topic: "Mệnh đề và Tập hợp",
      subTopic: "Tập hợp và các phép toán trên tập hợp",
      p1_biet: 3, p2_biet: 0, p3_biet: 0, p4_biet: 0,
      p1_hieu: 2, p2_hieu: 1, p3_hieu: 1, p4_hieu: 0,
      p1_vandung: 0, p2_vandung: 0, p3_vandung: 1, p4_vandung: 0,
      totalScore: 3.0,
      percentage: 30
    },
    {
      id: "m-3",
      stt: 3,
      topic: "Bất phương trình bậc nhất hai ẩn",
      subTopic: "Bất phương trình và Hệ bất phương trình bậc nhất hai ẩn",
      p1_biet: 2, p2_biet: 1, p3_biet: 0, p4_biet: 0,
      p1_hieu: 2, p2_hieu: 0, p3_hieu: 1, p4_hieu: 0,
      p1_vandung: 0, p2_vandung: 1, p3_vandung: 1, p4_vandung: 0,
      totalScore: 3.5,
      percentage: 35
    }
  ],
  specifications: [
    {
      id: "s-1",
      stt: 1,
      topic: "Mệnh đề và Tập hợp",
      subTopic: "Mệnh đề toán học",
      criteria: "Nhận biết: Nhận biết được mệnh đề, mệnh đề phủ định, mệnh đề kéo theo. Thông hiểu: Xác định được tính đúng sai của mệnh đề trong các tình huống toán học cơ bản.",
      p1_count: "C1, C2, C3 (NB); C4, C5 (TH)",
      p2_count: "C13 (Ý a, b - NB; Ý c, d - TH)",
      p3_count: "C17 (TH)",
      p4_count: "-"
    },
    {
      id: "s-2",
      stt: 2,
      topic: "Mệnh đề và Tập hợp",
      subTopic: "Tập hợp và các phép toán",
      criteria: "Nhận biết: Sử dụng các ký hiệu tập hợp (thuộc, con, giao, hợp, hiệu). Thông hiểu: Thực hiện các phép toán giao, hợp, hiệu của hai tập hợp số (khoảng, đoạn). Vận dụng: Giải bài toán thực tế đếm phần tử bằng biểu đồ Ven.",
      p1_count: "C6, C7, C8 (NB); C9, C10 (TH)",
      p2_count: "C14 (Ý a, b - TH; Ý c, d - TH)",
      p3_count: "C18 (TH); C19 (VD)",
      p4_count: "-"
    },
    {
      id: "s-3",
      stt: 3,
      topic: "Bất phương trình bậc nhất",
      subTopic: "Hệ bất phương trình bậc nhất hai ẩn",
      criteria: "Nhận biết: Nhận biết nghiệm của bất phương trình bậc nhất 2 ẩn. Thông hiểu: Biểu diễn miền nghiệm của hệ trên mặt phẳng tọa độ. Vận dụng: Bài toán tối ưu kinh tế thực tế tìm giá trị lớn nhất/nhỏ nhất F(x, y).",
      p1_count: "C11, C12 (NB)",
      p2_count: "C15 (Ý a, b - NB; Ý c, d - VD)",
      p3_count: "C20 (VD); C21 (VD)",
      p4_count: "-"
    }
  ]
};
