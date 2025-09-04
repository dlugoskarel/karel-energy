import React from 'react'
import { Link } from 'react-router'
import AnnouncementBar from '../components/landing/AnnouncementBar'
import Header from '../components/landing/Header'
import Footer from '../components/landing/Footer'
import { posts as allPosts, Post } from '../data/posts'
import { Search, ArrowRight } from 'lucide-react'

/**
 * src/pages/BlogIndex.tsx
 * Purpose: Blog listing page with top/bottom chrome (AnnouncementBar, Header, Footer),
 * search input and fixed one-row category filters.
 * Layout:
 * - Mobile: stacked sections (Title → Search → Filters). Search text centered between icons.
 * - Desktop: three blocks in one row (Title | Search (flex-1) | Filters). Search fills full space between title and filters.
 */

// Fixed categories — always exactly one row.
const CATEGORIES = ['Všetko', 'Energetika', 'E-mobilita', 'Všeobecné'] as const
type Category = typeof CATEGORIES[number]

/**
 * deriveCategory
 * Heuristically assigns a post to a category (until data has explicit category).
 */
function deriveCategory(post: Post): Exclude<Category, 'Všetko'> {
  const hay = (post.title + ' ' + post.tags.join(' ')).toLowerCase()
  if (/e-?mobil|elektromobil|nabíj|ev\b/.test(hay)) return 'E-mobilita'
  if (/energet|úspora|audit|fotovolt|tepel|technolog|invest|tarif|spotreb/.test(hay)) return 'Energetika'
  return 'Všeobecné'
}

/**
 * BlogCard
 * Single blog card with cover, tags, date, title and short summary.
 */
function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] w-full overflow-hidden bg-gray-50">
        <img src={post.cover} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 flex-wrap">
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200"
            >
              {t}
            </span>
          ))}
          <span className="ml-auto text-xs text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 text-sm text-gray-700">{post.summary}</p>
        <div className="mt-3">
          <Link
            to={`/blog/${post.slug}`}
            className="text-sm font-medium text-green-700 hover:text-green-800"
            aria-label={`Čítať: ${post.title}`}
          >
            Čítať viac →
          </Link>
        </div>
      </div>
    </article>
  )
}

/**
 * BlogIndex
 * Listing with search and fixed filters. On mobile: stacked; on desktop: search stretches between title and filters.
 */
export default function BlogIndex() {
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState<Category>('Všetko')

  React.useEffect(() => {
    document.title = 'Blog | KAREL:ENERGY'
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return allPosts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))

      const matchesCategory = category === 'Všetko' || deriveCategory(p) === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header row: Title | Search (flex-1) | Filters */}
          <header className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Title */}
            <div className="shrink-0 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Blog, ktorý má energiu</h1>
            </div>

            {/* Search - occupies the full space between title and filters on desktop */}
            <div className="w-full md:flex-1">
              <div className="relative w-full">
                {/* Left search icon (decorative) */}
                <Search
                  className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                  aria-hidden
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hľadať v článkoch"
                  className="block w-full bg-white pl-9 pr-9 py-2 text-sm text-gray-900 placeholder:text-gray-400 border-0 border-b-2 border-green-700 focus:border-green-800 focus:outline-none rounded-none text-center md:text-left"
                  aria-label="Vyhľadávanie v blogu"
                />
                {/* Right icon (decorative to keep symmetry). Can be swapped for a submit button later. */}
                <ArrowRight
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                  aria-hidden
                />
              </div>
            </div>

            {/* Fixed filters – one row; mobile centered, desktop right-aligned */}
            <div className="flex gap-2 flex-nowrap overflow-x-auto w-full justify-center md:w-auto md:justify-end">
              {CATEGORIES.map((t) => (
                <button
                  key={t}
                  onClick={() => setCategory(t)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    category === t
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                  }`}
                  aria-pressed={category === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </header>



          <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </section>

          {filtered.length === 0 && (
            <div className="mt-16 text-center text-gray-600">
              Žiadne výsledky. Skúste upraviť hľadanie alebo filter.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
