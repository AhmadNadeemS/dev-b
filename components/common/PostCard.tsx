import Image from "next/image";
import { FC } from "react";
import { PostDetail } from "../../utils/types";
import dateFormat from "dateformat";
import Link from "next/link";

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick(): void;
}

const PostCard: FC<Props> = ({
  post,
  busy,
  controls = false,
  onDeleteClick,
}): JSX.Element => {
  const { title, meta, slug, tags, thumbnail, createdAt } = post;
  return (
    <div className="rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark transition flex flex-col h-full">
      <div className="aspect-video relative">
        {!thumbnail ? (
          <div className="flex justify-center items-center w-full h-full">
            No Image
          </div>
        ) : (
          <Image src={thumbnail} alt="Thumbnail" layout="fill" />
        )}
      </div>
      <div className="flex flex-col flex-1 p-2">
        <Link href={"/" + slug}>
          <a>
            <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
              <div className="flex items-center space-x-1">
                {tags?.map((t, index) => (
                  <span key={t + index}>#{t}</span>
                ))}
              </div>
              <span>{dateFormat(createdAt, "d-mmm-yyyy")}</span>
            </div>
            <h1 className="font-semibold text-primary-dark dark:text-primary">
              {trimText(title, 50)}
            </h1>
            <p className="text-secondary-dark">{trimText(meta, 70)}</p>
          </a>
        </Link>
        {controls && (
          <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
            {busy ? (
              <span className="animate-pulse">Removing</span>
            ) : (
              <>
                {" "}
                <Link href={"/admin/posts/update/" + slug}>
                  <a className="hover:underline">Edit</a>
                </Link>
                <button className="hover:underline" onClick={onDeleteClick}>
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
