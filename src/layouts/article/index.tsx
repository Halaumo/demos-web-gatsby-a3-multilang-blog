import React, { FC } from 'react'
import styled from 'styled-components'
import ArticleFull from '@/containers/articleFull/articleFull'
import Wrapper from '@/containers/wrapper/index'
import containerPadding from '@/components/styled/containerPadding'

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

const ContainerPadding = styled.div`
  ${containerPadding}
`

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
    <>
      <Wrapper tagsDefaultName={tagsDefaultName} headerTags={headerTags} locales={locales}>
        <ContainerPadding>
          <ArticleFull
            tags={articleTags}
            title={title}
            header={header}
            body={body}
            headerImage={headerImage}
          />
        </ContainerPadding>
      </Wrapper>
    </>
  )
}

export default Component
