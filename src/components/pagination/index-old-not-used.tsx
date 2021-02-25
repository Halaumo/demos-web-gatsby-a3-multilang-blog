import React, { FC } from 'react'
import styled from 'styled-components'
import { useI18next, Link } from 'gatsby-plugin-react-i18next'

const Wrap = styled.div`
  border: 1px solid black;
  padding: 10px;
`

interface props {
  to: string
  currentPage: number
  numPages: number
}

const PrevNextLink = styled(Link)<{ $disabled?: boolean }>(
  ({ $disabled }) => `
    color: blue;

    ${
      $disabled &&
      `
        color: black;
      `
    }
`
)

const NextPrevWrap = styled.div`
  display: flex;
  font-size: 30px;

  & > :first-child {
    margin-right: 0.5em;
  }
`

const NumberLink = styled(Link)<{ $disabled?: boolean }>(
  ({ $disabled }) => `
    color: blue;
    border: 1px solid black;
    padding: 5px;
    ${
      $disabled &&
      `
        color: black;
      `
    }
`
)

const Numbers = styled.div`
  display: flex;
  font-size: 30px;
  margin-top: 15px;
  align-items: center;

  & > ${NumberLink}:first-child {
    margin-left: 0;
    margin-right: 0.5em;
  }

  & > ${NumberLink} {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }

  & > ${NumberLink}:last-child {
    margin-left: 0.5em;
    margin-right: 0;
  }
`

const Component: FC<props> = ({ currentPage, numPages, to }) => {
  const { language } = useI18next()
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? to : `${to}${currentPage - 1}`
  const nextPage = `${to}${currentPage + 1}`
  const firstPage = to
  const lastPage = `${to}${numPages}`

  return (
    <>
      <Wrap>
        <NextPrevWrap>
          {isFirstPage ? (
            <PrevNextLink as='span' $disabled={true}>
              {' '}
              Prev
            </PrevNextLink>
          ) : (
            <PrevNextLink language={language} to={prevPage}>
              {' '}
              Prev
            </PrevNextLink>
          )}

          {isLastPage ? (
            <PrevNextLink as='span' $disabled={true}>
              Next
            </PrevNextLink>
          ) : (
            <PrevNextLink language={language} to={nextPage}>
              Next
            </PrevNextLink>
          )}
        </NextPrevWrap>

        <Numbers>
          {isFirstPage ? (
            <NumberLink as='span'>First</NumberLink>
          ) : (
            <NumberLink language={language} to={firstPage}>
              First
            </NumberLink>
          )}
          {new Array(numPages).fill(0).map((_, i) => {

            if (i + 1 === 1) {
              return <></>
            } else if (i + 1 === numPages) {
              return <></>
            }


            return (
              <NumberLink  key={i + 1} as='span'>
                {i + 1}
              </NumberLink>
            )
          })}
          {isLastPage ? (
            <NumberLink as='span'>Last</NumberLink>
          ) : (
            <NumberLink language={language} to={lastPage}>
              Last
            </NumberLink>
          )}
        </Numbers>
      </Wrap>
    </>
  )
}

export default Component
