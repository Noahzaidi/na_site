import { LegalPage } from "@/components/pages/LegalPage";
import { toLocale } from "@/content/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal">) {
  return pageMetadata(toLocale((await params).lang), "legal");
}

export default async function Page({ params }: PageProps<"/[lang]/legal">) {
  return <LegalPage locale={toLocale((await params).lang)} />;
}
