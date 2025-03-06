import { HashRouter, Route, Routes } from 'react-router-dom'
import ResetPasswordForm from "./components/ResetPasswordForm";


function App() {

  return (
    <>
    <HashRouter>

        <Routes>
       
            <Route exact path="/*" element={ <ResetPasswordForm />} />
          
        </Routes>
     
    </HashRouter>
    </>
  )
}

export default App