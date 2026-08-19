import type { Seguro } from "@/modules/seguros/types/seguro.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import { downloadBlob, formatExportDisplayDate, formatExportFilenameDate, KARFLEET_LOGO_PATH, loadImageAsDataUrl } from "@/lib/export/export.utils";

export async function exportSegurosToExcel(items: Seguro[], vehicles: Vehiculo[]) {
  const ExcelJS = (await import("exceljs")).default; const book = new ExcelJS.Workbook(); book.creator = "K@R FLEET SRL"; book.created = new Date();
  const sheet = book.addWorksheet("Seguros", { views: [{ state: "frozen", ySplit: 5 }] }); sheet.columns = [{ width: 16 }, { width: 25 }, { width: 21 }, { width: 20 }, { width: 18 }, { width: 16 }, { width: 16 }];
  sheet.mergeCells("B1:G1"); sheet.mergeCells("B2:G2"); sheet.mergeCells("B3:G3");
  sheet.getCell("B1").value = "K@R FLEET SRL"; sheet.getCell("B2").value = "REPORTE DE SEGUROS"; sheet.getCell("B3").value = `Fecha de generación: ${formatExportDisplayDate()}`;
  for (let row = 1; row <= 3; row++) for (let col = 1; col <= 7; col++) sheet.getCell(row, col).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF111827" } };
  ["B1", "B2", "B3"].forEach((cell) => sheet.getCell(cell).font = { bold: cell !== "B3", color: { argb: "FFFFFFFF" }, size: cell === "B2" ? 16 : 11 });
  const logo = await loadImageAsDataUrl(KARFLEET_LOGO_PATH); sheet.addImage(book.addImage({ base64: logo, extension: "png" }), { tl: { col: .1, row: .1 }, ext: { width: 90, height: 58 } });
  const header = sheet.getRow(5); header.values = ["VEHÍCULO / PLACA", "ASEGURADORA", "N° DE PÓLIZA", "VALOR ASEGURADO", "FRANQUICIA", "FECHA INICIO", "FECHA FIN"]; header.eachCell((c) => { c.font = { bold: true, color: { argb: "FFFFFFFF" } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF374151" } }; });
  const plate = (id: string) => vehicles.find((v) => v.id === id)?.placa ?? "No disponible";
  items.forEach((item, index) => { const row = sheet.addRow([plate(item.vehiculoId), item.aseguradora, item.numeroPoliza || "—", Number(item.valorAsegurado), Number(item.franquicia), item.fechaInicio, item.fechaFin]); if (index % 2 === 0) row.eachCell((c) => c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F4F6" } }); });
  const total = Math.max(6, 5 + items.length) + 2; sheet.mergeCells(`A${total}:F${total}`); sheet.getCell(`A${total}`).value = "TOTAL DE SEGUROS"; sheet.getCell(`G${total}`).value = items.length; [sheet.getCell(`A${total}`), sheet.getCell(`G${total}`)].forEach((c) => { c.font = { bold: true, color: { argb: "FFFFFFFF" } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF111827" } }; });
  const buffer = await book.xlsx.writeBuffer(); downloadBlob(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `KarFleet_Seguros_${formatExportFilenameDate()}.xlsx`);
}
