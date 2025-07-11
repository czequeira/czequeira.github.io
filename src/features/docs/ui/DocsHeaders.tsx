
import { Link } from "react-router";

export function DocsHeader() {
  return (
    <header className="">
      <div className="container bg-amber-50 mx-auto p-4 flex justify-between gap-4">
        <div>
          <Link to={'/'}>Bitterer</Link>
        </div>
        <div className="flex justify-end gap-4">
          <Link to={'/docs/get-started/introduction'}>Get started</Link>
          <Link to={'/docs/docs/bits/declarations'}>Docs</Link>
          <Link to={'/docs/examples'}>Examples</Link>
        </div>
      </div>
    </header>
  )
}