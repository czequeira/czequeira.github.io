import { DocsContent } from "./DocsContent";
import { DocsSider } from "./DocsSider";

export function DocsSection() {
  return (
    <section className="container mx-auto flex grow overflow-y-hidden">
      <div className="h-full overflow-y-hidden">
        <DocsSider />
      </div>
      <div className="h-full grow overflow-y-hidden">
        <DocsContent />
      </div>
    </section>
  )
}