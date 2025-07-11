import { DocsHeader } from "./DocsHeaders";
import { DocsSection } from "./DocsSection";

export function DocsPage() {
  return (
    <section className="h-svh flex flex-col overflow-y-hidden">
      <DocsHeader />
      <DocsSection />
    </section>
  )
}