import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import AppRouting from "./routings/AppRouting"

function App() {
  return (
    <AuthProvider>
      <div className="main-container">
        <RouterProvider router={AppRouting} />
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
