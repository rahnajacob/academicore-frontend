import { Link } from "react-router-dom"
import { useEffect } from "react"
import './CoursesList.css'

const CoursesList = ({courses}) => {
    return(
        <main>
            {courses.map((course, index) =>{
                console.log(`Rendering course with id: ${course.id}`);
                return (
                <Link key={`${course.id}-${index}`} to={`/courses/${course.id}/`}>
                    <h3>{course.code}</h3>
                </Link>
                )
            })}
        </main>
    )
}

export default CoursesList