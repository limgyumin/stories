import type { PropsWithChildren } from "react";

const ArticleLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-[calc(100vh-9rem)] pb-12 pt-10 md:pb-20">{children}</div>;
};

export default ArticleLayout;
