import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext)
    return (
        <nav>
            <ul>
                {user ?
                    <>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/courses/">Courses</Link></li>
                        <li><Link to="/courses/new">Add Course</Link></li>
                        <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
                    </> :
                    <>
                        <li><Link to="/auth/sign-in/">Sign In</Link></li>
                        <li><Link to="/auth/sign-up/teacher/">Sign Up</Link></li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default NavBar