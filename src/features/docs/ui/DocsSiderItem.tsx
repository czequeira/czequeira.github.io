import { Link, useLocation } from "react-router"
import type { INavigation } from "../../core/domain/INavigation"

const LEVELS = {
  0: 'pl-4',
  1: 'pl-8',
  2: 'pl-12',
  3: 'pl-16',
}

export interface DocsSiderItemProps extends INavigation {
  level?: 0 | 1 | 2 | 3
}

export function DocsSiderItem({ title, items, to, level, redirect }: DocsSiderItemProps) {
  const { pathname } = useLocation()
  const isSelected = pathname.startsWith(to)
  const isExactSelected = pathname === to

  const renderedItems = items?.map((i, index) => (
    <DocsSiderItem
      key={index}
      {...i}
      level={
        level === undefined ? 0 :
          level === 0 ? 1 :
            level === 1 ? 2 :
              level === 2 ? 3 : 3
      }
    />
  ))

  if (title) return (
    <li className="flex flex-col">
      <Link
        to={to}
        state={{redirect}}
        className={`hover:bg-amber-600 p-2 ${LEVELS[level || 0]
        } ${isExactSelected ? 'bg-amber-900' :
          isSelected ? 'bg-amber-800' : ''
        }`}
      >
        {title}
      </Link>
      {renderedItems && (
        <ul className="flex flex-col">
          {renderedItems}
        </ul>
      )}
    </li>
  )

  return (
    <ul className="flex flex-col">
      {renderedItems}
    </ul>
  )
}