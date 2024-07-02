import { Rotator } from "components/layout/rotator";
import { Card } from "components/ui/card";
import { getCoverImageUrl, getPlainText } from "libs/notion/notion.utils";
import type { Article } from "repositories/article/article.repository";

type Props = {
  article: Article;
};

export const ArticleCard = ({ article }: Props) => {
  const title = getPlainText(article.properties.Title) ?? "";
  const description = getPlainText(article.properties.Description) ?? "";
  const coverImageUrl = getCoverImageUrl(article.cover) ?? "";

  return (
    <Rotator>
      <Card.Root>
        <Card.Content>
          <Card.Title>{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Content>

        <Card.Thumbnail src={coverImageUrl} />
      </Card.Root>
    </Rotator>
  );
};
