
export function ContactSection() {

  return (
    <section className="container p-4 mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-xl font-bold ">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          For technical inquiries, choose the most appropriate channel:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <a
          href="https://github.com/czequeira/bitterer/issues/new?template=bug_report.md"
          className="rounded p-4 shadow"
          target="_blank"
        >
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-xl">Bug Reports</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Use our issue templates for structured reporting
          </p>
          <div className="text-xs text-gray-500 mt-2">
            Required: Reproduction steps, environment info
          </div>
        </a>

        <a
          href="https://github.com/czequeira/bitterer/issues/new?template=feature_request.md"
          className="rounded p-4 shadow"
          target="_blank"
        >
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-xl">Feature Request</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Suggest new functionality or improvements
          </p>
          <div className="text-xs text-gray-500 mt-2">
            Include use cases and technical context
          </div>
        </a>

        <a
          href="https://t.me/bitterer_community"
          className="rounded p-4 shadow"
          target="_blank"
        >
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-xl">Telegram Group</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Get real-time support from community
          </p>
          <div className="text-xs text-gray-500 mt-2">
            Live chat (Not number required)
          </div>
        </a>

        <a
          href="https://github.com/czequeira/bitterer/discussions"
          className="rounded p-4 shadow"
          target="_blank"
        >
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-xl">Q&A</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Ask questions and share ideas
          </p>
          <div className="text-xs text-gray-500 mt-2">
            Searchable knowledge base
          </div>
        </a>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          <strong>Note:</strong> We don't offer private support via email to keep all solutions public.
        </p>
      </div>
    </section>
  )
}