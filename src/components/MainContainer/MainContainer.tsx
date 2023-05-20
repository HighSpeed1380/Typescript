import { styled } from '@mui/material'

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;

  margin-left: 16px;
  margin-right: 16px;
  @media (min-width: 640px) {
    margin-left: 32px;
    margin-right: 32px;
  }
  @media (min-width: 1264px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
  }
`

export default MainContainer
