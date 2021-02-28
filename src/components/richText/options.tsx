/* eslint-disable react/display-name */
import React, { FC } from 'react'
import styled from 'styled-components'

import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  Blockquote,
  Bold,
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Header6,
  Hr,
  Italic,
  OlLi,
  P,
  UlLi
} from './styled'

const renderImage = ({ data }: { data: any }) => {
  return (
    <>
      {data?.target?.gatsbyImageData ? (
        <Center>
          <GatsbyImage image={data.target.gatsbyImageData} alt='image' />
        </Center>
      ) : undefined}
    </>
  )
}

const Center = styled.div`
  display: flex;
  justify-content: center;
`

// const renderHeaderFactory = (Component: FC) => (_: any, children: string[]) => {
//   return (
//     <>
//       {children.map((value, i) => (
//         <Component key={`${value}${i}`}>{value}</Component>
//       ))}
//     </>
//   )
// }

const renderNodeFactory = (Component: FC) => (_: any, children: any) => (
  <>
    <Component>{children}</Component>
  </>
)

const renderMarkFactory = (Component: FC) => (text: string) => <Component>{text}</Component>

const options = {
  renderMark: {
    [MARKS.BOLD]: renderMarkFactory(Bold),
    [MARKS.ITALIC]: renderMarkFactory(Italic),
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: renderImage,
    [BLOCKS.PARAGRAPH]: renderNodeFactory(P),
    [BLOCKS.HEADING_1]: renderNodeFactory(Header1),
    [BLOCKS.HEADING_2]: renderNodeFactory(Header2),
    [BLOCKS.HEADING_3]: renderNodeFactory(Header3),
    [BLOCKS.HEADING_4]: renderNodeFactory(Header4),
    [BLOCKS.HEADING_5]: renderNodeFactory(Header5),
    [BLOCKS.HEADING_6]: renderNodeFactory(Header6),
    [BLOCKS.UL_LIST]: renderNodeFactory(UlLi),
    [BLOCKS.OL_LIST]: renderNodeFactory(OlLi),
    [BLOCKS.QUOTE]: renderNodeFactory(Blockquote),
  },
}

export default options
