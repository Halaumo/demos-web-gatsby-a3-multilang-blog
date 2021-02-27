declare type tag = {
  description: string
  tag: string
}

declare type locale = {
  locale: string
  description: string
}

declare type article = {
  contentful_id: string
  header: {}
  headerImage: gatsbyImage
  body: {}
  slug: string
  title: string
  tags: tag[]
  seo: {
    seoKeywords: string[]
    seoDescription: string
  }
}

declare type gatsbyImage = {
  gatsbyImageData: {
    width: number
    height: number
  }
  resize: {
    src: string
    width: number
    height: number
  }
}
