import { Articles } from "components/feed/articles";
import { Container } from "components/layout/container";
import { fetchArticles } from "repositories/article/article.repository";
import type { Viewport } from "types/viewport";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export const revalidate = 3600;

const FeedPage = async ({ searchParams }: Props) => {
  const viewport = searchParams.viewport as Viewport;

  const { results } = await fetchArticles();

  return (
    <Container className="min-h-[calc(100vh-9rem)] py-10">
      <Articles articles={results} viewport={viewport} />
    </Container>
  );
};

export default FeedPage;
