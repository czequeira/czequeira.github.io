import { ArrowRightIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { Card } from "../../../components";
import { useContext, useState } from "react";
import { CoreContext } from "../../core";

export function Home() {
  const { id, connect } = useContext(CoreContext)
  const [opponentId, setOpponentId] = useState('')

  return (
    <div className="h-lvh flex justify-center items-center">
      <Card>
        <div className="max-w-xl flex flex-col gap-2 items-center">
          <h1 className="text-lg font-bold">wellcome</h1>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, unde delectus natus aspernatur placeat molestiae! Eos ea sunt, ut nam ratione inventore voluptatum, repellendus sapiente iusto soluta illum beatae obcaecati.</span>

          <div className="flex items-center gap-1 w-full">
            <input
              className="p-2 border rounded w-full"
              value={id}
              readOnly
            />
            <button className="p-2 border rounded">
              <ClipboardDocumentIcon className="h-6" />
            </button>
          </div>

          <div className="flex items-center gap-1 w-full">
            <input
              className="p-2 border rounded w-full"
              value={opponentId}
              onChange={(e) => setOpponentId(e.target.value)}
            />
            <button
              className="p-2 border rounded"
              // onClick={() => navigate('/id/init')}
              onClick={() => connect(opponentId)}
            >
              <ArrowRightIcon className="h-6" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}