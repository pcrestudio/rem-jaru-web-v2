const ReportEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <div className="flex flex-col gap-2 items-center justify-center w-full lg:max-w-[50%]">
        <h1 className="text-center font-bold">
          Utiliza los filtros para explorar la información relevante y generar
          reportes personalizados de manera rápida y eficiente.
        </h1>
        <p className="text-xs">
          Haz clic en alguno de los filtros para comenzar.
        </p>
      </div>
      <img alt="" className="w-full h-[340px]" src="/empty_state_search.svg" />
    </div>
  );
};

export default ReportEmptyState;
