import { useNavigate } from "react-router";
import { Button } from "../../../components/Button";

export function HeroSection() {
  const navigate = useNavigate()

  const getStarted = () => navigate('/docs/get-started/introduction')

  return (
    <section className="h-96 bg-linear-to-r from-amber-50 to-amber-500">
      <div className="container mx-auto flex flex-col gap-2 p-4 justify-center h-full">
        <h1 className="text-4xl text-amber-800 font-bold">
          Bitterer
        </h1>
        <h2 className="text-xl text-amber-800">
          Lightweight IoC Container for TypeScript
        </h2>
        <h3 className="text-xl text-amber-600 italic">
          Inspired by Spring, optimized for modern TypeScript apps
        </h3>
        <div className="flex gap-2">
          <Button isPrimary onClick={getStarted}>Get started</Button>
          {/* <Button>Source code</Button> */}
        </div>
      </div>
    </section>
  )
}