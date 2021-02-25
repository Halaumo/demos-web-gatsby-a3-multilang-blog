import styled, {css} from 'styled-components'

const Hr = css`
  height: 2px;
  width: 100%;
  background-color: silver;
  margin-top: 1em;
  margin-bottom: 1em;
`

const RichTextWrap = styled.div`
  font-size: 16;
  line-height: 1.5;
  font-family: "-apple-system",BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;

  & hr {
    ${Hr}
  }
`

export default RichTextWrap
