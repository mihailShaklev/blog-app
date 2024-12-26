import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { messageChange } from './reducers/errorMessageReducer'
import { initializeBlogs, createBlog, changeBlogLikes, eraseBlog, comment } from './reducers/blogReducer'
import { loginUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'


const App = () => {

  const dispatch = useDispatch()
  const message = useSelector(state => state.message)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    userService
    .getAll()
    .then( response => {
      setUsers(response)
      }
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)

    dispatch(createBlog(blogObject))
    dispatch(messageChange(`a new blog '${blogObject.title}' by '${blogObject.author}' added!`))
    setTimeout(() => {
      dispatch(messageChange(null))
    }, 5000)
    
  }

  const likeBlog = (id, blogObject) => {

    dispatch(changeBlogLikes(id, blogObject))
    dispatch(messageChange(`Blog ${blogObject.title} received 1 like!`))
    setTimeout(() => {
      dispatch(messageChange(null))
    }, 5000)

  }

  const addComment = (id, blogObject) => {
    dispatch(comment(id, blogObject))
    dispatch(messageChange(`Comment was sent!`))
    setTimeout(() => {
      dispatch(messageChange(null))
    }, 5000)
  }

  const removeBlog = (id) => {

    dispatch(eraseBlog(id))
    dispatch(messageChange(`Blog with id: ${id} was removed!`))
    setTimeout(() => {
      dispatch(messageChange(null))
    }, 5000)
  
  }
  
  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(loginUser(user))

    } catch (exception) {
      dispatch(messageChange("Wrong username or password!"))
      setTimeout(() => {
        dispatch(messageChange(null))
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(loginUser(null))
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm handleSubmit={handleLogin}  />
    </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    
      <div className='container'>
      <Notification message={message} />
      <hr/>
      <i><b>{user.username} is logged in </b></i>
      <hr/>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link>
            <Button onClick={handleLogOut}>Log out</Button>
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        <hr/>
        <Routes>
          <Route path="/" element={<Blogs user={user} blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} addBlog={addBlog} blogFormRef={blogFormRef} />}></Route>
          <Route path="/users" element={<Users users={users}/>}></Route>
          <Route path="/users/:id" element={<User users={users} />}></Route>
          <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} updateBlog={likeBlog} addComment={addComment} />}></Route>
        </Routes>
      </Router>
      </div>
   
  )
}

export default App