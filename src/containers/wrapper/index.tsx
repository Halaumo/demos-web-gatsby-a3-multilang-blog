import React, { FC } from 'react'
import styled from 'styled-components'
import Header from '@/components/header/index'
import Container from '@/components/styled/container'
import Line from '@/components/styled/line'
import ContainerPadding from '@/components/styled/containerPadding'
interface props {
  headerTags: tag[]
  locales: locale[]
  tagsDefaultName: string
}

const PaddingTop = styled.div`
  padding-top: 8px;
`
const PaddingBottom = styled.div`
  padding-bottom: 20px;
`

const Footer = styled.div`
  height: 40px;
`

const Component: FC<props> = ({ headerTags, tagsDefaultName, locales, children }) => {
  return (
    <>
      <PaddingTop />
      <Container>
        <ContainerPadding>
          <Header tagsDefaultName={tagsDefaultName} tags={headerTags} locales={locales} />
        </ContainerPadding>
      </Container>
      <PaddingTop />
      <Line />
      <PaddingBottom/>

      <Container>
        {children}

        <Footer />
      </Container>
    </>
  )
}

export default Component
