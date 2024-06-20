import { Masonry } from "components/layout/masonry";
import type { Article } from "repositories/article/article.repository";

import { ArticleCard } from "../article-card";

type Props = {
  articles: Article[];
};

export const Articles = ({ articles }: Props) => {
  return (
    <Masonry column={3} gap={20}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Masonry>
  );
};
