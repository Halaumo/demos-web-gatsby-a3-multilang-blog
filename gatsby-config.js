require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    `gatsby-plugin-image`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // if in folder has no image remove gatsby-source-filesystem
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/changePage.tsx'),
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: '',
        defaultLanguage: 'en', /** Только с 'en' работает */
        languages: ['ru', 'en'],
        siteUrl: process.env.SITE_URL,
        redirect: true,
        generateDefaultLanguagePage: false,
      },
      i18nextOptions: {
        interpolation: {
          escapeValue: false,
        },
        keySeparator: false,
        nsSeparator: false,
        initImmediate: false,
      },
    },
  ],
}
