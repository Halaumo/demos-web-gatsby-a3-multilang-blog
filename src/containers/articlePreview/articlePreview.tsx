import React, { FC } from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { Link } from 'gatsby-plugin-react-i18next'
import Tag from './components/tag'
import colors from '@/styles/variables/colors'
import richTextOptions from '@/components/richText/options'
import RichTextWrap from '@/components/richText/richTextWrap'

interface props {
  to: string
  title: string
  header: any
  headerImage: any
  tags: tag[]
  isTitleLink?: boolean
}

const Title = styled.h1`
  font-size: 40px;
  line-height: 1.5;
  color: ${colors.black};
  margin-bottom: 0.5em;
`

const TitleLink = styled(Link)`
  color: ${colors.black};

  &:visited {
    color: blueviolet;
  }

  &:hover {
    color: blue;
  }
`

const Header = styled.div`
  margin-top: 20px;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  & > a {
    margin: 10px;
  }
`

const Component: FC<props> = ({ title, header, to, headerImage, tags, isTitleLink = true }) => {
  return (
    <>
      <Tags>
        {tags.map(({ tag, description }) => (
          <Tag key={tag} to={`/${tag}`} description={description} />
        ))}
      </Tags>

      <Title>{isTitleLink ? <TitleLink to={to}>{title}</TitleLink> : title}</Title>

      <GatsbyImage image={headerImage.gatsbyImageData} alt='image' />

      <Header>
        <RichTextWrap>{header && renderRichText(header, richTextOptions)}</RichTextWrap>
      </Header>
    </>
  )
}

export default Component
