# Evaluation Harness

Minimal, extensible evaluation framework for testing and validating implementations.

## Structure

```
evals/
├── schema.ts           # Zod schemas for eval cases and results
├── run.ts             # Main eval runner
└── datasets/          # JSONL test datasets
    └── rag-basics.jsonl
```

## Usage

### Run all evals

```bash
pnpm evals
```

### Run with verbose output

```bash
pnpm evals --verbose
```

### Run specific dataset

```bash
pnpm tsx evals/run.ts my-dataset
```

## Dataset Format

Datasets are stored as JSONL (JSON Lines) files in `datasets/`:

```jsonl
{"id":"test-001","input":"What is X?","expected":"keyword"}
{"id":"test-002","input":"Explain Y","expected":"expected-substring"}
```

### Schema

```typescript
{
  id: string          // Unique test ID
  input: string       // Input prompt/question
  expected?: string   // Optional substring to check in output
}
```

## Results

Results are written to `public/evals-results.json` and displayed at `/evals/live`.

### Result Format

```json
[
  {
    "ts": 1700000000000,
    "suite": "rag-basics",
    "results": [
      {
        "id": "test-001",
        "pass": true,
        "output": "Response text...",
        "latency": 45
      }
    ],
    "summary": {
      "total": 10,
      "passed": 9,
      "failed": 1,
      "passRate": 90.0
    }
  }
]
```

## CI Integration

Evals run automatically in CI before builds:

```yaml
- name: Run Evaluations
  run: pnpm evals

- name: Build
  run: pnpm build
```

## Future Upgrades

- [ ] Plug real LLM APIs (OpenAI, Anthropic, Azure)
- [ ] Add metrics (accuracy@k, latency, token cost)
- [ ] Red-team suites and adversarial testing
- [ ] Threshold gates (fail CI if below target)
- [ ] Multi-model comparisons
- [ ] Cost tracking and optimization
- [ ] A/B testing frameworks

## Model Integration

To use real LLM APIs, update the `modelRespond` function in `run.ts`:

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function modelRespond(prompt: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  })
  return response.choices[0].message.content || ''
}
```

Set environment variables in `.env.local`:

```bash
OPENAI_API_KEY=sk-...
```

And in GitHub Actions secrets for CI.
