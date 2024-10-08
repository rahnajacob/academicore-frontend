const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

export const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    const user = JSON.parse(atob(token.split('.')[1]))
    return user
}

export const signup = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/sign-up/teacher/`, { //url change here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const resBody = await res.json()
        console.log('Response Body:', resBody)
        if (resBody.access && resBody.refresh) {
            localStorage.setItem('token', resBody.access)
            localStorage.setItem('refreshToken', resBody.refresh)
            return resBody //was resBody.user
        } else {
            throw new Error("No access token")
        }
        // if (resBody.error) {
        //     throw new Error("resbody err:", resBody.error)
        // }
    } catch (err) {
        throw new Error(err.message)
    }
}

export const signin = async (userData) => { //was (formData)
    try {
        const res = await fetch(`${BACKEND_URL}/auth/sign-in/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })

        if (!res.ok) {
            const errorBody = await res.json()
            throw new Error(errorBody.error || 'Sign-in failed');
        }

        const resBody = await res.json()
        console.log('Response Body:', resBody)

        if (resBody.error) {
            throw new Error(resBody.error)
        }

        if (resBody.access) {
            localStorage.setItem('token', resBody.access)
            const user = JSON.parse(atob(resBody.access.split('.')[1]))
            console.log('Decoded user:', user);
            return {user, token: resBody.access}
        }
    } catch (err) {
        console.log("error during signin:", err)
        throw err
    }
}

export const signout = () => {
    localStorage.removeItem('token')
    return null
}

export const getToken = () => {
    return localStorage.getItem('token')
  }
  