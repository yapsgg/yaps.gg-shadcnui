import { redirect } from "next/navigation";

import { NOTION_PAGES, notionUrl } from "@/lib/notion";

export default function Page() {
  redirect(notionUrl(NOTION_PAGES["open-community"]));
}
