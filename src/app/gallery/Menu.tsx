import React from "react";

interface MenuProps {
  currentMenu: string;
  setCurrentMenu: (menu: string) => void;
}

export default function Menu({ currentMenu, setCurrentMenu }: MenuProps) {
  const menuItems = [
    "Interior",
    "Exterior",
    "3D Modelling",
    "3D Floor Plan",
    "Product Modeling",
    "All",
  ];
  return (
    <div className="flex flex-wrap justify-center items-center gap-5 md:gap-14 text-[#00000099] p-5 text-sm md:text-base">
      {menuItems.map((item) => (
        <span
          key={item}
          onClick={() => setCurrentMenu(item)}
          className={`cursor-pointer hover:text-[#114046] ${currentMenu === item ? "text-[#114046] font-semibold" : ""
            }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
