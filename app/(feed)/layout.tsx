import type { PropsWithChildren } from "react";

import { Container } from "components/layout/container";

const FeedLayout = ({ children }: PropsWithChildren) => {
  return <Container className="py-10">{children}</Container>;
};

export default FeedLayout;
