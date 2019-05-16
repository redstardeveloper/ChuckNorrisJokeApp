import React, { useReducer } from 'react'
import { render } from 'react-dom'
import styled from '@emotion/styled'
import colors from 'colors'
import { Button } from 'ui-components'

import { Main, Login } from './components'

import JokesContext from './helpers/context'
import initialState from './helpers/InitialState'
import reducer from './helpers/reducer'
import * as actions from './helpers/actions'

const StyledContainer = styled.div`
  width: 900px;
  margin: 0 auto;
  background-color: ${colors.background};
`

const StyledButton = styled(Button)`
  float: right;
  color: ${colors.black};
  :hover {
    cursor pointer
  }
`

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { auth } = state

  const onLogOutButtonClickHandler = () => {
    dispatch({ type: actions.SET_AUTH, payload: false })
    sessionStorage.removeItem('user')
  }

  return (
    <JokesContext.Provider value={{ state, dispatch }}>
      <StyledButton bcg={colors.grey} onClick={onLogOutButtonClickHandler}>
        Log out
      </StyledButton>
      <StyledContainer>{auth ? <Main /> : <Login />}</StyledContainer>
    </JokesContext.Provider>
  )
}

render(<App />, document.getElementById('root'))
