import { clarifiedRuleSections } from '../lib/rules-content'

export function ClarifiedRules() {
  return (
    <div className="space-y-3" role="region" aria-label="Clarified rules">
      {clarifiedRuleSections.map((section) => (
        <details
          key={section.id}
          className="group rounded-lg border border-sky-800 bg-[#132038]"
        >
          <summary className="flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-3 text-base font-bold text-sky-300 transition-colors hover:bg-sky-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden list-none sm:px-4 sm:text-lg">
            <svg className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <div>
              <span>{section.title}</span>
              <span className="block text-sm font-normal text-sky-400">
                {section.summary}
              </span>
            </div>
          </summary>
          <div className="border-t border-sky-900 px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
            <ul className="space-y-2 text-sm text-sky-300 sm:text-base">
              {section.details.map((detail, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="shrink-0 text-sky-500" aria-hidden="true">•</span>
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
