import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Article from '@/layouts/article/index'

interface props {
  data: {
    article: article
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
}

type article = {
  header: {}
  body: {}
  title: string
  headerImage: any
  tags: tag[]
}

const Component: FC<props> = ({ data }) => {
  const { title, header, body, headerImage, tags: articleTags } = data.article
  const tagsDefaultName = data?.meta?.tagsDefaultName
  const headerTags = data?.tags?.nodes
  const locales = data?.locales?.nodes

  return (
    <>
      <Article
        locales={locales}
        tagsDefaultName={tagsDefaultName}
        headerTags={headerTags}
        title={title}
        header={header}
        body={body}
        headerImage={headerImage}
        articleTags={articleTags}
      />
    </>
  )
}

export default Component

export const query = graphql`
  query($language: String!, $slug: String!) {
    article: contentfulPosts(node_locale: { eq: $language }, slug: { eq: $slug }) {
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
      tags {
        tag
        description
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
    }

    locales: allContentfulLocalesWithDescription(filter: { node_locale: { eq: "en" } }) {
      nodes {
        locale
        description
      }
    }
  }
`
