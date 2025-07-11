import { Route, Routes } from "react-router";
import { LandingPage } from "../ui/LandingPage";

export function LandingRouter() {
  return (
    <Routes>
      <Route index element={<LandingPage />}/>
    </Routes>
  )
}