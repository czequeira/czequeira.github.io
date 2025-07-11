import { Outlet } from "react-router";

export function DocsContent() {
  return (
    <main className="w-full p-4">
      <Outlet />
    </main>
  )
}