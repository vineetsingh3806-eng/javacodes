/**
 * Podcast artifact page.
 */
import { GenerationPage } from "@/components/generation/GenerationPage";

export default function PodcastPage() {
  return (
    <GenerationPage
      generationType="podcast"
      title="AI Podcast"
      description="Convert documents into engaging host-and-guest podcast scripts."
    />
  );
}

