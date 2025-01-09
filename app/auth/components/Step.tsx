import React, { useState, useEffect } from "react";

const Step = ({ children, isActive }) => {
  const [isVisible, setIsVisible] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true); // Make the step visible when active
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform w-full absolute ${
        isActive
          ? "opacity-100 translate-x-0" // Active step is visible
          : "opacity-0 translate-x-full" // Inactive step is hidden off-screen
      }`}
    >
      {isVisible && children} {/* Only show the children when visible */}
    </div>
  );
};

export default Step;
