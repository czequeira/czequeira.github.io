import { Outlet } from "react-router";

export function DocsContent() {
  return (
    <main className="w-full h-full overflow-y-scroll">
      <Outlet />
    </main>
  )
}