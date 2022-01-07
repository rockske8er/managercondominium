import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useApi from '../services/api'
const DefaultLayout = () => {
  const api = useApi()
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  const checkLogin = async () => {
    if (api.getToken()) {
      const response = await api.validateToken()
      if (response.error === '') {
        setLoading(false)
      } else {
        alert(response.error)
        history.push('/login')
      }
    } else {
      history.push('/login')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])
  return (
    <div>
      {!loading && (
        <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </>
      )}
    </div>
  )
}

export default DefaultLayout
