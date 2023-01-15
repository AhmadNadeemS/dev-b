import axios from "axios";
import { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import InfiniteScrollPosts from "../components/common/InfiniteScrollPosts";
import DefaultLayout from "../components/layout/DefaultLayout";
import { formatPosts, readPostsFromDb } from "../lib/utils";
import { filterPosts } from "../utils/helper";
import { PostDetail, UserProfile } from "../utils/types";

let pageNo = 0;
const limit = 9;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

  const { data } = useSession();
  const profile = data?.user as UserProfile;
  const isAdmin = profile && profile.role === "admin";

  const fetchMorePosts = async () => {
    try {
      pageNo = pageNo + 1;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
      );
      console.log(data.post.length);
      if (data.posts.length < limit) {
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
    <DefaultLayout>
      <div className="pb-20">
        <InfiniteScrollPosts
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls={isAdmin}
          onPostRemoved={(post) =>
            setPostsToRender(filterPosts(postsToRender, post))
          }
        />
      </div>{" "}
    </DefaultLayout>
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

export default Home;
