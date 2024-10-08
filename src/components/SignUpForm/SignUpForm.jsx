import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService"

const SignUpForm = ({ setUser }) => {
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirmation: '',
        is_teacher: false,
        teach_fname: '',
        teach_lname: ''
        //! do I need to add is_staff or teach_fname or whatever here? 
    })

    console.log(formData)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
        setMessage('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await authService.signup(formData) 
            console.log("user is:", user)
            console.log("acc token is", user.access)
            console.log("ref token is", user.refresh)
            localStorage.setItem('token', user.access)
            localStorage.setItem('refresh', user.refresh)
            setUser(user)
            navigate('/') 
        } catch (error) {
            console.log(error)
            setMessage(error.message)
        }
    }


    //     e.preventDefault()
    //     try {
    //         const { user, token } = await authService.signup(formData)
    //         console.log("user is:", user)
    //         setUser(user) 
    //         console.log("token is", token)
    //         localStorage.setItem('token', token) 
    //         navigate('/') 
    //     } catch (error) {
    //         console.log(error)
    //         setMessage(error.message)
    //     }
    // }

    return (
        <main className='form-page'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        value={formData.password_confirmation}
                        name="password_confirmation"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="is_teacher">Teacher:</label>
                    <input
                        type="checkbox"
                        id="is_teacher"
                        checked={formData.is_teacher}
                        name="is_teacher"
                        onChange={handleChange} />
                </div>
                {formData.is_teacher && (
                    <div>
                        <label htmlFor="teach_fname">Teacher First Name:</label>
                        <input
                            type="text"
                            id="teach_fname"
                            value={formData.teach_fname}
                            name="teach_fname"
                            onChange={handleChange}
                            required />
                    </div>
                )}
                {formData.is_teacher && (
                    <div>
                        <label htmlFor="teach_lname">Teacher Last Name:</label>
                        <input
                            type="text"
                            id="teach_lname"
                            value={formData.teach_lname}
                            name="teach_lname"
                            onChange={handleChange}
                            required />
                    </div>
                )}
                {message && <p className='message'>{message}</p>}
                <div>
                    <button disabled={formData.password !== formData.password_confirmation}>Sign Up</button>
                </div>
            </form>
        </main>
    )
}

export default SignUpForm