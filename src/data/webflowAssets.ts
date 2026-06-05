import {
  buildGalleryBlock,
  filterWebflowImages,
  pickCoverFromGallery,
  type MediaBlock,
} from '../types/media'

const CDN = 'https://cdn.prod.website-files.com/678bf7b74db9aadd19501ce9'

export const webflowGalleries: Record<
  string,
  { images: string[]; webflowUrl: string }
> = {
  safescroll: {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/safescroll',
    images: [
      `${CDN}/691be64c5cea0eadd10ec98e_Slide%201.png`,
      `${CDN}/691be6593333bf67710f9157_Slide%202.png`,
      `${CDN}/691be65969884db7c5bef72a_Slide%203.png`,
      `${CDN}/691be65949bac4c7a9d60979_Slide%204.png`,
      `${CDN}/691be65a94c90498d0034fc7_Slide%205.png`,
      `${CDN}/691be65aa05f0885118144ec_Slide%206.png`,
      `${CDN}/691be659d5a81b8cdd8ce3d7_Slide%207.png`,
      `${CDN}/691be658bda0e680d967d324_Slide%208.png`,
      `${CDN}/691be61e4f170e476fab4a28_Safe-Scroll-Finalizing-Onboarding.gif`,
    ],
  },
  'better-you': {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/better-you',
    images: [
      `${CDN}/692165b2e88d5c142d30cf5a_Slide%201.jpg`,
      `${CDN}/692165b252d0b845b309e9db_Slide%202.jpg`,
      `${CDN}/692165c339b6fb3ac944c49b_Slide%203.jpg`,
      `${CDN}/692165c8e0e58abb72a42ead_Slide%204.jpg`,
      `${CDN}/692165ea009c189ac31546c7_Slide%205.jpg`,
      `${CDN}/692165f2af3f8676a97f63f5_Acccount%20Setup.jpg`,
      `${CDN}/68ad14b4bb55c71c00410006_Profile.gif`,
      `${CDN}/69216646a42b0a184ff5d2e5_1.%20Launch%20Screen.jpg`,
      `${CDN}/6921667950d2fc5733560d5d_Fitness%20Solution.jpg`,
    ],
  },
  't-shaped-reshaped': {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/t-shaped-reshaped',
    images: [
      `${CDN}/6921683e01fc00d35b719032_Case%20Study%20Cover%20-%201.png`,
      `${CDN}/69216845ded6784dc34a0ef5_Case%20Study%20-%202.png`,
      `${CDN}/69216845ca9e77668b58422a_Case%20Study%20-%203.png`,
      `${CDN}/6921684506c1846d1a154e35_Case%20Study%20-%204.png`,
      `${CDN}/69216871dd5644a79fab6ecd_T-Shaped-LLC.gif`,
      `${CDN}/692168789405151086b7178e_Case%20Study%20-%205.png`,
      `${CDN}/692168789d86b48fb6f37d4f_Case%20Study%20-%206.png`,
      `${CDN}/6921687896bf689ce23f2389_Case%20Study%20-%207.png`,
    ],
  },
  'safe-events': {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/safe-events',
    images: [
      `${CDN}/692168facf460de83b78a5bf_SafeEvents%201.jpg`,
      `${CDN}/692168fa9405151086b72274_SafeEvents%202.jpg`,
      `${CDN}/692169029e3ead5c4490b2bc_SafeWalk-Prototype.gif`,
      `${CDN}/6921690a01e5dc1552333fa3_SafeEvents%203.jpg`,
      `${CDN}/6921690a01e51665aad53d8a_SafeEvents%204.jpg`,
      `${CDN}/6921690ace17890b34bc9828_SafeEvents%205.jpg`,
      `${CDN}/69216912a42b0a184ff60481_Ticket%20Display.gif`,
    ],
  },
  'smart-laundry-app': {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/smart-laundry-app',
    images: [
      `${CDN}/692168babd6bf9e5cdf502bf_Instagram%20post%20-%201.png`,
      `${CDN}/692168bade14cc257070d59c_Instagram%20post%20-%202.jpg`,
      `${CDN}/692168bbf28d08e59a553fd2_Instagram%20post%20-%203.jpg`,
      `${CDN}/692168bbd26f45b1d52f8e3e_Instagram%20post%20-%204.jpg`,
      `${CDN}/692168ba142e131cf092109a_Instagram%20post%20-%205.jpg`,
      `${CDN}/692168bad721294627962230_Instagram%20post%20-%206.jpg`,
      `${CDN}/692168baa13129a7e8722494_Instagram%20post%20-%207.jpg`,
      `${CDN}/692168bac06778ce9789018d_Instagram%20post%20-%208.jpg`,
    ],
  },
  'job-board': {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/job-board',
    images: [
      `${CDN}/692167ee2e00d6edb66e88de_Zinio%20Splash%20Animation.gif`,
      `${CDN}/692167fe9d86b48fb6f37302_Slide%200%20-%20Cover.jpg`,
      `${CDN}/692167fe651719ba91cedc19_Slide%201%20-%20About.jpg`,
      `${CDN}/692167fe1b28177b349c52c3_Slide%203%20-%20User%20Research.jpg`,
      `${CDN}/692167fb09a192cc85d61d79_Slide%204%20-%20Challenges%20and%20Solutions.jpg`,
      `${CDN}/692167fbb48d5e476c9a565a_Slide%205%20-%20Design%20Thought%20Process.jpg`,
    ],
  },
  'medical-digital-twin': {
    webflowUrl: 'https://denelsenuix.webflow.io/works-1/medical-digital-twin',
    images: [
      `${CDN}/68b3446512f088e1b1f29c7e_Slide%201.jpg`,
      `${CDN}/68b3446556d5157f36f69c37_Slide%202.jpg`,
      `${CDN}/68b34465fd3c36b6897ef884_Slide%203.jpg`,
      `${CDN}/68b34b40fde228bec9fe3a28_Digital-Medical-Twin%20(1).gif`,
      `${CDN}/68b34c8e11187a9979e1fcb0_Slide%205.jpg`,
      `${CDN}/68b34d211ad3328c92ef3428_Slide%206.jpg`,
      `${CDN}/68b34d4300503ee3a4310440_Slide%207.jpg`,
    ],
  },
}

export function getWebflowMedia(slug: string): {
  coverImage?: string
  coverVideo?: string
  media: MediaBlock[]
  webflowUrl?: string
} {
  const entry = webflowGalleries[slug]
  if (!entry) return { media: [] }

  const images = filterWebflowImages(slug, entry.images)
  const cover = pickCoverFromGallery(slug, images)
  const galleryItems = images.slice(1).map((src, i) => ({
    src,
    alt: `Project screen ${i + 2}`,
  }))

  const media: MediaBlock[] = []
  if (galleryItems.length >= 2) {
    media.push(buildGalleryBlock(galleryItems, 'Process & screens'))
  } else if (galleryItems.length === 1) {
    media.push({ type: 'image', src: galleryItems[0].src, layout: 'wide' })
  }

  return {
    ...cover,
    media,
    webflowUrl: entry.webflowUrl,
  }
}
