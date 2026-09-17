/**
 * Quiz artifact page.
 */
import { GenerationPage } from "@/components/generation/GenerationPage";

export default function QuizPage() {
  return (
    <GenerationPage
      generationType="quiz"
      title="AI Quiz"
      description="Generate comprehension quizzes with explanations to test understanding."
    />
  );
}

