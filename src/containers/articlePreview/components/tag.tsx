import React, { FC } from 'react'
import styled from 'styled-components'
import colors from '@/styles/variables/colors'
import { Link } from 'gatsby-plugin-react-i18next'

interface props {
  to: string
  description: string
}

const MyLink = styled(Link)`
  color: ${colors.black};
  font-size: 16px;

  &:hover {
    color: blue;
  }
`

const Component: FC<props> = ({ to, description }) => {
  return (
    <MyLink to={to}>
        {description}
    </MyLink>
  )
}

export default Component
