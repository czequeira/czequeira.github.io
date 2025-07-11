import { DocsContent } from "./DocsContent";
import { DocsSider } from "./DocsSider";

export function DocsSection() {
  return (
    <section className="container mx-auto flex">
      <DocsSider />
      <DocsContent />
    </section>
  )
}