// import React from "react";
import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

function BottomBar() {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map(({ route, label, imgURL }: INavLink) => {
        const isActive = pathname === route;

        return (
          <Link
            to={route}
            key={label}
            className={`flex-center flex-col gap-1 p-2 transition ${
              isActive && "bg-primary-500 rounded-[10px]"
            }`}>
            <img
              src={imgURL}
              alt={label}
              width={16}
              height={16}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            <p className="tiny-medium text-light-2">{label}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default BottomBar;
