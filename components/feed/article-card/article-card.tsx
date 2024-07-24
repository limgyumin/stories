import Link from "next/link";

import dayjs from "dayjs";

import { Card } from "components/ui/card";
import { getCoverImageUrl, getPlainText } from "libs/notion/notion.utils";
import type { Article } from "repositories/article/article.repository";

type Props = {
  article: Article;
};

export const ArticleCard = ({ article }: Props) => {
  const { id, properties, cover } = article;

  const title = getPlainText(properties.title) ?? "";
  const description = getPlainText(properties.description) ?? "";
  const coverImageUrl = getCoverImageUrl(cover) ?? "";
  const series = properties.series.select?.name ?? "";
  const publishedAt = properties.publishedAt.date?.start ?? "";

  const formattedPublishedAt = publishedAt ? dayjs(publishedAt).format("MMM D, YYYY") : undefined;

  return (
    <li>
      <Link href={`/articles/${id}`}>
        <Card.Root>
          <Card.Content>
            <Card.Title>{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
            <Card.Meta>
              {series} • {formattedPublishedAt}
            </Card.Meta>
          </Card.Content>

          <Card.Thumbnail src={coverImageUrl} />
        </Card.Root>
      </Link>
    </li>
  );
};
