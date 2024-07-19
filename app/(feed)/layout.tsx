import type { PropsWithChildren } from "react";

import { Container } from "components/layout/container";

const FeedLayout = ({ children }: PropsWithChildren) => {
  return <Container className="min-h-[calc(100vh-9rem)] py-10">{children}</Container>;
};

export default FeedLayout;
