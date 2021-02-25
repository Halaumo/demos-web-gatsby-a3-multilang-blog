// import React, { useContext } from 'react'
// import styled from 'styled-components'
// import { Link, Trans, useTranslation, I18nextContext } from 'gatsby-plugin-react-i18next'
// import { graphql } from 'gatsby'

// const Container = styled.div`
//   margin: 0 auto;
//   max-width: 1200px;
//   text-align: center;

// `

// const H1 = styled.h1`
//   font-size: 44px;
// `

// const Time = styled.p`
//   font-weight: 700;
//   font-size: 30px;

// `

// const IndexPage = () => {
//   const { t } = useTranslation()
//   const ctx = useContext(I18nextContext)

//   /** Date */
//   const dateFormatter = new Intl.DateTimeFormat(ctx.language)
//   const rawDate = t('Date')
//   const date = new Date(rawDate).getDate()
//   const formattedDate = isNaN(date) ? 'invalid date' : dateFormatter.format(date)

//   return (
//     <Container>
//       <H1>
//         <Trans>Home</Trans>
//       </H1>

//       <Time>
//         {formattedDate}
//       </Time>
//     </Container>
//   )
// }

// export default IndexPage

// export const query = graphql`
//   query($language: String!) {
//     locales: allLocale(filter: {language: {eq: $language}}) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
//       }
//     }
//   }
// `
