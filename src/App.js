
import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import CustomRoutes from 'pages/Routes';
import AuthContextProvider from 'context/AuthContext';
function App() {
  // console.log(process.env.REACT_APP_FIREBASE_authDomain)
  return (
    <AuthContextProvider>

      <CustomRoutes />

    </AuthContextProvider>


  );
}

export default App;
