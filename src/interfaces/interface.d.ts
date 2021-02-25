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
  headerImage: any
  slug: string
  title: string
  tags: tag[]
}
