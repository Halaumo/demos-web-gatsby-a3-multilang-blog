import React, { FC } from 'react'
import ArticleFullTemplate from '@/layouts/article/index'
import { graphql } from 'gatsby'

interface props {
  data: {
    contentfulBlogTemplate: article
  }
}

type article = {
  header: {}
  body: {}
  title: string
  headerImage: any
}

const Component: FC<props> = ({ data }) => {
  const { title, header, body, headerImage } = data.contentfulBlogTemplate
  return (
    <>
      <ArticleFullTemplate title={title} header={header} body={body} headerImage={headerImage} />
    </>
  )

}

export default Component

export const query = graphql`
  query($language: String!, $slug: String!) {
    contentfulBlogTemplate(node_locale: { eq: $language }, slug: {eq: $slug}) {
      title
      header {
        raw
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            title
            gatsbyImageData(width: 1000, placeholder: BLURRED, formats: WEBP)
          }
        }
      }
      headerImage {
        gatsbyImageData(formats: WEBP, placeholder: BLURRED, width: 1000)
      }
    }
  }
`
