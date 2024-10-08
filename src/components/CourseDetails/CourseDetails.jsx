import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import * as courseService from '../../services/courseService'
import { AuthedUserContext } from "../../App"
import './CourseDetails.css'

const CourseDetails = ({handleDeleteCourse}) => {
    const [course, setCourse] = useState(null)
    const { courseId } = useParams()
    console.log(courseId)
    const user = useContext(AuthedUserContext)
    console.log("course deets user contect", user)

    useEffect(() => {
        const fetchCourse = async () => {
            const singleCourse = await courseService.show(courseId)
            setCourse(singleCourse)
        }
        fetchCourse()
    }, [courseId])



    if (!course) return <main>Loading...</main>

    return (
        <main>
            <h2>{course.code}</h2>
            <h3>{course.title}</h3>
            <h3>Instructor: {course.owner}</h3>
            {course.owner === user.user_id &&
                <section>
                    <button onClick={() => handleDeleteCourse(courseId)}>Delete Course</button>
                    <Link to={`/courses/${courseId}/edit`}>Update Course</Link>
                </section>
            }
        </main>)
}

export default CourseDetails