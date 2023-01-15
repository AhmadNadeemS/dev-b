import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useDarkMode from "../../../hooks/useDarkMode";
import DropdownOptions, { dropdownOptions } from "../DropdownOptions";
import ProfileHead from "../ProfileHead";
import SearchBar from "../SearchBar";

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push("/admin/posts/create");
  const handleLogout = async () => await signOut();
  const options: dropdownOptions = [
    {
      label: "Add new post",
      onClick: navigateToCreateNewPost,
    },
    {
      label: "Toggle theme",
      onClick: toggleTheme,
    },
    {
      label: "Log out",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <DropdownOptions
        options={options}
        head={<ProfileHead nameInitial="A" />}
      />
    </div>
  );
};

export default AdminSecondaryNav;
