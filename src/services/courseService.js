import CourseForm from "../components/CourseForm/CourseForm"

const BASE_URL = `${import.meta.env.VITE_DJANGO_BACKEND_URL}/courses/`

export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log('index res', res)
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

export const show = async (courseId) => {
    try {
        const res = await fetch(`${BASE_URL}${courseId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (err) {
        console.log('courseService show error: ', err)
    }
}

export const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json()
    } catch (err) {
        console.log('courseService create method err', err)
    }
}

export const deleteCourse = async (courseId) => {
    try {
        const res = await fetch(`${BASE_URL}${courseId}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (res.ok) {
            if (res.status === 204) {
                return { message: "Course deleted successfully" }
            } else {
                return res.json();
            }
        }
    } catch (error) {
        console.log('courseService delete method err', error)
    }
}

export const update = async(courseId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}${courseId}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json()
    } catch (error) {
        console.log('courseService update error:', error)
    }
}
