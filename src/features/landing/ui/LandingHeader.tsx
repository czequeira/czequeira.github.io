import { Link } from "react-router";

export function LandingHeader() {
  return (
    <header className="bg-linear-to-r from-amber-50 to-amber-900">
      <div className="container mx-auto py-4 flex justify-end gap-4 text-white">
        <Link to={'/docs/docs/bits/declarations'}>Docs</Link>
        <Link to={'/docs/examples'}>Examples</Link>
        <Link to={'/docs'}>About us</Link>
      </div>
    </header>
  )
}