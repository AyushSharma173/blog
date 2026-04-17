import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description ?? "",
        link: `/writing/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
