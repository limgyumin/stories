import type { Article } from "repositories/article/article.repository";

import { ArticleCard } from "../article-card";

type Props = {
  articles: Article[];
};

export const Articles = ({ articles }: Props) => {
  return (
    <ul className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ul>
  );
};
