import { useBit } from "bitterer/browser";
import { DocsSiderItem } from "./DocsSiderItem";
import { useEffect, useState } from "react";
import type { INavigation } from "../../core/domain/INavigation";
import { NavigationService } from "../../core/domain/NavigationService";

export function DocsSider() {
  const [items, setItems] = useState<INavigation[]>([])
  const navigationService = useBit<NavigationService>('navigationService')

  const init = async () => {
    const data = await navigationService.getNavigations()
    setItems(data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <aside className="bg-amber-700 text-white hidden md:block w-64 h-full overflow-y-scroll">
      <DocsSiderItem
        to={''}
        items={items}
      />
    </aside>
  )
}