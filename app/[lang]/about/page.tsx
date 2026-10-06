import { AboutPage } from "@/components/pages/AboutPage";
import { toLocale } from "@/content/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  return pageMetadata(toLocale((await params).lang), "about");
}

export default async function Page({ params }: PageProps<"/[lang]/about">) {
  return <AboutPage locale={toLocale((await params).lang)} />;
}
