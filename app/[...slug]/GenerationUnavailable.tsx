import Link from 'next/link'

export function GenerationUnavailable({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">{message}</p>
      <Link
        href="/"
        className="text-primary mt-6 inline-block underline underline-offset-4"
      >
        ← back to yaps.gg
      </Link>
    </div>
  )
}
