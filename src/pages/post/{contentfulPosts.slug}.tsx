import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Article from '@/layouts/article/index'
import Seo from '@/components/seo'

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

const Component: FC<props> = ({ data }) => {
  const title: string = data.article?.title || ''
  const header: any = data.article?.header || {}
  const body: any = data.article?.body || {}
  const headerImage: any = data.article?.headerImage || {}
  const articleTags: tag[] = data.article?.tags || []
  const tagsDefaultName: string = data.meta?.tagsDefaultName || ''
  const headerTags: tag[] = data.tags?.nodes || []
  const locales: locale[] = data.locales?.nodes || []
  const seoDescription: string = data.article?.seo?.seoDescription || ''
  const seoKeywords: string[] = data.article?.seo?.seoKeywords || []
  const seoImage: string = data.article?.headerImage?.resize?.src || ''
  const seoImageWidth: string = `${data.article?.headerImage?.resize?.width}` || ''
  const seoImageHeight: string = `${data.article?.headerImage?.resize?.height}` || ''

  return (
    <>
      {title === '' ? (
        <p>No post</p>
      ) : (
        <>
          <Seo
            title={title}
            description={seoDescription}
            keywords={seoKeywords}
            ogImage={seoImage}
            ogImageHeight={seoImageHeight}
            ogImageWidth={seoImageWidth}
          />
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
      )}
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
        resize(toFormat: WEBP, width: 1000) {
          src
          width
          height
        }
      }
      tags {
        tag
        description
      }
      seo {
        seoKeywords
        seoDescription
      }
    }

    tags: allContentfulTags(filter: { node_locale: { eq: $language } }) {
      nodes {
        tag
        description
      }
    }

    seo: contentfulPosts(node_locale: { eq: $language }, slug: { eq: $slug }) {
      headerImage {
        gatsbyImageData(formats: WEBP, placeholder: BLURRED, width: 1000)
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
