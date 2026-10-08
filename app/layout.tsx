import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trợ Lý Khảo Thí AI - Chuẩn Ma Trận & Bản Đặc Tả CV 7991/BGDĐT",
  description: "Xây dựng ma trận đề kiểm tra và bản đặc tả năng lực tự động chuẩn Công văn 7991/BGDĐT-GDTrH. Hỗ trợ giáo viên THCS & THPT xuất file Word A4 1-Click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
