import { useEffect, useState } from "react";

interface Identifiable {
  id: string | number;
}

export const usePositionTracking = <T extends Identifiable>(items: T[]) => {
  const [positions, setPositions] = useState(new Map());
  const [prevPosts, setPrevPosts] = useState(items);

  useEffect(() => {
    const newPositions = new Map();
    prevPosts.forEach((item, index) => {
      newPositions.set(item.id, index);
    });
    setPositions(newPositions);
    setPrevPosts(items);
  }, [items]);

  return {
    hasPosition: (id: string | number) => positions.has(id),
  };
};
