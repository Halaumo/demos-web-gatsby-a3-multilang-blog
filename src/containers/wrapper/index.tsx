import React, { FC } from 'react'
import styled from 'styled-components'
import Header from '@/components/header/index'
import Container from '@/components/styled/container'
import PagePadding from '@/components/styled/PagePadding'



interface props {
  headerTags: tag[]
  locales: locale[]
  tagsDefaultName: string
}

const Footer = styled.div`
  height: 40px;
`

const Component: FC<props> = ({ headerTags, tagsDefaultName, locales, children }) => {
  return (
    <>
      <PagePadding>
        <Container>
          <Header tagsDefaultName={tagsDefaultName} tags={headerTags} locales={locales} />

          {children}

          <Footer />
        </Container>
      </PagePadding>
    </>
  )
}

export default Component
