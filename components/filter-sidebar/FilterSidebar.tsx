import { Input } from "@nextui-org/input";
import { AiOutlineSearch } from "react-icons/ai";
import { ChangeEvent } from "react";

import useStore from "@/lib/store";
import debounce from "@/utils/custom_debounce";

const FilterSidebar = () => {
  const { updateFilter } = useStore();

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "search") {
      updateFilter({
        search: value,
      });
    }
  };

  const debouncedSearch = debounce(handleFilter, 700);

  return (
    <div className="flex flex-col gap-4 shadow-lg p-6 bg-white md:w-[18%] md:max-w-[18%] h-[calc(100vh-72px)]">
      <Input
        className="nextui-input-filter bg-white"
        classNames={{
          inputWrapper: "bg-white shadow-none data-[focus=true]:!bg-white",
          base: "!bg-red-500",
        }}
        endContent={<AiOutlineSearch size={24} />}
        name="search"
        placeholder="Buscar coincidencias..."
        onChange={(event) => debouncedSearch(event)}
      />
    </div>
  );
};

export default FilterSidebar;
