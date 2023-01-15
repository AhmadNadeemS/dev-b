import axios from "axios";
import { FC, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetail } from "../../utils/types";
import ConfirmModal from "./ConfirmModal";
import PostCard from "./PostCard";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved(post: PostDetail): void;
}

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  hasMore,
  next,
  loader,
  dataLength,
  showControls,
  onPostRemoved,
}): JSX.Element => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);
  const [removing, setRemoving] = useState(false);

  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();
    setShowConfirmModal(false);
    setRemoving(true);
    const { data } = await axios.delete(`/api/posts/${postToRemove.id}`);
    if (data.removed) onPostRemoved(postToRemove);
    setRemoving(false);
  };
  const defaultLoader = <p className="">Loading...</p>;
  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <div className="max-w-4xl mx-auto p-3">
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard
                post={post}
                key={post.slug}
                controls={showControls}
                onDeleteClick={() => handleOnDeleteClick(post)}
                busy={post.id === postToRemove?.id && removing}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={handleDeleteCancel}
        onCancel={handleDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
        title="Are you sure?"
        subTitle="This action will remove this post permanently."
      />
    </>
  );
};

export default InfiniteScrollPosts;
