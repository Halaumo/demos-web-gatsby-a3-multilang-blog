import React, { FC } from 'react'
import styled from 'styled-components'
import { useI18next } from 'gatsby-plugin-react-i18next'
import Pagination from '@material-ui/lab/Pagination'

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;

`

interface props {
  to: string
  currentPage: number
  numPages: number
}

const Component: FC<props> = ({ currentPage, numPages, to }) => {
  const { navigate } = useI18next()
  const isFirstPage =  currentPage === 1
  const isLastPage = currentPage === numPages
  const dynamicTo = (page: number) =>  (page === 1 ? to : `${to}${page}`)

  const handleChange = (_: any, value: number) => {
    if (currentPage === value) return
    const to = dynamicTo(value)
    navigate(to)
  }

  return (
    <>
      <Wrap>
        <Pagination
          siblingCount={3}
          page={currentPage}
          hidePrevButton={isFirstPage}
          hideNextButton={isLastPage}
          count={numPages}
          onChange={handleChange}
        />
      </Wrap>
    </>
  )
}

export default Component
