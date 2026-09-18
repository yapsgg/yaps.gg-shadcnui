import { notFound, redirect } from "next/navigation";

import { NOTION_PAGES, notionUrl } from "@/lib/notion";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const id = NOTION_PAGES[`things/${slug.join("/")}`];

  if (!id) {
    notFound();
  }

  redirect(notionUrl(id));
}
