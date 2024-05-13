import jwt from 'jsonwebtoken'
const JWT_SECRET_KEY = 'babys2024'
const API_URL = 'http://84.120.85.204:5038'

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({cookies, request}) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch(API_URL + '/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
    });
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      let privilege = false
      if (data.privilege === 'admin') {
        privilege = true
        page = '/admin'
      }
      const tokenPayload = {
      email: email,
      admin: privilege
      }
      const token = jwt.sign(tokenPayload, JWT_SECRET_KEY)
      cookies.set('jwt', token, {path:'/'});
    }
  },
};