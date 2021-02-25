import React, { FC } from 'react'
import styled from 'styled-components'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import ArticlePreview from '@/containers/articlePreview/articlePreview'
import richTextOptions from '@/components/richText/options'
import RichTextWrap from '@/components/richText/richTextWrap'

interface props {
  title: string
  header: any
  body: any
  headerImage: any
  tags: tag[]
}

const Body = styled.div`
  margin-top: 20px;
`

const Component: FC<props> = ({ title, header, body, headerImage, tags }) => {
  return (
    <>
      <ArticlePreview
        header={header}
        headerImage={headerImage}
        isTitleLink={false}
        title={title}
        to=''
        tags={tags}
      />

      <Body>
        <RichTextWrap>
          {body && renderRichText(body, richTextOptions)}
        </RichTextWrap>
      </Body>
    </>
  )
}

export default Component
