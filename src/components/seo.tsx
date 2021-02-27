import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface props {
  title: string
  description: string
  keywords: string[]
  ogImage: string
  ogImageWidth: string
  ogImageHeight: string
}

const Component: FC<props> = ({ title, description, keywords, ogImage, ogImageHeight, ogImageWidth }) => {
  return (
    <Helmet
      title={title}
      meta={[
        {
          name: 'description',
          content: `${description}`,
        },
        {
          name: 'keywords',
          content: keywords.join(', '),
        },
        {
          name: 'og:image',
          content: `${ogImage}`,
        },
        {
          name: 'og:image:width',
          content: `${ogImageWidth}`,
        },
        {
          name: 'og:image:height',
          content: `${ogImageHeight}`,
        },
      ]}
    />
  )
}

export default Component
