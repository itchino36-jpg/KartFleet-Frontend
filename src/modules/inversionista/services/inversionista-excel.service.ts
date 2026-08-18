import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import {
  downloadBlob,
  formatExportDisplayDate,
  formatExportFilenameDate,
  KARFLEET_LOGO_PATH,
  loadImageAsDataUrl,
} from "@/lib/export/export.utils";

export async function exportInversionistasToExcel(inversionistas: Inversionista[]) {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "K@R FLEET SRL";
  workbook.created = new Date();
  const sheet = workbook.addWorksheet("Inversionistas", {
    views: [{ state: "frozen", ySplit: 6 }],
    pageSetup: { orientation: "portrait", paperSize: 9, fitToPage: true, fitToWidth: 1 },
  });

  sheet.columns = [
    { key: "numero", width: 8 },
    { key: "nombre", width: 30 },
    { key: "documento", width: 19 },
    { key: "telefono", width: 18 },
    { key: "correo", width: 34 },
  ];

  sheet.mergeCells("B1:E1");
  sheet.mergeCells("B2:E2");
  sheet.mergeCells("B3:E3");
  sheet.mergeCells("A4:E4");
  for (let row = 1; row <= 3; row += 1) {
    for (let column = 1; column <= 5; column += 1) {
      sheet.getCell(row, column).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071A3A" } };
    }
  }
  sheet.getCell("A4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF00875A" } };
  sheet.getCell("B1").value = "K@R FLEET SRL";
  sheet.getCell("B2").value = "REPORTE DE INVERSIONISTAS / USUARIOS";
  sheet.getCell("B3").value = `Datos actualizados al ${formatExportDisplayDate()}`;
  sheet.getCell("B1").font = { bold: true, size: 13, color: { argb: "FFDCE7F7" } };
  sheet.getCell("B2").font = { bold: true, size: 16, color: { argb: "FFFFFFFF" } };
  sheet.getCell("B3").font = { size: 10, color: { argb: "FFCBD5E1" } };
  [1, 2, 3].forEach((row) => { sheet.getRow(row).height = 22; });
  sheet.getRow(4).height = 5;

  const logo = await loadImageAsDataUrl(KARFLEET_LOGO_PATH);
  const logoId = workbook.addImage({ base64: logo, extension: "png" });
  sheet.addImage(logoId, { tl: { col: 0.12, row: 0.2 }, ext: { width: 102, height: 62 } });

  const headerRow = sheet.getRow(6);
  headerRow.values = ["N°", "NOMBRE COMPLETO", "DOCUMENTO", "TELÉFONO", "CORREO ELECTRÓNICO"];
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 10, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF007A50" } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = { bottom: { style: "thin", color: { argb: "FF005F3E" } } };
  });
  sheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };

  if (inversionistas.length === 0) {
    sheet.mergeCells("A7:E7");
    const emptyCell = sheet.getCell("A7");
    emptyCell.value = "No existen inversionistas registrados";
    emptyCell.alignment = { horizontal: "center", vertical: "middle" };
    emptyCell.font = { italic: true, color: { argb: "FF64748B" } };
    sheet.getRow(7).height = 28;
  } else {
    inversionistas.forEach((inversionista, index) => {
      const row = sheet.addRow([
        index + 1,
        inversionista.nombre,
        String(inversionista.documento),
        String(inversionista.telefono),
        inversionista.correo,
      ]);
      row.height = 22;
      row.eachCell((cell) => {
        cell.font = { size: 10, color: { argb: "FF334155" } };
        cell.alignment = { vertical: "middle" };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: index % 2 === 0 ? "FFF8FAFC" : "FFFFFFFF" } };
        cell.border = { bottom: { style: "hair", color: { argb: "FFE2E8F0" } } };
      });
      row.getCell(1).alignment = { vertical: "middle", horizontal: "center" };
    });
  }

  const tableEndRow = Math.max(7, 6 + inversionistas.length);
  sheet.autoFilter = { from: "A6", to: `E${tableEndRow}` };
  const totalRowNumber = tableEndRow + 2;
  sheet.mergeCells(`A${totalRowNumber}:D${totalRowNumber}`);
  sheet.getCell(`A${totalRowNumber}`).value = "TOTAL INVERSIONISTAS";
  sheet.getCell(`E${totalRowNumber}`).value = inversionistas.length;
  [sheet.getCell(`A${totalRowNumber}`), sheet.getCell(`E${totalRowNumber}`)].forEach((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071A3A" } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
  });
  sheet.getCell(`E${totalRowNumber}`).alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(totalRowNumber).height = 25;

  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    `KarFleet_Inversionistas_${formatExportFilenameDate()}.xlsx`
  );
}
