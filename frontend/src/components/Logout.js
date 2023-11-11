import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const adminLogout = useCallback(async () => {
    const token = localStorage.getItem('token')
    console.log(token)

    const res = await fetch('/logoutAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth: token
      })
    })
    const data = await res.json()
    console.log(data)

    if (res.status === 201) {
      setShow(true)
      await localStorage.removeItem('token') // Removed 'data.token'
      window.alert('Logout Successfully')
      navigate('/login')
    } else {
      window.alert('Logout Failed')
      navigate('/home')
    }
  }, [navigate])

  useEffect(() => {
    adminLogout()
  }, [adminLogout])

  return (
    <div>
      <h1>{show ? 'Logout Successfully' : 'Processing...'}</h1>
    </div>
  )
}

export default Logout
