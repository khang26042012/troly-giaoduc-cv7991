import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle } from "docx";
import { FullExamAssessment } from "./cv7991-schema";

export async function generateWordDocx(data: FullExamAssessment): Promise<Blob> {
  const { config, matrix, specifications, scoreSummary } = data;

  const thinBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  };

  // Header Section
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: config.schoolName.toUpperCase(), bold: true, font: "Times New Roman", size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "TỔ: " + config.creatorName.toUpperCase(), bold: true, font: "Times New Roman", size: 22 }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "KHUNG MA TRẬN & ĐẶC TẢ ĐỀ KIỂM TRA", bold: true, font: "Times New Roman", size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `MÔN: ${config.subject.toUpperCase()} - LỚP ${config.grade}`, bold: true, font: "Times New Roman", size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `(${config.semester} - Thời gian: ${config.duration} phút)`, italics: true, font: "Times New Roman", size: 22 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Matrix Table Rows
  const matrixHeaderRow1 = new TableRow({
    children: [
      new TableCell({ rowSpan: 2, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TT", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ rowSpan: 2, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Chủ đề / Mạch kiến thức", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ rowSpan: 2, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Đơn vị kiến thức", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ columnSpan: 4, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Nhận biết (40%)", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ columnSpan: 4, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Thông hiểu (30%)", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ columnSpan: 4, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vận dụng (30%)", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ rowSpan: 2, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tổng điểm", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ rowSpan: 2, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% Điểm", bold: true, font: "Times New Roman", size: 20 })] })] }),
    ],
  });

  const matrixHeaderRow2 = new TableRow({
    children: [
      // Nhận biết
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.I", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.II", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.III", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.IV", font: "Times New Roman", size: 18 })] })] }),
      // Thông hiểu
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.I", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.II", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.III", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.IV", font: "Times New Roman", size: 18 })] })] }),
      // Vận dụng
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.I", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.II", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.III", font: "Times New Roman", size: 18 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "P.IV", font: "Times New Roman", size: 18 })] })] }),
    ],
  });

  const matrixDataRows = matrix.map((row) => {
    return new TableRow({
      children: [
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.stt), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: row.topic, font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: row.subTopic, font: "Times New Roman", size: 20 })] })] }),
        // Nhận biết
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p1_biet || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p2_biet || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p3_biet || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p4_biet || "-"), font: "Times New Roman", size: 20 })] })] }),
        // Thông hiểu
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p1_hieu || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p2_hieu || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p3_hieu || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p4_hieu || "-"), font: "Times New Roman", size: 20 })] })] }),
        // Vận dụng
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p1_vandung || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p2_vandung || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p3_vandung || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.p4_vandung || "-"), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.totalScore), bold: true, font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.percentage) + "%", font: "Times New Roman", size: 20 })] })] }),
      ],
    });
  });

  const matrixTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [matrixHeaderRow1, matrixHeaderRow2, ...matrixDataRows],
  });

  // Specifications Table Rows
  const specHeaderRow = new TableRow({
    children: [
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TT", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Chủ đề / Đơn vị kiến thức", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Yêu cầu cần đạt (YCCĐ)", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Phần I", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Phần II", bold: true, font: "Times New Roman", size: 20 })] })] }),
      new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Phần III", bold: true, font: "Times New Roman", size: 20 })] })] }),
    ],
  });

  const specDataRows = specifications.map((s) => {
    return new TableRow({
      children: [
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(s.stt), font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: s.topic + " - " + s.subTopic, bold: true, font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: s.criteria, font: "Times New Roman", size: 20 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s.p1_count, font: "Times New Roman", size: 18 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s.p2_count, font: "Times New Roman", size: 18 })] })] }),
        new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s.p3_count, font: "Times New Roman", size: 18 })] })] }),
      ],
    });
  });

  const specTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [specHeaderRow, ...specDataRows],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,    // 20mm
              bottom: 1134, // 20mm
              left: 1701,   // 30mm
              right: 850,   // 15mm
            },
          },
        },
        children: [
          headerTable,
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({ text: "I. KHUNG MA TRẬN ĐỀ KIỂM TRA (Tỉ lệ: 40% Biết - 30% Hiểu - 30% Vận dụng):", bold: true, font: "Times New Roman", size: 22 }),
            ],
          }),
          new Paragraph({ text: "" }),
          matrixTable,
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({ text: "II. BẢN ĐẶC TẢ ĐỀ KIỂM TRA THEO YÊU CẦU CẦN ĐẠT:", bold: true, font: "Times New Roman", size: 22 }),
            ],
          }),
          new Paragraph({ text: "" }),
          specTable,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
