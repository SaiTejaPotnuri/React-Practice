import React from "react";
import Invitation from "./components/Invitation";
import Forms from "./components/Forms";
import ProductsDashboard from "./components/ProductsDashboard";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
// import chatbot_imag from './assets/chatbot_img.svg'

function App() {
  const chatbot_imag = "../src/assets/chatbot_img.svg";
  const authCtx = useContext(AuthContext);
  return (
    <AuthProvider>
      <div className="main-container">
        <div>
          <Invitation />
        </div>
        <Forms/>
        <ProductsDashboard />
      </div>
    </AuthProvider>
  );
}

export default App;

 //     {/** here we make use of context , that information can use by entire childrens */}
    //     <Authenticate.Provider value={{ isLoggedIn: authCtx.isLoggedIn, onLogOut : authCtx.logoutHandler }}>
    //       <Forms submitForm={authCtx.loginHandler} />
    //       <ProductsDashboard ></ProductsDashboard>
    //     </Authenticate.Provider>

