import { FC, useState } from "react";
import { BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { BubbleMenu, Editor } from "@tiptap/react";
import LinkForm, { linkOptions } from "./LinkForm";

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditForm, setShowEditForm] = useState(false);
  const handleOnLinkOpenClick = () => {
    const { href } = editor.getAttributes("link");
    if (href) {
      window.open(href, "_blank");
    }
    window.open(href);
  };
  const handleOnLinkEditClick = () => {
    setShowEditForm(true);
  };
  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };
  const handleSubmit = ({ url, openInNewTab }: linkOptions) => {
    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
      .run();
    setShowEditForm(false);
  };

  const getInitialState = () => {
    const { href, target } = editor.getAttributes("link");
    return { url: href, openInNewTab: target ? true : false };
  };

  // if (!editor) return null;
  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive("link")}
      editor={editor}
      tippyOptions={{
        onHide: () => {
          setShowEditForm(false);
        },
        appendTo: "parent",
      }}
    >
      <LinkForm
        visible={showEditForm}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />
      {!showEditForm && (
        <div className="bg-primary dark:bg-primary-dark dark:text-primary  text-primary-dark p-2 space-x-6 rounded shadow-sm flex items-center shadow-secondary-dark max-w-max">
          <button>
            <BsBoxArrowUpRight onClick={handleOnLinkOpenClick} />
          </button>
          <button>
            <BsPencilSquare onClick={handleOnLinkEditClick} />
          </button>
          <button>
            <BiUnlink onClick={handleUnlinkClick} />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
