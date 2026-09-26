import { createFileRoute } from "@tanstack/react-router";
import { BookQuoteStudio } from "@/components/book-quote-studio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "মধ্যরাতের চিরকুট — Premium Book Reel Studio" },
      { name: "description", content: "বাস্তব বইয়ের পাতায় বাংলা কোট বসিয়ে Facebook Reels তৈরি করুন।" },
      { property: "og:title", content: "মধ্যরাতের চিরকুট — Premium Book Reel Studio" },
      { property: "og:description", content: "২৪টি প্রিমিয়াম বই টেমপ্লেটে বাংলা কোট রিল তৈরি করুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BookQuoteStudio />;
}
