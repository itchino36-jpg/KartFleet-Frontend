import type { Seguro } from "@/modules/seguros/types/seguro.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";
import { formatExportDisplayDate, formatExportFilenameDate, KARFLEET_LOGO_PATH, loadImageAsDataUrl } from "@/lib/export/export.utils";

export async function exportSegurosToPdf(items: Seguro[], vehicles: Vehiculo[]) {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]); const doc = new jsPDF({ orientation: "landscape" }); const width = doc.internal.pageSize.getWidth();
  doc.setFillColor(17, 24, 39); doc.rect(0, 0, width, 45, "F"); const logo = await loadImageAsDataUrl(KARFLEET_LOGO_PATH); doc.addImage(logo, "PNG", 14, 8, 42, 27); doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text("K@R FLEET SRL", 65, 16); doc.setFontSize(18); doc.text("REPORTE DE SEGUROS", 65, 28); doc.setFontSize(9); doc.text(`Fecha de generación: ${formatExportDisplayDate()}`, 65, 37); doc.setTextColor(17, 24, 39); doc.setFontSize(11); doc.text(`TOTAL DE SEGUROS: ${items.length}`, 14, 57);
  const plate = (id: string) => vehicles.find((v) => v.id === id)?.placa ?? "No disponible";
  autoTable(doc, { startY: 64, margin: { left: 14, right: 14, top: 14, bottom: 14 }, showHead: "everyPage", head: [["Vehículo / Placa", "Aseguradora", "N° de póliza", "Valor asegurado", "Franquicia", "Fecha inicio", "Fecha fin"]], body: items.map((i) => [plate(i.vehiculoId), i.aseguradora, i.numeroPoliza || "—", i.valorAsegurado, i.franquicia, i.fechaInicio, i.fechaFin]), headStyles: { fillColor: [55, 65, 81] }, alternateRowStyles: { fillColor: [243, 244, 246] }, styles: { fontSize: 8, textColor: [17, 24, 39] } });
  doc.save(`KarFleet_Seguros_${formatExportFilenameDate()}.pdf`);
}
