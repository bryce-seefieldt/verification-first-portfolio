import { z } from 'zod'

export const EvalCase = z.object({
  id: z.string(),
  input: z.string(),
  expected: z.string().optional(),
})

export type EvalCase = z.infer<typeof EvalCase>

export const EvalResult = z.object({
  id: z.string(),
  pass: z.boolean(),
  output: z.string(),
  latency: z.number().optional(),
  tokenCount: z.number().optional(),
})

export type EvalResult = z.infer<typeof EvalResult>

export const EvalSuiteResults = z.object({
  ts: z.number(),
  suite: z.string(),
  results: z.array(EvalResult),
  summary: z
    .object({
      total: z.number(),
      passed: z.number(),
      failed: z.number(),
      passRate: z.number(),
    })
    .optional(),
})

export type EvalSuiteResults = z.infer<typeof EvalSuiteResults>
