import axios from "axios";
import { DocsSiderItem, type DocsSiderItemProps } from "./DocsSiderItem";
import { useEffect, useState } from "react";

export function DocsSider() {
  const [items, setItems] = useState<DocsSiderItemProps[]>([])

  const init = async () => {
    const {data} = await axios.get<DocsSiderItemProps[]>(`/navigation.json`)
    setItems(data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <aside className="bg-amber-50 w-64 h-full overflow-y-scroll">
      <DocsSiderItem
        to={''}
        items={items}
      />
    </aside>
  )
}