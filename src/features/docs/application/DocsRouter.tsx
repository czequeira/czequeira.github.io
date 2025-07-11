import { Route, Routes } from "react-router";
import { DocsPage } from "../ui/DocsPage";
import { DocsRender } from "../ui/DocsRender";

export function DocsRouter() {
  return (
    <Routes>
      <Route path="*" element={<DocsPage />} >
        <Route path="*" element={<DocsRender />} />
      </Route>
    </Routes>
  )
}