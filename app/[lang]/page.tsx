import { HomePage } from "@/components/pages/HomePage";
import { toLocale } from "@/content/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  return pageMetadata(toLocale((await params).lang), "home");
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  return <HomePage locale={toLocale((await params).lang)} />;
}
