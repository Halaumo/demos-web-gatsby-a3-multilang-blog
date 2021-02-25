import React, { FC } from 'react'
import ArticleFull from '@/containers/articleFull/articleFull'
import CardWrap from '@/components/styled/CardWrap'
import Wrapper from '@/containers/wrapper/index'

interface props {
  header: {}
  body: {}
  title: string
  headerImage: any
  headerTags: tag[]
  articleTags: tag[]
  tagsDefaultName: string
  locales: locale[]
}

const Component: FC<props> = ({
  header,
  body,
  title,
  headerImage,
  headerTags,
  articleTags,
  tagsDefaultName,
  locales,
}) => {
  return (
    <Wrapper tagsDefaultName={tagsDefaultName} headerTags={headerTags} locales={locales}>
      <CardWrap>
        <ArticleFull
          tags={articleTags}
          title={title}
          header={header}
          body={body}
          headerImage={headerImage}
        />
      </CardWrap>
    </Wrapper>
  )
}

export default Component
