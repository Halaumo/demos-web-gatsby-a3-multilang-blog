import React, { FC } from 'react'
import styled from 'styled-components'
import Navigation from './components/navigation'
import Languages from './components/languages'
import Home from './components/home'

const Header = styled.header`
  padding-top: 15px;
  padding-bottom: 15px;
`

const Flex = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Center = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

interface props {
  tags: tag[]
  locales: locale[]
  tagsDefaultName: string
}

const Component: FC<props> = ({ tags, tagsDefaultName, locales }) => {
  return (
    <>
      <Header>
        <Flex>
          <Navigation tagsDefaultName={tagsDefaultName} tags={tags} />

          <Center>
            <Home />
          </Center>

          <Languages locales={locales} />
        </Flex>
      </Header>
    </>
  )
}

export default Component
