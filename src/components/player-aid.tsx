import { playerAidSections } from '../lib/rules-content'

export function PlayerAid() {
  return (
    <div className="space-y-4" role="region" aria-label="Player aid quick reference">
      {playerAidSections.map((section) => (
        <section
          key={section.id}
          className="rounded-lg border border-sky-800 bg-sky-950/30 p-3 sm:p-4"
          aria-labelledby={`aid-${section.id}`}
        >
          <h3
            id={`aid-${section.id}`}
            className="mb-2 text-base font-bold text-sky-300 sm:text-lg"
          >
            {section.title}
          </h3>
          <ul className="space-y-1 text-sm text-sky-300 sm:text-base">
            {section.content.map((item, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="shrink-0 text-sky-500" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {section.table && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm" aria-label={`${section.title} reference table`}>
                <thead>
                  <tr className="border-b border-sky-800">
                    {section.table.headers.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-2 py-1.5 text-left font-semibold text-sky-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={rowIdx % 2 === 0 ? 'bg-sky-950/30' : 'bg-transparent'}
                    >
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-2 py-1.5 text-sky-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
