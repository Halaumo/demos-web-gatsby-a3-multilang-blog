import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Articles from '@/layouts/articles/index'

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
    tag: string
  }
}

const dataDefault = {
  articles: { nodes: [] },
  tags: {
    nodes: [],
  },
  meta: {
    tagsDefaultName: '',
  },
  locales: {
    nodes: [],
  },
}

const Component: FC<props> = ({ data, pageContext }) => {
  const articles = data.articles?.nodes              || dataDefault.articles.nodes
  const tags = data.tags?.nodes                      || dataDefault.tags.nodes
  const locales = data.locales?.nodes                || dataDefault.locales.nodes
  const tagsDefaultName = data.meta?.tagsDefaultName || dataDefault.meta.tagsDefaultName
  const { numPages, currentPage, tag } = pageContext

  return (
    <>
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
