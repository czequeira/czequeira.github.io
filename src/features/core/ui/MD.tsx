import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function MD({data}: {data: string}) {
  return (
    <article className={
      "prose prose-headings:text-amber-900 text-amber-800 w-full overflow-x-hidden" +
      " p-4 prose-amber prose-pre:p-0 prose-pre:overflow-x-auto prose-pre:bg-amber-800" +
      " max-w-none overflow-y-auto"}>
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