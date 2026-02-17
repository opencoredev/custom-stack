export const dynamic = "force-static";

import { api } from "@better-t-stack/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { fetchSponsors } from "@/lib/sponsors";

import CommandSection from "./_components/command-section";
import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";
import SponsorsSection from "./_components/sponsors-section";
import StatsSection from "./_components/stats-section";
import Testimonials from "./_components/testimonials";

export default async function HomePage() {
  const sponsorsData = await fetchSponsors();

  let tweets: { tweetId: string }[] = [];
  let videos: { embedId: string; title: string }[] = [];

  if (process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL) {
    try {
      const [fetchedTweets, fetchedVideos] = await Promise.all([
        fetchQuery(api.testimonials.getTweets),
        fetchQuery(api.testimonials.getVideos),
      ]);
      tweets = fetchedTweets.map((t) => ({ tweetId: t.tweetId }));
      videos = fetchedVideos.map((v) => ({ embedId: v.embedId, title: v.title }));
    } catch {}
  }

  return (
    <main className="container mx-auto min-h-svh">
      <div className="mx-auto flex flex-col gap-8 px-4 pt-12">
        <HeroSection />
        <CommandSection />
        <StatsSection />
        <SponsorsSection sponsorsData={sponsorsData} />
        <Testimonials tweets={tweets} videos={videos} />
      </div>
      <Footer />
    </main>
  );
}
