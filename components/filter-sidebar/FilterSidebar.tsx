import { Input } from "@nextui-org/input";
import { AiOutlineSearch } from "react-icons/ai";
import useStore from "@/lib/store";
import { ChangeEvent } from "react";
import debounce from "@/utils/custom_debounce";

const FilterSidebar = () => {
  const { updateFilter, filter } = useStore();

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
    <div className="flex flex-col gap-4 shadow-lg p-6 bg-white md:w-[18%] md:max-w-[18%]">
      <Input
        name="search"
        className="nextui-input-filter bg-white"
        classNames={{
          inputWrapper: "bg-white shadow-none data-[focus=true]:!bg-white",
          base: "!bg-red-500",
        }}
        placeholder="Buscar coincidencias..."
        endContent={<AiOutlineSearch size={24} />}
        onChange={(event) => debouncedSearch(event)}
      />
    </div>
  );
};

export default FilterSidebar;
