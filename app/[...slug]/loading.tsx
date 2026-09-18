import { GeneratedPageSkeleton } from './GeneratedPageSkeleton'

export default function Loading() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <div className="bg-muted h-3 w-40 animate-pulse rounded-md" />
      <GeneratedPageSkeleton />
    </article>
  )
}
