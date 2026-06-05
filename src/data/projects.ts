import { projectDetails, type PatternType, type ProjectDetail } from './projectDetails'
import { getCategoryFromTag } from '../utils/projectMeta'

export type { PatternType, ProjectDetail }

export interface Project {
  id: string
  slug: string
  title: string
  tag: string
  category: string
  date: string
  colors: [string, string, string]
  patternType: PatternType
  coverImage?: string
  coverVideo?: string
  coverLottie?: string
  image?: string
  imagePosition?: string
}

export const projects: Project[] = projectDetails.map((detail) => ({
  id: detail.id,
  slug: detail.slug,
  title: detail.title,
  tag: detail.tag,
  category: getCategoryFromTag(detail.tag),
  date: detail.date,
  colors: detail.colors,
  patternType: detail.patternType,
  coverImage: detail.coverImage,
  coverVideo: detail.coverVideo,
  coverLottie: detail.coverLottie,
  image: detail.coverImage,
  imagePosition: 'center',
}))

export { projectDetails, getProjectBySlug, getProjectById, getAdjacentProjects } from './projectDetails'
