import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router"
import { useBit } from "bitterer/browser"
import { NavigationService } from "../../core/domain/NavigationService"
import { MD } from "../../core/ui/MD"

export function DocsRender() {
  const { pathname, state } = useLocation()
  const [data, setData] = useState('')
  const navigationService = useBit<NavigationService>('navigationService')

  const init = async (path: string) => {
    const data = await navigationService.getMd(path)
    setData(data)
  }

  useEffect(() => {
    init(pathname)
  }, [pathname])

  if (state?.redirect) return (
    <Navigate to={state.redirect} />
  )

  return (
    <MD data={data} />
  )
}