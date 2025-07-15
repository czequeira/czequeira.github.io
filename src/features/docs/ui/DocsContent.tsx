import { Outlet } from "react-router";
import { DocsPaginator } from "./DocsPaginator";

export function DocsContent() {
  return (
    <main className="w-full h-full overflow-y-scroll">
      <Outlet />

      <DocsPaginator />
    </main>
  )
}