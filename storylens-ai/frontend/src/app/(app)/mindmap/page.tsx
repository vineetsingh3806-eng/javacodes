/**
 * Mind Map artifact page.
 */
import { GenerationPage } from "@/components/generation/GenerationPage";

export default function MindMapPage() {
  return (
    <GenerationPage
      generationType="mindmap"
      title="AI Mind Map"
      description="Turn dense content into a structured, hierarchical mind map."
    />
  );
}

