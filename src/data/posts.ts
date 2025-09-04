/**
 * src/data/posts.ts
 * Purpose: Blog data definitions (types and dataset).
 * Note: On request, all demo posts were removed; the dataset is now empty.
 */

export interface Post {
  /** URL-friendly unique id */
  slug: string
  /** Main title of the post */
  title: string
  /** Short summary shown on cards and previews */
  summary: string
  /** ISO date string */
  date: string
  /** Post tags for filters */
  tags: string[]
  /** Cover image URL (uses smart placeholder system) */
  cover: string
  /** Rich text content (simple paragraphs for demo) */
  content: string[]
}

/**
 * Empty dataset of posts.
 * Keep this array empty to effectively "delete" all blog articles from the UI.
 */
export const posts: Post[] = []
