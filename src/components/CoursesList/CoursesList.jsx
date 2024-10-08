import { Link } from "react-router-dom"
import { useEffect } from "react"

const CoursesList = ({courses}) => {

    // useEffect(() => {
    //     // Log the courses array to check for any unexpected structure or duplicates
    //     console.log("Courses List:", courses);
    // }, [courses]);

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