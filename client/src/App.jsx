
import { Route, Routes, useNavigate } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import AuthProvider, { useAuth } from "./context/AuthContext"


function App() {

  return (
    <>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App