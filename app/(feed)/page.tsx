import { Articles } from "components/feed/articles";
import { Container } from "components/layout/container";
import { fetchArticles } from "repositories/article/article.repository";

export const revalidate = 3600;

const FeedPage = async () => {
  const { results } = await fetchArticles();

  return (
    <Container className="min-h-[calc(100vh-9rem)] py-10">
      <Articles articles={results} />
    </Container>
  );
};

export default FeedPage;
