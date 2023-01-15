import Link from "next/link";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import Logo from "../Logo";
// import {
//   AiOutlineDashboard,
//   AiOutlineContainer,
//   AiOutlineTeam,
//   AiOutlineMail,
// } from "react-icons/ai";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { IconType } from "react-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface Props {
  navItems: {
    label: string;
    icon: IconType;
    href: string;
  }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  const toggleNav = (visibility: boolean) => {
    const { current: currentNav } = navRef;
    if (!currentNav) return;
    const { classList } = currentNav;
    if (visibility) {
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      classList.remove(NAV_CLOSE_WIDTH);
      classList.add(NAV_OPEN_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      className="w-60 bg-secondary-light dark:bg-secondary-dark h-screen shadow-sm dark:shadow-sm flex w- flex-col justify-between transition-width overflow-hidden sticky top-0"
      ref={navRef}
    >
      <div>
        {/* logo */}
        <Link href="/admin" legacyBehavior>
          <a className="flex items-center space-x-2 p-3 mb-10">
            {/*  adding this div fixed the animation problem */}
            <div className="flex space-x-2">
              <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
              {visible && (
                <span className="text-highlight-light dark:text-highlight-dark text-xl leading-none font-semibold">
                  Admin
                </span>
              )}
            </div>
          </a>
        </Link>

        {/* nav items */}

        <div className="space-y-6">
          {navItems.map((item) => {
            return (
              <Tippy key={item.href} content={item.label}>
                <div>
                  <Link href={item.href} key={item.href} legacyBehavior>
                    <a className="flex items-center p-3 text-highlight-light dark:text-highlight-dark text-xl hover:scale-[0.98] transition leading-none">
                      <item.icon size={24} />
                      {visible && (
                        <span className="ml-2 leading-none">{item.label}</span>
                      )}
                    </a>
                  </Link>
                </div>
              </Tippy>
            );
          })}
        </div>
      </div>

      {/* nav toggler (button) */}

      <button
        className="text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition p-3 self-end"
        onClick={updateNavState}
      >
        {visible ? (
          <RiMenuFoldLine size={25} />
        ) : (
          <RiMenuUnfoldLine size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
