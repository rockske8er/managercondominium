import React, { useState } from 'react'

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeClosed, cilLockLocked } from '@coreui/icons'
import useApi from '../../services/api'
import { useHistory } from 'react-router-dom'
import { api2 } from 'src/services/api2'

const Login = () => {
  const api = useApi()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const _handleLogin = async () => {
    if (email && password) {
      setLoading(true)
      const { data } = await api2.post('/auth/login', {
        email,
        password,
      })

      setLoading(false)

      if (data.error === '') {
        console.log(data)
        localStorage.setItem('@ManagerCondominium:token', data.token)
        history.push('/')
      } else {
        setError(error)
      }
    } else {
      setError('Digite os Dados corretos para ter acesso')
    }
  }
  const handleLogin = async () => {
    console.log(email, password)
    if (email && password) {
      const response = await api.login(email, password)

      alert(response)

      console.log(response)

      // if (response.error === '') {
      //   console.log(response)
      //   localStorage.setItem('@ManagerCondominium:token', response.token)
      //   history.push('/')
      // } else {
      //   setError(error)
      // }
    } else {
      setError('Digite os Dados corretos para ter acesso')
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Entre com os dados de acesso</p>

                    {error !== '' && <CAlert color="danger">{error}</CAlert>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6} className="justify-content-center">
                        <CButton
                          color="primary"
                          className="px-4 justify-content-center"
                          onClick={_handleLogin}
                          disabled={loading}
                        >
                          {loading ? 'Carregando' : 'Entrar'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
