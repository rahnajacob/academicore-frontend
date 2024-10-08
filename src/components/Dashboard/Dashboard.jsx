import { AuthedUserContext } from "../../App"
import { useContext } from "react"
import './Dashboard.css'

const Dashboard = ({user}) => {
    return(
        <main>
            <h1>academicore logged in as {user?.username || 'Guest'}</h1>
        </main>
    )
}

export default Dashboard