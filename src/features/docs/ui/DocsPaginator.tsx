import { useBit } from "bitterer/browser";
import { Link, useLocation } from "react-router";
import { NavigationService } from "../../core/domain/NavigationService";
import { useEffect, useState } from "react";
import type { INavigation } from "../../core/domain/INavigation";

function flattenArrayRecursive(array: INavigation[]): INavigation[] {
  let result: INavigation[] = [];

  array.forEach((item) => {
    result.push(item); // Agrega el objeto actual
    if (item.items && item.items.length > 0) {
      result = result.concat(flattenArrayRecursive(item.items)); // Recursión para hijos
    }
  });

  return result;
}

function findNext(items: INavigation[], currentIndex?: number) {
  if (!currentIndex) return undefined
  if (currentIndex >= items.length - 1) return undefined
  const next = items.find((i, index) => (index > currentIndex && !i.redirect))
  return next
}

export function DocsPaginator() {
  const {pathname} = useLocation()
  const navigationService = useBit<NavigationService>('navigationService')
  const [items, setItems] = useState<INavigation[]>([])
  const currentIndex = items.findIndex(i => i.to === pathname)
  const next = findNext(items, currentIndex)
  const prev = findNext([...items].reverse(), items.length - currentIndex - 1)

  const init = async () => {
    const data = await navigationService.getNavigations()
    setItems(flattenArrayRecursive(data))
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="flex justify-between p-4">
      <Link to={prev?.to || ''}>{prev?.title}</Link>
      <Link to={next?.to || ''}>{next?.title}</Link>
    </div>
  )
}