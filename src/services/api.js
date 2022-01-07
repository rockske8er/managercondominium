const baseUrl = 'https//:api.b7web.com.br/devcond/api/admin'

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase()
  const fullUrl = `${baseUrl}${endpoint}`
  const body = null
  switch (method) {
    case 'get':
      const queryString = new URLSearchParams(params).toString()
      fullUrl += `?${queryString}`
      break
    case 'post':
      break

    case 'put':
      break

    case 'delete':
      body = JSON.stringify(params)
      break
    default:
      break
  }

  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const req = await fetch(fullUrl, { method, headers, body })

  const response = await req.json()

  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return {
    getToken: () => {
      return localStorage.getItem('@ManagerCondominium:token')
    },

    validateToken: async () => {
      const token = localStorage.getItem('@ManagerCondominium:token')
      const response = await request('post', '/auth/validate', {}, token)
      return response
    },

    login: async (email, password) => {
      const response = await request('post', '/auth/login', {
        email,
        password,
      })

      return response
    },
  }
}
