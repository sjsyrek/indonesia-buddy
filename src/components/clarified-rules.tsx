import { clarifiedRuleSections } from '../lib/rules-content'

export function ClarifiedRules() {
  return (
    <div className="space-y-3" role="region" aria-label="Clarified rules">
      {clarifiedRuleSections.map((section) => (
        <details
          key={section.id}
          className="group rounded-lg border border-sky-200 bg-white"
        >
          <summary className="cursor-pointer select-none rounded-lg px-3 py-3 text-base font-bold text-sky-900 transition-colors hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:px-4 sm:text-lg">
            <span className="ml-1">{section.title}</span>
            <span className="block text-sm font-normal text-sky-600 sm:ml-6">
              {section.summary}
            </span>
          </summary>
          <div className="border-t border-sky-100 px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
            <ul className="space-y-2 text-sm text-sky-800 sm:text-base">
              {section.details.map((detail, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 shrink-0 text-sky-400" aria-hidden="true">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  )
}
