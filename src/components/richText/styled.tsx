import styled from 'styled-components'

export const Header1 = styled.h1`
  line-height: 2;
  font-size: 3em;
`
export const Header2 = styled.h1`
  line-height: 2;
  font-size: 2.4em;
`
export const Header3 = styled.h1`
  line-height: 2;
  font-size: 2em;
`
export const Header4 = styled.h1`
  line-height: 2;
  font-size: 1.6em;
`
export const Header5 = styled.h1`
  line-height: 2;
  font-size: 1.4em;
`
export const Header6 = styled.h1`
  line-height: 2;
  font-size: 1.2em;
`

export const Bold = styled.strong`
  font-weight: 700;
`

export const Italic = styled.em`
  font-style: italic;
`

export const UlLi = styled.ul`
  & > li {
    position: relative;
    padding-left: 1em;

    &:before {
      content: '';
      position: absolute;
      top: 0.6em;
      left: 0;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      overflow: hidden;
      background-color: black;
    }
  }
`
export const OlLi = styled.ol`
  & > li {
    margin-left: 1em;
  }
`

export const Blockquote = styled.blockquote`
  padding-left: 1em;
  position: relative;
  margin-top: 0.5em;
  margin-bottom: 0.5em;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    display: block;
    width: 0.5em;
    height: calc(100% - 0.5em);
    background-color: silver;
  }
`

export const P = styled.p`
  font-size: 1em;

  & > a {
    color: blue;

    &:hover {
      opacity: 0.7;
    }
  }
`
