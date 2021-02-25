import React, { FC } from 'react'
import { graphql } from 'gatsby'
import ArticlePreviewTemplate from '@/layouts/articles/index'

interface props {
  data: {
    allContentfulNewsTemplate: {
      nodes: articles[]
    }
  }
  pageContext: {
    numPages: number
    currentPage: number
  }
}

type articles = {
  contentful_id: string
  header: {}
  headerImage: any
  slug: string
  title: string
}

const Component: FC<props> = ({ data, pageContext }) => {
  const articles = data?.allContentfulNewsTemplate?.nodes
  const { numPages, currentPage } = pageContext

  return (
    <>
      {articles !== undefined ? (
        <ArticlePreviewTemplate
          numPages={numPages}
          currentPage={currentPage}
          articles={articles}
          articleSlug='/news/t'
          paginateSlug='/news/'
        />
      ) : (
        <p>No news...</p>
      )}
    </>
  )
}

export default Component

export const query = graphql`
  query($language: String!, $skip: Int!, $limit: Int!) {
    allContentfulNewsTemplate(
      filter: { node_locale: { eq: $language } }
      sort: { fields: publishDate, order: ASC }
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
  }
`
