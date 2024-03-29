import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import styled from 'styled-components'
import { AuthService } from '../../services/auth.service'
import { useRouter } from 'next/router'
import { ORDERS_URL } from '../../components/constant/url-routes'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useStoreActions } from '../../store/hooks'
import { PrivatePage } from '../../components/routing/private-page'

const $Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  & > div {
    width: 100%;
    display: flex;
    margin: 0 50px;
    justify-content: center;
    flex-direction: column;
    & > h1 {
      margin: 0 auto 20px auto;
    }
    & > h6 {
      margin: 0 auto;
      margin-bottom: 50px;
      font-weight: lighter;
    }

    & > div {
      margin-bottom: 18.5px;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    & > div {
      width: 424px;
      height: 400px;
      & > h1 {
        margin: 0 auto 10px auto;
        font-size: 3rem;
        line-height: 56.25px;
      }
      & > h6 {
        margin: 0 auto;
        margin-bottom: 62px;
        font-size: 2rem;
        line-height: 37.5px;
      }

      & > div {
        margin-bottom: 32.5px;
      }

      & > button {
        font-size: 1rem;
        min-height: 57px;
      }
    }
  }
`

const Login = (): ReactElement => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [isErrorEmail, setErrorEmail] = useState(false)
  const [isErrorPassword, setErrorPassword] = useState(false)
  const [isErrorMessage, setErrorMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const setSession = useStoreActions(state => state.sessionModel.setSessionThunk)
  const router = useRouter()
  const handleSubmit = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const authService = new AuthService()
  useEffect(() => {
    setErrorMessage(false)
    if (loginData.username && loginData.username.length === 0) {
      setErrorEmail(true)
    } else {
      setErrorEmail(false)
    }
  }, [loginData.username])

  useEffect(() => {
    if (loginData.password && loginData.password.length === 0) {
      setErrorPassword(true)
    } else {
      setErrorPassword(false)
    }
  }, [loginData.password])

  const onClick = async () => {
    if (loginData.username.length === 0) {
      setErrorEmail(true)
    } else {
      setErrorEmail(false)
    }

    if (loginData.password.length === 0) {
      setErrorPassword(true)
    } else {
      setErrorPassword(false)
    }

    const userData = await authService.signIn({ email: loginData.username, password: loginData.password })
    setSession(userData)

    if (userData && !userData.message) {
      router.push(`${ORDERS_URL}`)
    } else {
      if (userData.message !== 'Missing required parameter USERNAME') {
        setErrorMessage(true)
      }
    }
  }

  return (
    <PrivatePage>
      <div>
        <Head>
          <title>Blockwise | Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <$Container>
            <div>
              <Typography variant="h1">LOGIN</Typography>
              <Typography variant="subtitle1">TO CONTINUE</Typography>
              <TextField
                error={isErrorMessage || isErrorEmail}
                id="standard-error-helper-text"
                label={!isErrorEmail ? 'Email' : 'Error'}
                helperText={isErrorMessage ? 'The email is incorrect' : isErrorEmail && 'Complete this field'}
                variant="standard"
                name="username"
                value={loginData.username}
                onChange={handleSubmit}
              />
              <TextField
                error={isErrorMessage || isErrorPassword}
                id="outlined-password-input"
                helperText={isErrorMessage ? 'The password is incorrect' : isErrorPassword && 'Complete this field'}
                variant="standard"
                label={!isErrorPassword ? 'Password' : 'Error'}
                type={showPassword ? 'text' : 'password'}
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={loginData.password}
                onChange={handleSubmit}
              />

              <Button variant="contained" onClick={onClick}>
                SIGN IN
              </Button>
            </div>
          </$Container>
        </main>
      </div>
    </PrivatePage>
  )
}

export default Login
