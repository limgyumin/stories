import { Container } from "components/layout/container";
import { fetchArticleBody } from "repositories/article/article.repository";

import { Block } from "../block";

type Props = {
  id: string;
};

export const Body = async ({ id }: Props) => {
  const { results: blocks } = await fetchArticleBody(id);

  return (
    <Container size="sm">
      <article className="whitespace-pre-wrap font-normal leading-relaxed text-gray-800 dark:text-gray-400">
        {blocks.map((block, index) => (
          <Block key={block.id} block={block} blocks={blocks} index={index} />
        ))}
      </article>
    </Container>
  );
};
