import { Articles } from "components/feed/articles";
import { fetchArticles } from "repositories/article/article.repository";

export const revalidate = 3600;

const FeedPage = async () => {
  const { results } = await fetchArticles();

  return <Articles articles={results} />;
};

export default FeedPage;
