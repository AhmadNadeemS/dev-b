import { FC, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../ToolBar/Button";
import LinkForm, { linkOptions } from "./LinkForm";

interface Props {
  onSubmit(link: linkOptions): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const handleSubmit = (link: linkOptions) => {
    if (!link.url.trim()) return setVisible(false);
    onSubmit(link);
    setVisible(false);
  };
  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") setVisible(false);
      }}
      className="relative"
    >
      <Button onClick={() => setVisible(!visible)}>
        <BsLink45Deg />
      </Button>
      <div className="absolute top-full mt-4 z-50 right-0">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
