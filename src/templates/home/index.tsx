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
      homePageSeoTitle: string
      homePageSeoKeywords: string[]
      homePageSeoDescription: string
      seoImage: gatsbyImage
    }
    locales: {
      nodes: locale[]
    }
  }
  pageContext: {
    numPages: number
    currentPage: number
  }
}

const Component: FC<props> = ({ data, pageContext }) => {
  const articles: article[] = data.articles?.nodes || []
  const tags: tag[] = data.tags?.nodes || []
  const locales: locale[] = data.locales?.nodes || []
  const tagsDefaultName: string = data.meta?.tagsDefaultName || ''
  const seoTitle: string = data.meta?.homePageSeoTitle || ''
  const seoKeywords: string[] = data.meta?.homePageSeoKeywords || []
  const seoDescription: string = data.meta?.homePageSeoDescription || ''
  const seoImage: string = data.meta?.seoImage?.resize?.src || ''
  const seoImageWidth: string = `${data.meta?.seoImage?.resize?.width}` || ''
  const seoImageHeight: string = `${data.meta?.seoImage?.resize?.height}` || ''
  const { numPages, currentPage } = pageContext

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
        paginateSlug='/'
        tags={tags}
      />
    </>
  )
}

export default Component

export const query = graphql`
  query($language: String!, $skip: Int!, $limit: Int!) {
    articles: allContentfulPosts(
      filter: { node_locale: { eq: $language } }
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
          gatsbyImageData(formats: WEBP, placeholder: BLURRED, width: 1000)
        }
        tags {
          tag
          description
        }
      }
    }

    tags: allContentfulTags(filter: { node_locale: { eq: $language } }) {
      nodes {
        tag
        description
      }
    }

    meta: contentfulMetadata(node_locale: { eq: $language }) {
      tagsDefaultName
      homePageSeoTitle
      homePageSeoKeywords
      homePageSeoDescription
      seoImage {
        resize(toFormat: WEBP, width: 1000) {
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
