import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { toLocale } from "@/content/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  return pageMetadata(toLocale((await params).lang), "privacy");
}

export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  return <PrivacyPage locale={toLocale((await params).lang)} />;
}
