import { useEffect, useState } from "react";

import { Post } from "@/types/post.ts";

export const usePositionTracking = (posts: Post[]) => {
  const [positions, setPositions] = useState(new Map());
  const [prevPosts, setPrevPosts] = useState(posts);

  useEffect(() => {
    const newPositions = new Map();
    prevPosts.forEach((post, index) => {
      newPositions.set(post.id, index);
    });
    setPositions(newPositions);
    setPrevPosts(posts);
  }, [posts]);

  return {
    hasPosition: (id: string | number) => positions.has(id),
  };
};
