import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface props {
  lang: string
  title: string
  description: string
  keywords: string[]
  ogSiteUrl: string
  ogPageUrl: string
  ogSiteName: string
  ogImage: string
  ogImageWidth: string
  ogImageHeight: string
}

const Component: FC<props> = ({
  lang,
  title,
  description,
  keywords,
  ogSiteUrl,
  ogPageUrl,
  ogSiteName,
  ogImage,
  ogImageHeight,
  ogImageWidth,
}) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
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
          name: 'og:url',
          content: ogPageUrl,
        },
        {
          name: 'og:site_name',
          content: ogSiteName,
        },
        {
          name: 'og:title',
          content: title,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'og:locale',
          content: lang,
        },
        {
          name: 'og:image',
          content: ogImage,
        },
        {
          name: 'og:image:width',
          content: `${ogImageWidth}`,
        },
        {
          name: 'og:image:height',
          content: `${ogImageHeight}`,
        },
        {
          name: 'og:image:type',
          content: 'image/jpeg',
        },
        {
          name: 'twitter:card"',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title"',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image:src',
          content: ogImage,
        },
        {
          name: 'twitter:url',
          content: ogPageUrl,
        },
        {
          name: 'twitter:domain',
          content: ogSiteUrl,
        },
      ]}
    />
  )
}

export default Component
