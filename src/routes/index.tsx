import { createFileRoute } from "@tanstack/react-router";
import { BookQuoteStudio } from "@/components/book-quote-studio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "মধ্যরাতের চিরকুট — আবেগময় Reel Studio" },
      { name: "description", content: "আলাদা আবেগময় দৃশ্যে বাংলা ও ইংরেজি কোট বসিয়ে Facebook Reels তৈরি করুন।" },
      { property: "og:title", content: "মধ্যরাতের চিরকুট — আবেগময় Reel Studio" },
      { property: "og:description", content: "২২০টি স্বতন্ত্র আবেগময় ও জাপানি টেমপ্লেটে দীর্ঘ কোট দিয়ে Facebook Reel তৈরি করুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BookQuoteStudio />;
}
