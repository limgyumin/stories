import Image from "next/image";

import Balancer from "react-wrap-balancer";

import dayjs from "dayjs";

import { Container } from "components/layout/container";
import { getCoverImageUrl, getPlainText } from "libs/notion/notion.utils";
import type { Article } from "repositories/article/article.repository";

type Props = {
  article: Article;
};

export const Jumbotron = async ({ article }: Props) => {
  const { properties, cover } = article;

  const title = getPlainText(properties.title) ?? "";
  const description = getPlainText(properties.description) ?? "";
  const coverImageUrl = getCoverImageUrl(cover) ?? "";
  const series = properties.series.select?.name ?? "";
  const publishedAt = properties.publishedAt.date?.start ?? "";

  const formattedPublishedAt = publishedAt ? dayjs(publishedAt).format("MMMM D, YYYY") : undefined;

  return (
    <Container className="flex flex-col gap-7">
      <div className="relative w-full overflow-hidden pt-[30%]">
        <Image className="absolute top-0 w-full object-cover" src={coverImageUrl} alt={coverImageUrl} priority fill />
      </div>

      <div className="flex flex-col">
        <p className="mb-3 text-sm font-light text-muted-foreground">
          {series} | {formattedPublishedAt}
        </p>

        <h1 className="mb-2 break-keep text-2xl font-semibold !leading-tight md:text-3xl">
          <Balancer>{title}</Balancer>
        </h1>

        <p className="break-keep text-sm font-light leading-snug">
          <Balancer>{description}</Balancer>
        </p>
      </div>
    </Container>
  );
};
