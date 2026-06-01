# PROMPTFLIX - Backend

A movie search API powered by AI. Describe the movie you want to watch in natural language and get relevant results from TMDB.

> This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## How it works

The user sends a natural language query like _"magic and wizards fantasy movies"_ and the AI extracts the relevant filters (genre, year, rating, language) to search TMDB's catalog and return matching movies.

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- TMDB API key — [themoviedb.org](https://www.themoviedb.org/settings/api)
- Groq API key — [console.groq.com](https://console.groq.com)

### Installation

```bash
git clone https://github.com/allanfoppa/prompt-flix.git
cd prompt-flix/backend
pnpm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
GROQ_API_KEY=your_groq_key
TMDB_API_KEY=your_tmdb_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Running

```bash
# development
pnpm start:dev

# production
pnpm build
pnpm start:prod
```

---

## API

### `POST /movies/search`

Search for movies using natural language.

**Request:**

```json
{
  "query": "magic and wizards fantasy movies"
}
```

**Response:**

```json
[
  {
    "id": 671,
    "title": "Harry Potter and the Philosopher's Stone",
    "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry.",
    "releaseYear": "2001",
    "rating": 7.9,
    "poster": "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"
  }
]
```

---

## Switching LLM providers

The AI layer uses the Strategy Pattern — to switch providers, update `useClass` in `src/ai/ai.module.ts`:

```typescript
{
  provide: LLM_STRATEGY,
  useClass: GroqStrategy, // swap with GeminiStrategy or any new strategy
}
```

---

## Attribution

Movies data provided by

<a href="https://www.themoviedb.org">
  <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB" width="150" />
</a>

<br />

LLM provider by

<a href="https://console.groq.com/home">
  <img src="../.github/assets/groq-logo.svg" alt="Groq" width="150" />
</a>
