import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trợ Lý Khảo Thí - Kiến Tạo Ma Trận & Đề Kiểm Tra Chuẩn Mực",
  description: "Nền tảng khảo thí hiện đại hỗ trợ giáo viên tự động hóa phân bổ tỉ lệ 40% Biết - 30% Hiểu - 30% Vận dụng, chuẩn hóa 4 dạng thức đánh giá và xuất bản tài liệu A4 chuẩn in ấn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-neutral-100 selection:text-neutral-900">
        {children}
      </body>
    </html>
  );
}
