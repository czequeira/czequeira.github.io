
import { Link } from "react-router";

export function DocsHeader() {
  return (
    <header className=" bg-linear-to-r from-amber-50 to-amber-900 text-white">
      <div className="container mx-auto p-4 flex justify-between gap-4">
        <div>
          <Link className="text-xl text-amber-800 font-bold" to={'/'}>Bitterer</Link>
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