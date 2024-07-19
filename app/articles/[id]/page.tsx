import { Body } from "components/article/body";
import { Jumbotron } from "components/article/jumbotron";
import { fetchArticles } from "repositories/article/article.repository";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export const revalidate = 3600;

export const generateStaticParams = async () => {
  const { results } = await fetchArticles({ pageSize: 10 });

  return results.map((article) => ({ id: article.id }));
};

const ArticlePage = async ({ params }: Props) => {
  const { id } = params;

  return (
    <article className="flex flex-col gap-8 md:gap-14">
      <Jumbotron id={id} />
      <Body id={id} />
    </article>
  );
};

export default ArticlePage;
