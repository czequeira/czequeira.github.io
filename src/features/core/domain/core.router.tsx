import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import { Home } from "../../home";
import { PreGame } from "../../pre-game";
import { CoreProvider } from "./core.context";
import { Game, GameProvider } from "../../game";

const children: RouteObject[] = [{
  path: '/',
  element: <Home />
}, {
  path: ':opponentId/init',
  element: <PreGame />
}, {
  path: '/game',
  element: <Game />,
}]

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GameProvider>
        <CoreProvider>
          <Outlet />
        </CoreProvider>
      </GameProvider>
    ),
    children,
  }
])