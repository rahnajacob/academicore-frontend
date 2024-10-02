import { Link } from 'react-router-dom'

const NavBar = ({ user }) => {
    return (
        <nav>
            <ul>
                {user ?
                    <>
                        <li><Link to="">Courses</Link></li>
                        <li><Link to="">Sign Out</Link></li>
                    </> :
                    <>
                        <li><Link to="">Sign In</Link></li>
                        <li><Link to="">Sign Up</Link></li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default NavBar