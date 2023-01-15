import { FC, ReactNode, useState } from "react";

export type dropdownOptions = {
  label: string;
  onClick: () => void;
}[];

interface Props {
  options: dropdownOptions;
  head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ options, head }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <button
      onBlur={() => setShowOptions(false)}
      className="relative"
      onMouseDown={() => setShowOptions(!showOptions)}
    >
      {head}
      {showOptions && (
        <div className="border-2 border-primary-dark dark:border-primary bg-primary rounded dark:bg-primary-dark absolute min-w-max top-full mt-4 right-2 text-left z-10">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }) => {
              return (
                <li
                  className="text-primary-dark dark:text-primary"
                  key={label}
                  onMouseDown={onClick}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;
