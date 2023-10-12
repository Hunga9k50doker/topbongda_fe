"use client";
import { useDebounce } from "react-use";
import { putHitViewCountAPI } from "@/apis/forum_apis";

interface HitViewCountProps {
  topicCode: string;
}

function HitViewCount({ topicCode, ...props }: HitViewCountProps) {
  useDebounce(() => {
    putHitViewCountAPI({ topicCode })
      .then((r) => {})
      .catch(() => {});
  }, 2000);

  return null;
}

export default HitViewCount;
