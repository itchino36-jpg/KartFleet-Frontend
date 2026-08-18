"use client";

import { useState } from "react";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { ExportButton } from "@/components/export/ExportButton";
import { toast } from "@/components/ui/toast";
import type { Inversionista } from "@/modules/inversionista/types/inversionista.types";
import type { Vehiculo } from "@/modules/inversionista/types/vehiculo.types";

export function VehiculoExportButtons({ vehiculos, inversionistas }: { vehiculos: Vehiculo[]; inversionistas: Inversionista[] }) {
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const exportExcel = async () => {
    if (isExcelLoading) return;
    setIsExcelLoading(true);
    try {
      const { exportVehiculosToExcel } = await import("@/modules/inversionista/services/vehiculo-excel.service");
      await exportVehiculosToExcel(vehiculos, inversionistas);
      toast.success("Archivo Excel generado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo generar el archivo Excel.");
    } finally {
      setIsExcelLoading(false);
    }
  };

  const exportPdf = async () => {
    if (isPdfLoading) return;
    setIsPdfLoading(true);
    try {
      const { exportVehiculosToPdf } = await import("@/modules/inversionista/services/vehiculo-pdf.service");
      await exportVehiculosToPdf(vehiculos, inversionistas);
      toast.success("Archivo PDF generado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo generar el archivo PDF.");
    } finally {
      setIsPdfLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <ExportButton variant="excel" label="Excel" loadingLabel="Generando Excel..." isLoading={isExcelLoading} icon={FileSpreadsheet} onClick={exportExcel} />
      <ExportButton variant="pdf" label="PDF" loadingLabel="Generando PDF..." isLoading={isPdfLoading} icon={FileDown} onClick={exportPdf} />
    </div>
  );
}
