import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

const Navigationbar = () => {
  const token = localStorage.getItem('token')
  
  return (
    <div>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/'>E Website</Navbar.Brand>
          <Nav className='me-auto'>
            {token ? (
              <>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/logout' onClick={console.log("first")}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/register'>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigationbar
