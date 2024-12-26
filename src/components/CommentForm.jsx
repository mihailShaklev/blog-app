import { useState } from 'react'
import { Form, Button} from 'react-bootstrap'

const CommentForm = ({blog, addComment}) => {
    const [newComment, setNewComment] = useState('')

    const createComment = (event) => {
        event.preventDefault()
        const changedBlog = {...blog, comments: (blog.comments.concat(newComment))}
        addComment(changedBlog.id, changedBlog)
        setNewComment('')
    }

    return (
        <Form onSubmit={createComment}>
            <Form.Group>
                <Form.Label>Comment:</Form.Label>
                <Form.Control 
                    id="comment"
                    type="text"
                    title="comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Button variant="primary" id="send" type="submit">Send</Button>
            </Form.Group>
        </Form>
    )



}

export default CommentForm