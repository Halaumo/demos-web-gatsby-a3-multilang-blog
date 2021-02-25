import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { TransitionStatus } from 'react-transition-group/Transition'
import { Transition, TransitionGroup } from 'react-transition-group'

const Wrap = styled.div`
  position: relative;
`

const Page = styled.div<{ state: TransitionStatus }>(
  ({ state }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    ${state === 'entering' && css`
      opacity: 0;
    `}

    ${state === 'entered' && css`
      transition: opacity .333s ease-in;
      opacity: 1;
    `}

    ${state === 'exiting' && css`
      transition: opacity .333s ease-out;
      opacity: 0;
    `}
`
)

interface props {
  location: {
    pathname: string
  }
}

const Component: FC<props> = ({ location, children }) => {
  return (
    <Wrap>
      <TransitionGroup component={null}>
        <Transition key={location.pathname} timeout={333}>
          {(status) => (
            <Page state={status}>{children}</Page>
          )}
        </Transition>
      </TransitionGroup>
    </Wrap>
  )
}

export default Component
