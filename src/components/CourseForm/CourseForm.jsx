import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as courseService from '../../services/courseService'
import './CourseForm.css'

const CourseForm = ({ handleAddCourse, handleUpdateCourse }) => {
    const [formData, setFormData] = useState({
        'title': '',
        'code': '',
    })

    const { courseId } = useParams()

    useEffect(() => {
        const fetchCourse = async () => {
            const singleCourse = await courseService.show(courseId)
            setFormData(singleCourse)
        }
        if (courseId) {
            fetchCourse()
        }
    }, [courseId])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (courseId) {
            handleUpdateCourse(courseId, formData)
        } else {
            handleAddCourse(formData)
        }
    }

    return (
        <main>
            <h1>{courseId ? 'Update Course' : 'Create course'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange} />
                <label htmlFor="code">Code:</label>
                <input
                    required
                    type="text"
                    name="code"
                    id="code"
                    value={formData.code}
                    onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default CourseForm