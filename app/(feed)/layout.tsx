import type { PropsWithChildren } from "react";

import { Container } from "components/layout/container";

const FeedLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container className="py-10">
      <div className="min-h-[calc(100vh-14rem)]">{children}</div>
    </Container>
  );
};

export default FeedLayout;
