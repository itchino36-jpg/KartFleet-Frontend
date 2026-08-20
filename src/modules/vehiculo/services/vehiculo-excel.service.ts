import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/vehiculo/types/vehiculo.types";
import { downloadBlob, formatExportDisplayDate, formatExportFilenameDate, KARFLEET_LOGO_PATH, loadImageAsDataUrl } from "@/lib/export/export.utils";

export async function exportVehiculosToExcel(vehiculos: Vehiculo[], inversionistas: Inversionista[]) {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "K@R FLEET SRL";
  workbook.created = new Date();
  const sheet = workbook.addWorksheet("Vehículos", {
    views: [{ state: "frozen", ySplit: 6 }],
    pageSetup: { orientation: "landscape", paperSize: 9, fitToPage: true, fitToWidth: 1 },
  });
  sheet.columns = [
    { width: 7 }, { width: 30 }, { width: 17 }, { width: 18 },
    { width: 20 }, { width: 22 },
  ];

  sheet.mergeCells("B1:F1");
  sheet.mergeCells("B2:F2");
  sheet.mergeCells("B3:F3");
  sheet.mergeCells("A4:F4");
  for (let row = 1; row <= 3; row += 1) {
    for (let column = 1; column <= 6; column += 1) {
      sheet.getCell(row, column).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071A3A" } };
    }
  }
  sheet.getCell("A4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF00875A" } };
  sheet.getCell("B1").value = "K@R FLEET SRL";
  sheet.getCell("B2").value = "REPORTE DE VEHÍCULOS";
  sheet.getCell("B3").value = `Datos actualizados al ${formatExportDisplayDate()}`;
  sheet.getCell("B1").font = { bold: true, size: 13, color: { argb: "FFDCE7F7" } };
  sheet.getCell("B2").font = { bold: true, size: 16, color: { argb: "FFFFFFFF" } };
  sheet.getCell("B3").font = { size: 10, color: { argb: "FFCBD5E1" } };
  [1, 2, 3].forEach((row) => { sheet.getRow(row).height = 22; });
  sheet.getRow(4).height = 5;

  const logo = await loadImageAsDataUrl(KARFLEET_LOGO_PATH);
  const logoId = workbook.addImage({ base64: logo, extension: "png" });
  sheet.addImage(logoId, { tl: { col: 0.12, row: 0.2 }, ext: { width: 102, height: 62 } });

  const headers = ["N°", "INVERSIONISTA", "PLACA", "MARCA", "MODELO", "TIPO"];
  const headerRow = sheet.getRow(6);
  headerRow.values = headers;
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 9, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF007A50" } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = { bottom: { style: "thin", color: { argb: "FF005F3E" } } };
  });
  sheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };

  const investorName = (id: string) => inversionistas.find((item) => item.id === id)?.nombre ?? "Sin inversionista";
  if (vehiculos.length === 0) {
    sheet.mergeCells("A7:F7");
    const cell = sheet.getCell("A7");
    cell.value = "No existen vehículos registrados";
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.font = { italic: true, color: { argb: "FF64748B" } };
    sheet.getRow(7).height = 28;
  } else {
    vehiculos.forEach((vehicle, index) => {
      const row = sheet.addRow([index + 1, investorName(vehicle.inversionistaId), vehicle.placa, vehicle.marca, vehicle.modelo, vehicle.tipo]);
      row.height = 22;
      row.eachCell((cell) => {
        cell.font = { size: 9, color: { argb: "FF334155" } };
        cell.alignment = { vertical: "middle" };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: index % 2 === 0 ? "FFF8FAFC" : "FFFFFFFF" } };
        cell.border = { bottom: { style: "hair", color: { argb: "FFE2E8F0" } } };
      });
      row.getCell(1).alignment = { vertical: "middle", horizontal: "center" };
    });
  }

  const endRow = Math.max(7, 6 + vehiculos.length);
  sheet.autoFilter = { from: "A6", to: `F${endRow}` };
  const totalRow = endRow + 2;
  sheet.mergeCells(`A${totalRow}:E${totalRow}`);
  sheet.getCell(`A${totalRow}`).value = "TOTAL VEHÍCULOS";
  sheet.getCell(`F${totalRow}`).value = vehiculos.length;
  [sheet.getCell(`A${totalRow}`), sheet.getCell(`F${totalRow}`)].forEach((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071A3A" } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
  });
  sheet.getCell(`F${totalRow}`).alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(totalRow).height = 25;

  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `KarFleet_Vehiculos_${formatExportFilenameDate()}.xlsx`);
}
