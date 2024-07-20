import Link from "next/link";

import type { ReactNode } from "react";

import dayjs from "dayjs";

import { Rotator } from "components/layout/rotator";
import { Card } from "components/ui/card";
import { getCoverImageUrl, getPlainText } from "libs/notion/notion.utils";
import type { Article } from "repositories/article/article.repository";
import type { Viewport } from "types/viewport";

type Props = {
  article: Article;
  viewport: Viewport;
};

export const ArticleCard = ({ article, viewport }: Props) => {
  const { id, properties, cover } = article;

  const title = getPlainText(properties.title) ?? "";
  const description = getPlainText(properties.description) ?? "";
  const coverImageUrl = getCoverImageUrl(cover) ?? "";
  const series = properties.series.select?.name ?? "";
  const publishedAt = properties.publishedAt.date?.start ?? "";

  const formattedPublishedAt = publishedAt ? dayjs(publishedAt).format("MMM D, YYYY") : undefined;

  return renderContainer(
    viewport,
    <Link href={`/articles/${id}`} draggable={false}>
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
    </Link>,
  );
};

const renderContainer = (viewport: Viewport, children: ReactNode) => {
  switch (viewport) {
    case "desktop":
      return <Rotator as="li">{children}</Rotator>;
    default:
      return <li>{children}</li>;
  }
};
