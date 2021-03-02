import React, { FC, useRef, useState } from 'react'
import styled from 'styled-components'
import { useI18next, Link } from 'gatsby-plugin-react-i18next'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import colors from '@/styles/variables/colors'

interface props {
  tags: tag[]
  tagsDefaultName: string
}

const MyLink = styled(Link)(
  ({ $active }: { $active?: boolean }) => `
  padding-left: 1em;
  padding-right: 1em;
  line-height: 1.75;
  font-size: 16px;
  color: ${colors.black};

  ${$active && `
    color: blue;
  `}
`
)

const MenuBtn = styled(Button)`
  & > .MuiButton-label {
    color: ${colors.black};
    font-size: 20px;
  }
`

const createButtonName = (tags: tag[], originalPath: string, tagsDefaultName: string) => {
  let res: string
  let isIncludes: boolean = false

  for (const { tag } of tags) {
    if (originalPath.includes(tag)) {
      res = tag
      isIncludes = true
      break
    }
  }

  if (isIncludes) {
    const find = tags.find(({ tag }) => tag === res)
    return find!.description
  }
  return tagsDefaultName
}

const Component: FC<props> = ({ tags, tagsDefaultName }) => {
  const { originalPath } = useI18next()
  const anchor = useRef(null)
  const [isMenu, setIsMenu] = useState(false)

  const buttonName: string = createButtonName(tags, originalPath, tagsDefaultName)

  const openMenu = () => {
    setIsMenu(true)
  }

  const closeMenu = () => {
    setIsMenu(false)
  }

  return (
    <>
      <MenuBtn ref={anchor} onClick={openMenu}>
        {buttonName}
      </MenuBtn>
      <Menu anchorEl={anchor.current} open={isMenu} keepMounted onClose={closeMenu}>
        {tags.map(({ description, tag }) => (
          <MenuItem key={tag} dense={true} disableGutters={true}>
            <MyLink $active={buttonName === description} onClick={closeMenu} to={`/${tag}`}>
              {description}
            </MyLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Component
