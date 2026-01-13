"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <Giscus
        id="comments"
        repo="JangDongHo/dongho-blog"
        repoId="R_kgDOQasZ6w"
        category="Announcements"
        categoryId="DIC_kwDOQasZ684C06LF"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
