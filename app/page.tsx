import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ExamWorkspace } from "@/components/exam-workspace";
import { MatrixGuide } from "@/components/matrix-guide";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <ExamWorkspace />
      <MatrixGuide />
      <Footer />
    </main>
  );
}
