import { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login () {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    Email: '',
    Password: ''
  })

  const handleInputs = e => {
    let name = e.target.id
    let value = e.target.value

    setUser({ ...user, [name]: value })
  }

  const postData = async e => {
    e.preventDefault()
    const { Email, Password } = user

    const res = await fetch('/adminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email,
        Password
      })
    })
    const data = await res.json()

    if (res.status === 201) {
      localStorage.setItem('token', data.token)
      window.alert('Login Successfull')
      navigate('/')
    } else {
      window.alert('Login Failed')
    }
  }

  return (
    <div>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-3 border-primary'></div>
            <Card className='shadow'>
              <Card.Body>
                <div className='mb-3 mt-md-4'>
                  <h2 className='fw-bold mb-2 text-uppercase '>Login</h2>
                  <p className=' mb-5'>Please enter your login and password!</p>
                  <div className='mb-3'>
                    <Form method='POST'>
                      <Form.Group className='mb-3' controlId='Email'>
                        <Form.Label className='text-center'>
                          Email address
                        </Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter email'
                          defaultValue={user.Name}
                          onChange={handleInputs}
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='Password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Password'
                          defaultValue={user.Password}
                          onChange={handleInputs}
                        />
                      </Form.Group>
                      {/* <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <p className='small'>
                          <a className='text-primary' href='#!'>
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group> */}
                      <div className='d-grid'>
                        <Button
                          variant='primary'
                          type='submit'
                          onClick={postData}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-3'>
                      <p className='mb-0  text-center'>
                        Don't have an account?{' '}
                        <a href='/register' className='text-primary fw-bold'>
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
