import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui";
import LogoImage from "./Logo";

function LeftSideBar() {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <LogoImage width={170} height={36} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <div className="small-regular text-light-3">@{user?.username}</div>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map(({ route, label, imgURL }: INavLink) => {
            const isActive = pathname === route;

            return (
              <li
                key={label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink to={route} className="flex gap-4 items-center p-4">
                  <img
                    src={imgURL}
                    alt={label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => signOut}>
        <p className="small-medium lg:base-medium">Logout</p>
        <img src="/assets/icons/logout.svg" alt="logout" />
      </Button>
    </nav>
  );
}

export default LeftSideBar;
