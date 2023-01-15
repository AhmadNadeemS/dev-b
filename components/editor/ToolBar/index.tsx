import { Editor } from "@tiptap/react";
import { FC, useState } from "react";
import DropdownOptions from "../../common/DropdownOptions";
import { AiFillCaretDown } from "react-icons/ai";
import {
  BsTypeBold,
  BsTypeUnderline,
  BsTypeStrikethrough,
  BsTypeItalic,
  BsCode,
  BsBraces,
  BsListOl,
  BsListUl,
  BsImageFill,
  BsLink45Deg,
  BsYoutube,
} from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { getFocusedEditor } from "../EditorUtils";
import Button from "./Button";
import InsertLink from "../Link/InsertLink";
import { linkOptions } from "../Link/LinkForm";
import EmbedYoutube from "./EmbedYoutube";
import ModalContainer from "../../common/ModalContainer";
interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}

const ToolBar: FC<Props> = ({
  editor,
  onOpenImageClick,
}): JSX.Element | null => {
  if (!editor) return null;
  const options = [
    {
      label: "Paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];

  const getLabel = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraph";
  };
  const Head = () => {
    return (
      <div className="flex space-x-2 items-center dark:text-primary text-primary-dark">
        <p>{getLabel()}</p>
        <AiFillCaretDown />
      </div>
    );
  };

  const handleLinkSubmit = ({ url, openInNewTab }: linkOptions) => {
    if (openInNewTab) {
      editor.commands.setLink({ href: url, target: "_blank" });
    } else {
      editor.commands.setLink({ href: url });
    }
    //   onClear()
  };

  const handleEmbedYoutube = (url: string) => {
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };
  return (
    <div className="flex items-center">
      <DropdownOptions options={options} head={<Head />} />
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="space-x-3 flex items-center">
        <Button
          active={editor.isActive("bold")}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        >
          <BsTypeBold />
        </Button>
        <Button
          active={editor.isActive("italic")}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        >
          <BsTypeItalic />
        </Button>
        <Button
          active={editor.isActive("underline")}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        >
          <BsTypeUnderline />
        </Button>
        <Button
          active={editor.isActive("strike")}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        >
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="space-x-3 flex items-center">
        <Button
          active={editor.isActive("blockquote")}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </Button>
        <Button
          active={editor.isActive("code")}
          onClick={() => getFocusedEditor(editor).toggleCode().run()}
        >
          <BsCode />
        </Button>
        <Button
          active={editor.isActive("codeBlock")}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        >
          <BsBraces />
        </Button>
        {/* link */}
        <InsertLink onSubmit={handleLinkSubmit} />
        <Button
          active={editor.isActive("orderedList")}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        >
          <BsListOl />
        </Button>
        <Button
          active={editor.isActive("bulletList")}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        >
          <BsListUl />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="space-x-3 flex items-center">
        <Button onClick={onOpenImageClick}>
          <BsImageFill />
        </Button>
        <EmbedYoutube onSubmit={handleEmbedYoutube} />
      </div>
      {/* <ModalContainer /> */}
    </div>
  );
};

export default ToolBar;
