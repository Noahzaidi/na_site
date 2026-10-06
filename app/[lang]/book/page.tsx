import { BookPage } from "@/components/pages/BookPage";
import { toLocale } from "@/content/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/book">) {
  return pageMetadata(toLocale((await params).lang), "book");
}

export default async function Page({ params }: PageProps<"/[lang]/book">) {
  return <BookPage locale={toLocale((await params).lang)} />;
}
