import React, { FC } from 'react'
import { graphql } from 'gatsby'
import ArticlePreviewTemplate from '@/templates/articlePreview'

interface props {
  data: {
    allContentfulNewsTemplate: {
      nodes: articles[]
    }
  }
}

type articles = {
  contentful_id: string
  header: {},
  headerImage: any
  slug: string
  title: string

}

const Component: FC<props> = ({ data }) => {
  const articles = data?.allContentfulNewsTemplate?.nodes

  return (
    <>
      {articles !== undefined ? <ArticlePreviewTemplate articles={articles} to='/news/t' /> : <p>No news...</p>}
    </>
  )
}

export default Component

export const query = graphql`
  query($language: String!) {
    allContentfulNewsTemplate(
      filter: {node_locale: { eq: $language }},
      sort: {fields: publishDate, order: ASC}
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
