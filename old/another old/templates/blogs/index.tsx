import React, { FC } from 'react'
import { graphql } from 'gatsby'
import ArticlePreviewTemplate from '@/layouts/articles/index'

interface props {
  data: {
    articles: {
      nodes: articles[]
    }
    tags: {
      nodes: tags[]
    }
  }
  pageContext: {
    numPages: number
    currentPage: number
  }
}

type tags = {
  description: string
  tag: string
}

type articles = {
  contentful_id: string
  header: {}
  headerImage: any
  slug: string
  title: string
}

const Component: FC<props> = ({ data, pageContext }) => {
  const articles = data?.articles?.nodes
  const tags = data?.tags?.nodes
  const { numPages, currentPage } = pageContext

  return (
    <>
      {articles !== undefined ? (
        <ArticlePreviewTemplate
          numPages={numPages}
          currentPage={currentPage}
          articles={articles}
          articleSlug='/blogs'
          paginateSlug='/'
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
    articles: allContentfulBlogTemplate(
      filter: { node_locale: { eq: $language } }
      sort: { fields: publishingDate, order: ASC }
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
      }
    }

    tags: allContentfulTags(filter: {node_locale: {eq: $language}}) {
      nodes {
        tag
        description
      }
    }
  }
`
