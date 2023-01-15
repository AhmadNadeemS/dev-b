import { FC, MouseEventHandler, ReactNode, useCallback } from "react";
import classNames from "classnames";
interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({
  children,
  active,
  disabled,
  onClick,
  onMouseDown,
}): JSX.Element => {
  const getActiveStyle = useCallback(() => {
    if (active) {
      return "dark:bg-primary dark:text-dark-primary bg-primary-dark text-primary";
    } else {
      return "text-secondary-light bg-red-400";
    }
  }, [active]);
  const commonClasses =
    "p-2 text-lg rounded hover:scale-110 transition hover:shadow-md";
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onClick={onClick}
      disabled={disabled}
      className={classNames(commonClasses, getActiveStyle())}
    >
      {children}
    </button>
  );
};

export default Button;
