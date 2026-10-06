import { BookPage } from "@/components/pages/BookPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "book");

export default function Page() {
  return <BookPage locale="en" />;
}
