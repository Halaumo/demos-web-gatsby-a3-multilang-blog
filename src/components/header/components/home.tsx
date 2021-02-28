import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby-plugin-react-i18next'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import colors from '@/styles/variables/colors'

const MyIcon = styled(HomeIcon)`
  color: ${colors.black};
`

const Component = () => {
  return (
    <Link to='/' aria-label='link to home page'>
      <IconButton>
        <MyIcon />
      </IconButton>
    </Link>
  )
}

export default Component
