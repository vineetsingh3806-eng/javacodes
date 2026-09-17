/**
 * Presentation artifact page.
 */
import { GenerationPage } from "@/components/generation/GenerationPage";

export default function PresentationPage() {
  return (
    <GenerationPage
      generationType="presentation"
      title="AI Presentation"
      description="Get a ready-to-deliver slide deck with speaker notes."
    />
  );
}

