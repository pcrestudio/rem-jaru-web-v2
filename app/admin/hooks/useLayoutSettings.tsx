import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface UseLayoutSettingsProps {
  showFilterSidebar: boolean;
}

const UseLayoutSettings = (pathname: string): UseLayoutSettingsProps => {
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(true);

  useEffect(() => {
    if (pathname.includes("create") || pathname.includes("edit")) {
      setShowFilterSidebar(false);
    } else {
      setShowFilterSidebar(true);
    }
  }, [pathname]);

  return {
    showFilterSidebar,
  };
};

export default UseLayoutSettings;
