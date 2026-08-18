import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import {
  formatExportDisplayDate,
  formatExportFilenameDate,
  KARFLEET_LOGO_PATH,
  loadImageAsDataUrl,
} from "@/lib/export/export.utils";

export async function exportInversionistasToPdf(inversionistas: Inversionista[]) {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const document = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = document.internal.pageSize.getWidth();
  const logo = await loadImageAsDataUrl(KARFLEET_LOGO_PATH);

  document.setFillColor(15, 23, 42);
  document.rect(0, 0, pageWidth, 50, "F");
  document.setFillColor(0, 135, 90);
  document.triangle(108, 50, pageWidth, 42, pageWidth, 53, "F");
  document.setFillColor(255, 255, 255);
  document.triangle(82, 50, pageWidth, 48, pageWidth, 58, "F");
  document.setFillColor(255, 255, 255);
  document.roundedRect(14, 10, 42, 28, 2, 2, "F");
  document.addImage(logo, "PNG", 17, 13, 36, 22);

  document.setTextColor(255, 255, 255);
  document.setFont("helvetica", "bold");
  document.setFontSize(11);
  document.text("K@R FLEET SRL", 64, 17);
  document.setFontSize(17);
  document.text("REPORTE DE", 64, 26);
  document.text("INVERSIONISTAS / USUARIOS", 64, 34, { maxWidth: 130 });
  document.setFont("helvetica", "normal");
  document.setFontSize(9);
  document.setTextColor(203, 213, 225);
  document.text(`Datos actualizados al ${formatExportDisplayDate()}`, 64, 42);

  document.setFillColor(248, 250, 252);
  document.setDrawColor(226, 232, 240);
  document.roundedRect(14, 66, pageWidth - 28, 24, 2, 2, "FD");
  document.setFillColor(0, 135, 90);
  document.roundedRect(14, 66, 3, 24, 1.5, 1.5, "F");
  document.setTextColor(100, 116, 139);
  document.setFont("helvetica", "bold");
  document.setFontSize(9);
  document.text("TOTAL INVERSIONISTAS", 24, 76);
  document.setTextColor(15, 23, 42);
  document.setFontSize(16);
  document.text(String(inversionistas.length), 24, 85);

  const body = inversionistas.length > 0
    ? inversionistas.map((item, index) => [
        String(index + 1),
        item.nombre,
        String(item.documento),
        String(item.telefono),
        item.correo,
      ])
    : [["No existen inversionistas registrados", "", "", "", ""]];

  autoTable(document, {
    startY: 99,
    margin: { left: 14, right: 14, top: 14, bottom: 28 },
    head: [["N°", "Nombre completo", "Documento", "Teléfono", "Correo electrónico"]],
    body,
    theme: "grid",
    showHead: "everyPage",
    rowPageBreak: "avoid",
    styles: {
      font: "helvetica",
      fontSize: 7.5,
      textColor: [51, 65, 85],
      lineColor: [226, 232, 240],
      lineWidth: 0.15,
      cellPadding: 2.4,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [0, 122, 80],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      lineColor: [0, 95, 62],
      minCellHeight: 9,
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 42 },
      2: { cellWidth: 29 },
      3: { cellWidth: 28 },
      4: { cellWidth: 73 },
    },
    didParseCell(data) {
      if (inversionistas.length === 0 && data.section === "body" && data.column.index === 0) {
        data.cell.colSpan = 5;
        data.cell.styles.halign = "center";
        data.cell.styles.fontStyle = "italic";
        data.cell.styles.textColor = [100, 116, 139];
      }
    },
    didDrawPage() {
      const pageHeight = document.internal.pageSize.getHeight();
      document.setFillColor(0, 135, 90);
      document.triangle(0, pageHeight - 12, 145, pageHeight - 20, pageWidth, pageHeight - 8, "F");
      document.setFillColor(7, 26, 58);
      document.triangle(0, pageHeight - 8, 118, pageHeight - 14, pageWidth, pageHeight - 3, "F");
      document.rect(0, pageHeight - 8, pageWidth, 8, "F");
    },
  });

  document.save(`KarFleet_Inversionistas_${formatExportFilenameDate()}.pdf`);
}
