import Togglable from "./Toggable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Blogs = ({blogs, addBlog, blogFormRef}) => {
    
    return(
        <div>
            <Togglable buttonLabel='New Blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            <hr/>
            <h2>Blogs</h2>
            <Table striped>
                <tbody>
                    {blogs.map(blog =>
                    <tr key={blog.id}>
                        <td>
                            <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                        <td>
                            {blog.user.username}
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )

}

export default Blogs