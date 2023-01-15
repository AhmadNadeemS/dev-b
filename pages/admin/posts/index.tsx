import { NextPage } from "next";
import AdminNav from "../../../components/common/Nav/AdminNav";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
} from "react-icons/ai";
import AdminLayout from "../../../components/layout/AdminLayout";
import { useState } from "react";
import PostCard from "../../../components/common/PostCard";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PostDetail } from "../../../utils/types";
import { formatPosts, readPostsFromDb } from "../../../lib/utils";
import InfiniteScrollPosts from "../../../components/common/InfiniteScrollPosts";
import axios from "axios";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { filterPosts } from "../../../utils/helper";
const posts = [
  {
    title: "This is my new post for now",
    slug: "This-is-my-new-post-for-now",
    meta: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate ab vitae, quasi quod aliquam accusantium.",
    tags: ["post"],
    thumbnail:
      "https://images.pexels.com/photos/12967/pexels-photo-12967.jpeg?auto-compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    createdAt: "",
  },
  {
    title: "This is my new post for now",
    slug: "This-is-my-new-post-for-now",
    meta: "Lorem, ",
    tags: ["post"],
    thumbnail:
      "https://images.pexels.com/photos/12967/pexels-photo-12967.jpeg?auto-compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    createdAt: "Mon Oct 10 2022 14:58:34 GMT+530 (India Standard Time)",
  },
  {
    title: "This is my new post for now",
    slug: "This-is-my-new-post-for-now",
    meta: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate ab vitae, quasi quod aliquam accusantium.",
    tags: ["post", "new"],
    thumbnail:
      "https://images.pexels.com/photos/12967/pexels-photo-12967.jpeg?auto-compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    createdAt: "Mon Oct 10 2022 14:58:34 GMT+530 (India Standard Time)",
  },
  {
    title: "This is my new post for now",
    slug: "This-is-my-new-post-for-now",
    meta: "Lorem",
    tags: ["post"],
    // thumbnail:
    //   "https://images.pexels.com/photos/12967/pexels-photo-12967.jpeg?auto-compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    createdAt: "",
  },
];

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;
// interface Props {}

const Posts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);
  const fetchMorePosts = async () => {
    try {
      pageNo = pageNo + 1;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
      );
      if (data.posts.length) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else {
        setPostsToRender([...postsToRender, ...data.posts]);
      }
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <InfiniteScrollPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls
        onPostRemoved={(post) =>
          setPostsToRender(filterPosts(postsToRender, post))
        }
      />

      {/* <div className="max-w-4xl mx-auto p-3">
        <div className="grid grid-cols-3 gap-4">
          {postsToRender.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      </div> */}
    </AdminLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    const posts = await readPostsFromDb(limit, pageNo);
    const formattedPost = formatPosts(posts);
    return {
      props: {
        posts: formattedPost,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Posts;
