import { BrowserRouter,Routes, Route } from "react-router-dom";
import ContextEx from "./pages/ContextEx"
import Login from "./pages/Login";
import { ToastContainer} from 'react-toastify';
import Home from "./pages/Home";
import LectureAdd from "./pages/LectureAdd";
import SecureRoute from "./Routes/SecureRoute";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* a path may have same name so in that case we can wrap,
          we can also exclude / and only write " "
           */}
           
           <Route path="" element={<SecureRoute/>}>
          <Route path="/lectures">
          <Route path="" element={<Home />} />
          <Route path="add" element={<LectureAdd />} />
          </Route>
          </Route>


          <Route path="/context" element={<ContextEx />} />
         
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App
