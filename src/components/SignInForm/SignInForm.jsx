import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as authService from '../../services/authService'
import './SignInForm.css'

const SignInForm = (props) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const updateMessage = (msg) => {
        setMessage(msg)
    }

    const handleChange = (e) => {
        updateMessage('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Signing in with:', formData);
        try {
            const { user, token } = await authService.signin(formData)
            console.log('signinform:', user)
            console.log("signin token is:", token)
            props.setUser(user)
            navigate('/')
        } catch (err) {
            updateMessage(err.message)
        }
    }

    // const { username, password, password_confirmation } = formData
    // const isFormInvalid = () => {
    //     return !(username, password, password_confirmation)
    // }

    return (
        <main className='form-page'>
            <h1>Sign In</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                {message && <p className='message'>{message}</p>}
                <div>
                    <button>Sign In</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default SignInForm