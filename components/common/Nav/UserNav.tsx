import Link from "next/link";
import { FC } from "react";
import { APP_NAME } from "../AppHead";
import { HiLightBulb } from "react-icons/hi";
import Logo from "../Logo";
import { GitHubAuthButton } from "../../button";
import ProfileHead from "../ProfileHead";
import DropdownOptions, { dropdownOptions } from "../DropdownOptions";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { UserProfile } from "../../../utils/types";
import useDarkMode from "../../../hooks/useDarkMode";

interface Props {}

const defaultOptions: dropdownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();

  const isAuth = status === "authenticated";
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile && profile.role === "admin";
  const { toggleTheme } = useDarkMode();
  const dropdownOptions: dropdownOptions = isAdmin
    ? [
        {
          label: "Dashboard",
          onClick() {
            router.push("/admin");
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;
  const handleLoginWithGithub = async () => {
    await signIn("github");
  };
  return (
    <div className="flex justify-between items-center bg-primary-dark p-3">
      {/* Logo */}
      <Link href="/">
        <a className="flex space-x-2 text-highlight-dark">
          <Logo className="fill-highlight-dark" />
          <span className="text-xl font-semibold">{APP_NAME}</span>
        </a>
      </Link>
      <div className="flex items-center space-x-5">
        <button
          onClick={toggleTheme}
          className="dark:text-secondary-dark text-secondary-light"
        >
          <HiLightBulb size={34} />
        </button>
        {isAuth ? (
          <DropdownOptions
            options={dropdownOptions}
            head={<ProfileHead nameInitial="A" lightOnly />}
          />
        ) : (
          <GitHubAuthButton onClick={handleLoginWithGithub} lightOnly />
        )}
      </div>
    </div>
  );
};

export default UserNav;
