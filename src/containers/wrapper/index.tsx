import React, { FC } from 'react'
import styled from 'styled-components'
import Header from '@/components/header/index'
import Container from '@/components/styled/container'
import Line from '@/components/styled/line'
import containerPadding from '@/components/styled/containerPadding'

interface props {
  headerTags: tag[]
  locales: locale[]
  tagsDefaultName: string
}

const Footer = styled.div`
  height: 20px;
`

const MyContainer = styled(Container)`
  padding-top: 8px;
  padding-bottom: 8px;
  ${containerPadding}
`

const MyLine = styled(Line)`
  margin-bottom: 20px;
`

const Component: FC<props> = ({ headerTags, tagsDefaultName, locales, children }) => {
  return (
    <>
      <MyContainer>
        <Header tagsDefaultName={tagsDefaultName} tags={headerTags} locales={locales} />
      </MyContainer>

      <MyLine />

      <Container>
        {children}

        <Footer />
      </Container>
    </>
  )
}

export default Component
