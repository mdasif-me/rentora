import AiAssistantBubble from "@/components/container/ai-assistant-bubble";
import { Footer, Navigation } from "@/components/container/layout";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <AiAssistantBubble />
    </>
  );
}
