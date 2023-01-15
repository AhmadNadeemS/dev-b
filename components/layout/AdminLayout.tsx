import { FC, ReactNode } from "react";
import AdminNav from "../common/Nav/AdminNav";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
} from "react-icons/ai";
import Link from "next/link";
import AppHead from "../common/AppHead";
import AdminSecondaryNav from "../common/Nav/AdminSecondaryNav";

const navItems = [
  {
    href: "/admin",
    icon: AiOutlineDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/posts",
    icon: AiOutlineContainer,
    label: "Posts",
  },
  {
    href: "/admin/users",
    icon: AiOutlineTeam,
    label: "Users",
  },
  {
    href: "/admin/comments",
    icon: AiOutlineMail,
    label: "Comments",
  },
];

interface Props {
  children: ReactNode;
  title?: string;
}

const AdminLayout: FC<Props> = ({ title, children }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4 dark:bg-primary-dark bg-primary">
          <AdminSecondaryNav />
          {children}
        </div>
        <Link href="/admin/posts/create" legacyBehavior>
          <a className=" right-10 bottom-10 rounded-full flex text-primary dark:text-primary-dark justify-center items-center fixed bg-secondary-dark dark:bg-secondary-light p-3 shadow-sm transition hover:scale-90">
            <AiOutlineContainer size={24} />
          </a>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
