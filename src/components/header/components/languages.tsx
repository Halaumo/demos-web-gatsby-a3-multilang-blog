import React, { FC, useState, useRef } from 'react'
import styled from 'styled-components'
import { useI18next, Link } from 'gatsby-plugin-react-i18next'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import LanguageIcon from '@material-ui/icons/Language'
import IconButton from '@material-ui/core/IconButton'
import { locale } from '../interfaces'
import colors from '@/styles/variables/colors'

const MyLink = styled(Link)(({ $active }: {$active: boolean}) => `
  padding-left: 1em;
  padding-right: 1em;
  color: ${colors.black};

  ${$active && `
    color: blue;
  `}
`)

const MyIcon = styled(LanguageIcon)`
  color: ${colors.black};
`

interface props {
  locales: locale[]
}

const Component: FC<props> = ({ locales }) => {
  const { language, originalPath } = useI18next()
  const anchor = useRef(null)
  const [isMenu, setIsMenu] = useState(false)

  const openMenu = () => {
    setIsMenu(true)
  }

  const closeMenu = () => {
    setIsMenu(false)
  }

  const changeLanguageHandler = async () => {
    setIsMenu(false)
  }

  return (
    <>
      <IconButton variant="outlined" ref={anchor} aria-controls='languages-menu' aria-haspopup='true' onClick={openMenu}>
        <MyIcon />
      </IconButton>
      <Menu
        anchorEl={anchor.current}
        id='languages-menu'
        keepMounted
        open={isMenu}
        onClose={closeMenu}>
        {locales.map(({ locale, description }) => (
          <MenuItem
            key={locale}
            dense={true}
            disableGutters={true}
          >
            <MyLink
              $active={language === locale}
              onClick={changeLanguageHandler}
              to={originalPath}
              language={locale}
            >{description}</MyLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Component
