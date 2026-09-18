import { deepseek } from '@ai-sdk/deepseek'
import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

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
  const model = process.env.AI_MODEL ?? DEFAULT_MODELS[provider]

  return provider === 'google' ? google(model) : deepseek(model)
}

// TODO: refine the prompt with Ibrohim's real voice/corpus before shipping.
const SYSTEM_PROMPT = `You generate a single helpful page for yaps.gg, the personal site of Ibrohim Abdivokhidov (builder, founder of Open Community, organizer of a $1M+ hackathon, creator of Venaz and slay).

Rules:
- Be concise, specific, and genuinely useful. No filler, no corporate tone.
- Never invent facts about Ibrohim. If unsure, speak generally and stay useful.
- Only link to real, reputable destinations (official docs, well-known sites). Never link to pirated or illegal content.
- If the requested topic is harmful, illegal, hateful, or adult, return a short neutral page that declines and suggests a constructive alternative.
- Prefer your own words. No emoji.`

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
      maxOutputTokens: 1600,
    })

    return object
  } catch (error) {
    console.error('[generate-page] failed', error)
    return null
  }
}
