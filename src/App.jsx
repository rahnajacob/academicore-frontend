// src/App.jsx
import { useState, createContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignInForm from './components/SignInForm/SignInForm'
import SignUpForm from './components/SignUpForm/SignUpForm'
import NavBar from './components/NavBar/NavBar'
import * as authService from './services/authService'
import CoursesList from './components/CoursesList/CoursesList'
import * as courseService from './services/courseService'
import CourseDetails from './components/CourseDetails/CourseDetails'
import CourseForm from './components/CourseForm/CourseForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const AuthedUserContext = createContext(null)

const App = () => {

  const [user, setUser] = useState(authService.getUser())
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const fetchAllCourses = async () => {
    const allCourses = await courseService.index()
    setCourses(allCourses)
    console.log("app jsx courses index", allCourses)
  }

  useEffect(() => {
    if (user) {
      fetchAllCourses()
    }
  }, [user])

  const handleAddCourse = async (formData) => {
    try {
      const newCourse = await courseService.create(formData)
      if (!newCourse) {
        console.error("Failed to create course.");
        return;
      }
      console.log('res create form in app.jsx', newCourse)
      setCourses((prevCourses) => [...prevCourses, newCourse])
      //setCourses([newCourse, ...courses])
    } catch (err) {
      console.error("Error creating course in app.jsx", err);
    }

    navigate('/courses/')
  }

  const handleDeleteCourse = async (courseId) => {
    const deletedCourse = await courseService.deleteCourse(courseId)
    console.log(deletedCourse)
    await fetchAllCourses()
    navigate('/courses/')
  }

  const handleUpdateCourse = async (courseId, formData) => {
    const updatedCourse = await courseService.update(courseId, formData)
    console.log('updated course:', updatedCourse)
    navigate(`/courses/${courseId}`)
  }


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        {user ? (
          <>
            <Container>
              <Row>
                <Routes>
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="/courses/" element={<CoursesList user={user} courses={courses} />} />
                  <Route path="/courses/:courseId" element={<CourseDetails user={user} courses={courses} handleDeleteCourse={handleDeleteCourse} />} />
                  <Route path="/courses/new" element={<CourseForm handleAddCourse={handleAddCourse} />} />
                  <Route path="/courses/:courseId/edit" element={<CourseForm handleUpdateCourse={handleUpdateCourse} />} />
                </Routes>
              </Row>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <Row>
                <Routes>
                  <Route path="/" element={<Landing user={user} />} />
                  <Route path="/auth/sign-in/" element={<SignInForm setUser={setUser} />} />
                  <Route path="/auth/sign-up/teacher" element={<SignUpForm setUser={setUser} />} />
                </Routes>
              </Row>
              {/* url change here */}
            </Container>
          </>
        )}

      </AuthedUserContext.Provider >
    </>
  )
}

export default App