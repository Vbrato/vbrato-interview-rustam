import { useEffect, useRef } from "react";
import { useState } from "react";

const POSTS_FETCH_LIMIT = 10;

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${POSTS_FETCH_LIMIT}`
        );
        const data = await response.json();

        if (ignore) return;
        setPosts((p) => [...p, ...data]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();

    return () => {
      ignore = true;
    };
  }, [start]);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = (event) => {
      const containerHeight = container.clientHeight;
      const scrollDistance = container.scrollTop;
      const contentHeight = container.scrollHeight;

      if (contentHeight - scrollDistance - containerHeight <= 1) {
        setStart((p) => p + POSTS_FETCH_LIMIT);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    posts,
    containerRef,
    isLoading,
    isError,
  };
};

function Posts() {
  const { posts, containerRef, isLoading, isError } = usePosts();

  useEffect(() => {
    console.log(`>>> posts`, posts);
  }, [posts]);

  return (
    <div className="posts" ref={containerRef}>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          {post.title}
        </div>
      ))}
      {isLoading && <div class="loading">Loading...</div>}
      {isError && <div class="error">Failed to fetch</div>}
    </div>
  );
}

export default Posts;
