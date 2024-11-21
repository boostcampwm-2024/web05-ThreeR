import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { PostCard } from "@/components/common/Card/PostCard";

import { Post } from "@/types/post";

interface AnimatedPostGridProps {
  posts: Post[];
}

const AnimatedPostGrid = ({ posts }: AnimatedPostGridProps) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
      <AnimatePresence initial={false}>
        {posts.map((post, index) => {
          const prevPosition = positions.get(post.id) ?? index;
          const position = index;
          const moveUp = prevPosition > position;

          return (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: positions.has(post.id) ? 1 : 0, scale: positions.has(post.id) ? 1 : 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3 },
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              className={`${moveUp ? "z-10" : "z-0"}`}
            >
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: moveUp ? "rgba(255, 255, 255, 0.1)" : "transparent",
                }}
                transition={{ duration: 0.2 }}
              >
                <PostCard
                  post={post}
                  className={`transition-shadow duration-300 ${
                    moveUp ? "shadow-lg ring-2 ring-blue-500 ring-opacity-50" : ""
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPostGrid;
