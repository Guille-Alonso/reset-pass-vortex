import { HashRouter, Route, Routes } from 'react-router-dom'
import ResetPasswordForm from "./components/ResetPasswordForm";


function App() {

  return (
    <>
    <HashRouter>

        <Routes>
       
            <Route exact path="/reset-password/:token" element={ <ResetPasswordForm />} />
          
        </Routes>
     
    </HashRouter>
    </>
  )
}

export default App