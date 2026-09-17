/**
 * Timeline artifact page.
 */
import { GenerationPage } from "@/components/generation/GenerationPage";

export default function TimelinePage() {
  return (
    <GenerationPage
      generationType="timeline"
      title="AI Timeline"
      description="Automatically extract the key chronological events from any document."
    />
  );
}

