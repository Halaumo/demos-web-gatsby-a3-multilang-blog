import React, { FC } from 'react'
import { graphql } from 'gatsby'
import ArticlePreviewTemplate from '@/layouts/articles/index'

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
  const articles = data?.articles?.nodes
  const tags = data?.tags?.nodes
  const locales = data?.locales?.nodes
  const { numPages, currentPage } = pageContext
  const tagsDefaultName = data?.meta?.tagsDefaultName

  return (
    <>
      {articles !== undefined ? (
        <ArticlePreviewTemplate
          locales={locales}
          tagsDefaultName={tagsDefaultName}
          numPages={numPages}
          currentPage={currentPage}
          articles={articles}
          articleSlug='/post'
          paginateSlug='/'
          tags={tags}
        />
      ) : (
        <p>No posts...</p>
      )}
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

    tags: allContentfulTags(filter: {node_locale: {eq: $language}}) {
      nodes {
        tag
        description
      }
    }

    meta: contentfulMetadata(node_locale: {eq: $language}) {
      tagsDefaultName
    }

    locales: allContentfulLocalesWithDescription(filter: { node_locale: { eq: "en" } }) {
      nodes {
        locale
        description
      }
    }
  }
`
