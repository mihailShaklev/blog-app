import PropTypes from 'prop-types'
import { useState} from "react"
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({handleSubmit}) => {

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const submitLoginForm = (event) => {
        event.preventDefault()
        handleSubmit(username, password)
        setUsername('')
        setPassword('')
    }

    return(
    <div className='container'>
    <Form onSubmit={submitLoginForm}>
      <Form.Group>
        <Form.Label>username</Form.Label>
          <Form.Control
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
          <Form.Control
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Login</Button>
    </Form>
    </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm