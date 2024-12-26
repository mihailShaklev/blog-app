import { useState } from 'react'
import { Form, Button} from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({     
        title: newTitle,
        author: newAuthor,
        url: newUrl           
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className='container'>
      <h2>Create new Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            data-testid='title'
            id="title"
            type='text'
            name='title'
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            data-testid='author'
            id="author"
            type='text'
            name='author'
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            data-testid='url'
            id="url"
            type='text'
            name='url'
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </Form.Group>
        <Button variant="warning" id="create" type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm