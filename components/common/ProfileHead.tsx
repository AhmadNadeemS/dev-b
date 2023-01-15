import classNames from "classnames";
import Image from "next/image";
import { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const ProfileHead: FC<Props> = ({
  lightOnly,
  avatar,
  nameInitial,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "bg-primary text-dark-primary"
      : "bg-primary-dark text-primary dark:bg-primary dark:text-primary-dark";
  }, [lightOnly]);

  const commonClasses =
    "relative flex items-center justify-center overflow-hidden rounded-full w-8 h-8";

  return (
    <div className="flex items-center">
      {/* image / nameInitial */}
      <div className={classNames(commonClasses, getStyle())}>
        {avatar ? (
          <Image src={avatar} layout="fill" alt="profile" />
        ) : (
          nameInitial
        )}
      </div>
      {/* down icon */}
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary" : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
