import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = ({users}) => {

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                    <tr key={user.id}>
                        <td>
                        <Link key={user.id} to={`/users/${user.id}`}>
                            {user.username}
                        </Link>
                        </td>
                        <td>{user.blogs.length}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>      
    )
}

export default Users