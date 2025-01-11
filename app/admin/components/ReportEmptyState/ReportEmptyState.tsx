import useStore from "@/lib/store";
import { Button } from "@nextui-org/button";

const ReportEmptyState = () => {
  const { clearFilter } = useStore();

  const handleClearFilter = () => clearFilter();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <img src="/empty_state.svg" className="w-full h-[340px]" alt="" />
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-bold text-cerulean-950">Sin resultados</h2>
        <p className="text-foreground text-base">
          No hemos encontrado datos para mostrar en este reporte. Intenta
          ajustar los filtros o inténtalo de nuevo más tarde.
        </p>
      </div>
      <Button
        onClick={handleClearFilter}
        color="primary"
        className="bg-cerulean-200 text-cerulean-950 font-bold"
      >
        <span>Reintentar</span>
      </Button>
    </div>
  );
};

export default ReportEmptyState;
