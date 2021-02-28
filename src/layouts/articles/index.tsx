import React, { FC } from 'react'
import styled from 'styled-components'
import ArticlePreview from '@/containers/articlePreview/articlePreview'
import Container from '@/components/styled/container'
import Pagination from '@/components/pagination/index'
import CardWrap from '@/components/styled/CardWrap'
import Wrapper from '@/containers/wrapper/index'
import containerPadding from '@/components/styled/containerPadding'

interface props {
  articles: article[]
  articleSlug: string
  paginateSlug: string
  tags: tag[]
  numPages: number
  currentPage: number
  tagsDefaultName: string
  locales: locale[]
}

const MyContainer = styled(Container)`
  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  & > div:first-child {
    margin-top: 0;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`

const MyCardWrap = styled(CardWrap)`
  ${containerPadding}
`

const Component: FC<props> = ({
  articles,
  articleSlug,
  paginateSlug,
  numPages,
  currentPage,
  tags,
  tagsDefaultName,
  locales,
}) => {
  return (
    <Wrapper locales={locales} tagsDefaultName={tagsDefaultName} headerTags={tags}>
      <MyContainer>
        {articles.map((article) => (
          <MyCardWrap key={article.contentful_id}>
            <ArticlePreview
              title={article.title}
              header={article.header}
              headerImage={article.headerImage}
              to={`${articleSlug}/${article.slug}`}
              tags={article.tags}
            />
          </MyCardWrap>
        ))}

        <Pagination numPages={numPages} currentPage={currentPage} to={paginateSlug} />
      </MyContainer>
    </Wrapper>
  )
}

export default Component
