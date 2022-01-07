const baseUrl = 'https://api.b7web.com.br/devcond/api/admin'

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase()
  let fullUrl = `${baseUrl}${endpoint}`
  let body = null
  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString()
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

  let headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let req = await fetch(fullUrl, { method, headers, body })

  let response = await req.json()

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
