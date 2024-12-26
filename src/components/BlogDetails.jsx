import { useParams } from "react-router-dom"
import { Table, Button} from "react-bootstrap"
import CommentForm from "./CommentForm"

const BlogDetails = ({blogs, updateBlog, addComment}) => {

    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    if (!blog){
        return null
    }

    const changeBlog = () => {

        const changedBlog = { ...blog, likes: (blog.likes + 1) }
        updateBlog(changedBlog.id, changedBlog)
    
    }

    return (
        <div>
        <Table striped>
            <tbody>
                <tr>
                    <td><h2>{blog.title} {blog.author}</h2></td>
                </tr>
                <tr>
                    <td>{blog.url}</td>
                </tr>
                <tr>
                    <td>likes <span data-testid="likes">{blog.likes}</span> <Button variant="danger" id="like-button" onClick={changeBlog}>like</Button></td>
                </tr>
                <tr>
                    <td>added by {blog.user.name}</td>
                </tr>
                </tbody>         
        </Table>
        <h2> Comments </h2>
        <CommentForm blog={blog} addComment={addComment}/>
        <hr/>
        <Table striped>
            <tbody>
                {blog.comments.map( comment =>
                    <tr key={blog.comments.indexOf(comment)}><td>{comment}</td></tr>
                )}
            </tbody>
        </Table>
        </div>
    )

}

export default BlogDetails