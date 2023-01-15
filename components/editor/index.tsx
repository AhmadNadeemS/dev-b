import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import ToolBar from "./ToolBar";
import EditLink from "./Link/EditLink";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import axios from "axios";
import SEOForm, { SeoResult } from "./SeoForm";
import ActionButton from "../common/ActionButton";
import ThumbnailSelector from "./ThumbnailSelector";

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
  onSubmit,
  initialValue,
  btnTitle = "Submit",
  busy = false,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });
  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
    // console.log(images);
  };

  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/image", formData);
    setUploading(false);
    setImages([data, ...images]);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Type something …",
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto ",
      },
    },
  });
  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setPost({ ...post, title: target.value });
  };
  const updateSeoValue = (result: SeoResult) => {
    setPost({ ...post, ...result });
  };
  const updateThumbnail = (file: File) => {
    setPost({ ...post, thumbnail: file });
  };
  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);
      const { meta, slug, tags } = post;
      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);
  return (
    <>
      <div className="bg-primary dark:bg-primary-dark p-3 transition">
        <div className="sticky top-0 bg-primary dark:bg-primary-dark">
          {/*Thumbnail selector and submit button  */}
          <div className="flex items-center justify-between mb-3">
            <ThumbnailSelector
              onChange={updateThumbnail}
              initialValue={post?.thumbnail as string}
            />
            <div className="inline-block">
              <ActionButton
                busy={busy}
                title={btnTitle}
                onClick={handleSubmit}
              />
            </div>
          </div>
          {/* Title Input */}
          <input
            type="text"
            className="bg-transparent w-full border-0 border-b-[1px] border-secondary-light dark:border-secondary-light outline-none text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3 py-2"
            placeholder="Title"
            onChange={updateTitle}
            value={post?.title}
          />
          <ToolBar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />
          <div className="h-[1px] w-full bg-secondary-dark my-3 dark:bg-secondary-light"></div>

          {editor ? <EditLink editor={editor} /> : null}

          <EditorContent editor={editor} className="min-h-[300px]" />
        </div>
        <div className="h-[1px] w-full bg-secondary-dark my-3 dark:bg-secondary-light"></div>
        <SEOForm
          onChange={updateSeoValue}
          title={post.title}
          initialValue={seoInitialValue}
        />
      </div>
      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onImageSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
