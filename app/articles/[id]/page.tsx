import type { Metadata } from "next";

import { Body } from "components/article/body";
import { Jumbotron } from "components/article/jumbotron";
import { getCoverImageUrl, getPlainText } from "libs/notion/notion.utils";
import { fetchArticles, fetchArticle } from "repositories/article/article.repository";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export const revalidate = 3600;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = params;

  try {
    const { cover, properties, lastEditedTime } = await fetchArticle(id);

    const title = getPlainText(properties.title);
    const description = getPlainText(properties.description);
    const coverImageUrl = getCoverImageUrl(cover);

    const publishedAt = properties.publishedAt.date?.start ?? "";

    return {
      title,
      description,
      alternates: {
        canonical: `/articles/${id}`,
      },
      openGraph: {
        title,
        description,
        type: "article",
        siteName: "Nonamed",
        url: `/articles/${id}`,
        publishedTime: new Date(publishedAt).toISOString(),
        modifiedTime: new Date(lastEditedTime).toISOString(),
        ...(coverImageUrl && { images: [coverImageUrl] }),
      },
      twitter: {
        title,
        description,
        card: "summary_large_image",
        ...(coverImageUrl && { images: [coverImageUrl] }),
      },
    };
  } catch (err) {
    return {};
  }
};

export const generateStaticParams = async () => {
  const { results } = await fetchArticles({ pageSize: 10 });

  return results.map((article) => ({ id: article.id }));
};

const ArticlePage = async ({ params }: Props) => {
  const { id } = params;

  return (
    <div className="min-h-[calc(100vh-9rem)] pb-12 pt-10 md:pb-20">
      <article className="flex flex-col gap-8 md:gap-14">
        <Jumbotron id={id} />
        <Body id={id} />
      </article>
    </div>
  );
};

export default ArticlePage;
