import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Articles from '@/layouts/articles/index'
import Seo from '@/components/seo'

interface props {
  data: {
    articles: {
      nodes: article[]
    }
    tags: {
      nodes: tag[]
    }
    meta: {
      tagsDefaultName: string
      seoImage: gatsbyImage
    }
    seo: {
      seoTitle: string
      seoDescription: string
      seoKeywords: string[]
    }
    locales: {
      nodes: locale[]
    }
  }
  pageContext: {
    numPages: number
    currentPage: number
    tag: string
  }
}

const Component: FC<props> = ({ data, pageContext }) => {
  const articles: article[] = data.articles?.nodes || []
  const tags: tag[] = data.tags?.nodes || []
  const locales: locale[] = data.locales?.nodes || []
  const tagsDefaultName: string = data.meta?.tagsDefaultName || ''
  const seoTitle: string = data.seo?.seoTitle || ''
  const seoDescription: string = data.seo?.seoDescription || ''
  const seoKeywords: string[] = data.seo?.seoKeywords || []
  const seoImage: string = data.meta?.seoImage?.resize?.src || ''
  const seoImageWidth: string = `${data.meta?.seoImage?.resize?.width}` || ''
  const seoImageHeight: string = `${data.meta?.seoImage?.resize?.height}` || ''
  const { numPages, currentPage, tag } = pageContext

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={seoImage}
        ogImageHeight={seoImageHeight}
        ogImageWidth={seoImageWidth}
      />
      <Articles
        locales={locales}
        tagsDefaultName={tagsDefaultName}
        numPages={numPages}
        currentPage={currentPage}
        articles={articles}
        articleSlug='/post'
        paginateSlug={`/${tag}/`}
        tags={tags}
      />
    </>
  )
}

export default Component

export const query = graphql`
  query($language: String!, $skip: Int!, $limit: Int!, $tag: String!) {
    articles: allContentfulPosts(
      filter: {
         node_locale: { eq: $language },
         tags: {elemMatch: {tag: {eq: $tag}}}
      }
      sort: { fields: publishingDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        contentful_id
        slug
        title
        header {
          raw
        }
        headerImage {
          gatsbyImageData(formats: WEBP, placeholder: BLURRED, width: 800)
        }
        tags {
          tag
          description
        }
      }
    }

    tags: allContentfulTags(filter: {node_locale: {eq: $language}}) {
      nodes {
        tag
        description
      }
    }

    seo: contentfulTags(tag: {eq: $tag}, node_locale: {eq: $language}) {
      seoDescription
      seoKeywords
      seoTitle
    }

    meta: contentfulMetadata(node_locale: {eq: $language}) {
      tagsDefaultName
      seoImage {
        resize(toFormat: WEBP, width: 800) {
          src
          width
          height
        }
      }
    }

    locales: allContentfulLocalesWithDescription(filter: { node_locale: { eq: "en" } }) {
      nodes {
        locale
        description
      }
    }
  }
`
