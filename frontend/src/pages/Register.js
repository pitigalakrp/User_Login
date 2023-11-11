import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'

export default function Register () {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Password: '',
    CPassword: ''
  })

  const handleInputs = e => {
    let name = e.target.id
    let value = e.target.value

    setUser({ ...user, [name]: value })
  }

  const postData = async e => {
    e.preventDefault()
    const { Name, Email, Phone, Password, CPassword } = user

    const res = await fetch('/adminRegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name,
        Email,
        Phone,
        Password,
        CPassword
      })
    })
    const data = await res.json()

    if (res.status === 201) {
      localStorage.setItem('token', data.token)
      window.alert('Registration Successfull')
      navigate('/')
    } else {
      window.alert('Registration Failed')
    }
  }

  return (
    <div>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-2 border-primary'></div>
            <Card className='shadow px-4'>
              <Card.Body>
                <div className='mb-3 mt-md-4'>
                  <h2 className='fw-bold mb-2 text-center text-uppercase '>
                    Logo
                  </h2>
                  <div className='mb-3'>
                    <Form method='POST'>
                      <Form.Group className='mb-3' controlId='Name'>
                        <Form.Label className='text-center'>Name</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Name'
                          defaultValue={user.Name}
                          onChange={handleInputs}
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='Email'>
                        <Form.Label className='text-center'>
                          Email address
                        </Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter email'
                          defaultValue={user.Email}
                          onChange={handleInputs}
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='Phone'>
                        <Form.Label className='text-center'>
                          Phone No.
                        </Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Phone No.'
                          defaultValue={user.Phone}
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
                      <Form.Group className='mb-3' controlId='CPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Password'
                          defaultValue={user.CPassword}
                          onChange={handleInputs}
                        />
                      </Form.Group>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      ></Form.Group>
                      <div className='d-grid'>
                        <Button
                          variant='primary'
                          type='submit'
                          onClick={postData}
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-3'>
                      <p className='mb-0  text-center'>
                        Already have an account??{' '}
                        <a href='/login' className='text-primary fw-bold'>
                          Sign In
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
