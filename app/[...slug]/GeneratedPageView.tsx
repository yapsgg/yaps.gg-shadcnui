import type { GeneratedPage } from '@/lib/generate-page'

export function GeneratedPageView({
  path,
  page,
}: {
  path: string
  page: GeneratedPage
}) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-muted-foreground text-xs tracking-widest uppercase">
        yaps.gg/{path}
      </p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight">{page.title}</h1>
      <p className="text-muted-foreground mt-3 text-lg">{page.tagline}</p>
      <p className="mt-6 leading-relaxed">{page.intro}</p>

      {page.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">
            {section.body}
          </p>
        </section>
      ))}

      {page.links.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Links</h2>
          <ul className="mt-3 space-y-2">
            {page.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  {link.label}
                </a>
                {link.note ? (
                  <span className="text-muted-foreground"> — {link.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}

      {page.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {page.tags.map((tag) => (
            <span
              key={tag}
              className="text-muted-foreground rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
