import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"

const User = ({users}) => {

    const id = useParams().id
    const user = users.find(user => user.id === id)

    if (!user){
        return null
    }

    return (
        <div className="container">
            <h1>{user.name}</h1>
            <h2>Added blogs</h2>
            <Table striped>
                <tbody>
                {user.blogs.map(blog =>
                    <tr key={blog.id}>
                        <td>{blog.title}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    )

}

export default User