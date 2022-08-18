
import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import CustomRoutes from 'pages/Routes';
import AuthContextProvider from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  // console.log(process.env.REACT_APP_FIREBASE_authDomain)
  return (
    <>
    
    <AuthContextProvider>

      <CustomRoutes />
      

    </AuthContextProvider>
    <ToastContainer/>
    </>

  );
}

export default App;
