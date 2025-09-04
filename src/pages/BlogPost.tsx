/**
 * src/pages/BlogPost.tsx
 * Purpose: Blog post detail page with large cover and readable content.
 * Wrapped with AnnouncementBar, Header and Footer to mirror Home.
 */

import React from 'react'
import { Link, useParams } from 'react-router'
import AnnouncementBar from '../components/landing/AnnouncementBar'
import Header from '../components/landing/Header'
import Footer from '../components/landing/Footer'
import { posts } from '../data/posts'

/** Formats a date to a localized short form. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString()
}

/**
 * BlogPost
 * Renders post content by slug; shows a not-found state when missing.
 */
export default function BlogPost() {
  const { slug } = useParams()
  const post = React.useMemo(() => posts.find((p) => p.slug === slug), [slug])

  React.useEffect(() => {
    document.title = post ? `${post.title} | KAREL:ENERGY` : 'Článok nenájdený | KAREL:ENERGY'
  }, [post])

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <AnnouncementBar />
        <Header />
        <main>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Článok nenájdený</h1>
            <p className="mt-2 text-gray-600">Skontrolujte adresu alebo sa vráťte na prehľad blogu.</p>
            <div className="mt-6">
              <Link to="/blog" className="text-green-700 hover:text-green-800 font-medium">
                ← Späť na blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <Link to="/blog" className="text-green-700 hover:text-green-800 font-medium">
              ← Späť na blog
            </Link>
          </div>

          <header>
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200"
                >
                  {t}
                </span>
              ))}
              <span className="ml-auto text-xs text-gray-500">{formatDate(post.date)}</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">{post.title}</h1>
          </header>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img src={post.cover} alt="" className="w-full h-full object-cover" />
          </div>

          <section className="prose prose-gray max-w-none mt-8">
            {post.content.map((para, idx) => (
              <p key={idx} className="text-gray-800 leading-relaxed text-[15.5px]">
                {para}
              </p>
            ))}
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
