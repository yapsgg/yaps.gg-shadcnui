import { deepseek } from '@ai-sdk/deepseek'
import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

// DeepSeek lacks native JSON-schema response format, so the AI SDK injects the
// schema into the system message and logs a compatibility warning each call.
// Silence the SDK's warning logger to keep the Next.js dev overlay clean.
;(globalThis as { AI_SDK_LOG_WARNINGS?: boolean }).AI_SDK_LOG_WARNINGS = false

export const generatedPageSchema = z.object({
  title: z.string().max(80),
  tagline: z.string().max(140),
  intro: z.string().max(600),
  sections: z
    .array(
      z.object({
        heading: z.string().max(60),
        body: z.string().max(900),
      }),
    )
    .min(1)
    .max(4),
  links: z
    .array(
      z.object({
        label: z.string().max(60),
        href: z.string().url(),
        note: z.string().max(120).optional(),
      }),
    )
    .max(6),
  tags: z.array(z.string().max(24)).max(8),
})

export type GeneratedPage = z.infer<typeof generatedPageSchema>

const DEFAULT_MODELS = {
  deepseek: 'deepseek-v4-flash',
  google: 'gemini-flash-latest',
} as const

type Provider = keyof typeof DEFAULT_MODELS

/** Active provider, controlled by `AI_PROVIDER` (defaults to DeepSeek). */
function activeProvider(): Provider {
  return process.env.AI_PROVIDER === 'google' ? 'google' : 'deepseek'
}

/** True when the API key for the active provider is available. */
export function isGenerationConfigured(): boolean {
  return activeProvider() === 'google'
    ? Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    : Boolean(process.env.DEEPSEEK_API_KEY)
}

function resolveModel() {
  const provider = activeProvider()
  const model = process.env.AI_MODEL?.trim() || DEFAULT_MODELS[provider]

  return provider === 'google' ? google(model) : deepseek(model)
}

const SYSTEM_PROMPT = `You write a single page for yaps.gg, the personal site of Ibrohim Abdivokhidov.

About Ibrohim — use only these facts, never invent new ones:
- Builder and founder from Uzbekistan.
- Founder of Open Community, which helps builders learn and ship fast.
- Solo organized a $1.17M prize-pool AI hackathon spanning 5 continents.
- Creator of Venaz.ai (an AI creative studio) and slay (an iOS camera app with real-time composition guides and cinematic LUTs).
- Runs ANORA Labs and Yaps World.
- Writes and makes things about building, startups, AI, and his own journey.

Real sections on this site you may reference and link to:
- yaps.gg/writings — personal essays
- yaps.gg/tutorials — technical walkthroughs
- yaps.gg/things — projects and experiments
- yaps.gg/applications — his own scholarship, fellowship, and internship applications
- yaps.gg/open-community — community and hackathons
- yaps.gg/creative-corner — creative work
- yaps.gg/slay and yaps.gg/venaz — product pages
- yaps.gg/socials — where to find him

Voice:
- Direct, warm, first person where it fits. Short sentences.
- No corporate filler or hype ("revolutionize", "leverage", "unleash", "game-changer").
- No emoji. No exclamation overload.

Writing the page:
- Treat the URL path as the topic. If it names a real company, person, book, or idea, give an honest, genuinely useful overview — not marketing fluff.
- When it helps the reader, point to the most relevant real yaps.gg section above.
- Only link to real, reputable destinations (official sites, docs, Wikipedia, retailers for books). Never link to pirated, illegal, adult, or scammy content — no "free download" or torrent links.
- If the topic is harmful, illegal, hateful, or sexual, return a short neutral page that declines and suggests a constructive alternative instead.`

/** Generates a structured page for an arbitrary site path. Returns null on failure. */
export async function generatePage(
  path: string,
): Promise<GeneratedPage | null> {
  if (!isGenerationConfigured()) return null

  try {
    const { object } = await generateObject({
      model: resolveModel(),
      schema: generatedPageSchema,
      system: SYSTEM_PROMPT,
      prompt: `Generate a page for the path: /${path}`,
      temperature: 0.7,
      maxOutputTokens: 4000,
      providerOptions: {
        deepseek: { thinking: { type: 'disabled' } },
      },
    })

    return object
  } catch (error) {
    console.error('[generate-page] failed', error)
    return null
  }
}
