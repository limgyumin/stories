import { Articles } from "components/feed/articles";
import { fetchArticles } from "repositories/article/article.repository";

const FeedPage = async () => {
  const { results } = await fetchArticles();

  return <Articles articles={results} />;
};

export default FeedPage;
