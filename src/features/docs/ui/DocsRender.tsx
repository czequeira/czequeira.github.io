import axios from "axios"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import { Navigate, useLocation } from "react-router"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function DocsRender() {
  const { pathname, state } = useLocation()
  const [data, setData] = useState('')

  const init = async (path: string) => {
    const { data } = await axios.get(`/md/${path}.md`)
    setData(data)
  }

  useEffect(() => {
    const path = pathname.slice(6)
    init(path)
  }, [pathname])

  if (state?.redirect) return (
    <Navigate to={state.redirect} />
  )

  return (
    <article className="prose p-4 prose-amber prose-pre:p-0 prose-pre:bg-amber-400 max-w-none overflow-y-auto">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={gruvboxLight}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {data}
      </Markdown>
    </article>
  )
}