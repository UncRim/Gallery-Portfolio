import feed from './blogPosts.generated.json'

export interface BlogPost {
  id: string
  title: string
  url: string
  publishedAt: string
  publishedLabel: string
  excerpt: string
  image: string | null
  categories: string[]
}

interface BlogFeed {
  source: string
  fetchedAt: string
  posts: BlogPost[]
}

export const MEDIUM_PROFILE_URL = 'https://medium.com/@de_nelsen.zw'

const blogFeed = feed as BlogFeed

export const blogPosts: BlogPost[] = blogFeed.posts

export const blogFeedFetchedAt = blogFeed.fetchedAt
