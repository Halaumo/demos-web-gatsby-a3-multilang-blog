import React, { FC } from 'react'
import { graphql } from 'gatsby'
import ArticlePreviewTemplate from '@/templates/articlePreview/index'

interface props {
  data: {
    allContentfulBlogTemplate: {
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
  const articles = data?.allContentfulBlogTemplate?.nodes

  return (
    <>
      {articles !== undefined ? <ArticlePreviewTemplate articles={articles} to='/blogs' /> : <p>No posts...</p>}
    </>
  )
}

export default Component

export const query = graphql`
  query($language: String!) {
    allContentfulBlogTemplate(filter: {node_locale: { eq: $language }}, sort: {fields: publishingDate, order: ASC}) {
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
