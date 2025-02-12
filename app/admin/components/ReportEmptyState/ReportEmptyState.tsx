import { Button } from "@heroui/button";

import useStore from "@/lib/store";

const ReportEmptyState = () => {
  const { clearFilter } = useStore();

  const handleClearFilter = () => clearFilter();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <img alt="" className="w-full h-[340px]" src="/empty_state.svg" />
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-bold text-cerulean-950">Sin resultados</h2>
        <p className="text-foreground text-base">
          No hemos encontrado datos para mostrar en este reporte. Intenta
          ajustar los filtros o inténtalo de nuevo más tarde.
        </p>
      </div>
      <Button
        className="bg-cerulean-950 text-white font-bold"
        color="primary"
        onPress={handleClearFilter}
      >
        <span>Reintentar</span>
      </Button>
    </div>
  );
};

export default ReportEmptyState;
