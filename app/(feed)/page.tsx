import { Articles } from "components/feed/articles";
import { fetchArticles } from "repositories/article/article.repository";
import type { Viewport } from "types/viewport";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export const revalidate = 3600;

const FeedPage = async ({ searchParams }: Props) => {
  const viewport = searchParams.viewport as Viewport;

  const { results } = await fetchArticles();

  return <Articles articles={results} viewport={viewport} />;
};

export default FeedPage;
