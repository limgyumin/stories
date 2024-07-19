import { Body } from "components/article/body";
import { Jumbotron } from "components/article/jumbotron";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export const revalidate = 3600;

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
