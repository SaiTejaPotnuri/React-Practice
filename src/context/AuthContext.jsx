import React,{useState,useEffect,createContext} from 'react'

/**useContext will be used when you sharing same information to the different children or if children triggered some action and
  something should happend any of its parents then we can use useContext
  * when we parent prop only using child not any other chid then we use props
 */

  const AuthContext = createContext({
    isLoggedIn: localStorage.getItem("token") ? true : false,
    loginHandler: () => {},
    logoutHandler: () => {}
  });
  
  export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const loginHandler = (user) => {
      console.log("user details", user);
      setIsLoggedIn(true);
      localStorage.setItem("token", user);
    };
  
    const logoutHandler = () => {
      console.log("logout");
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    };
  
    const contextValue = {
      isLoggedIn,
      loginHandler,
      logoutHandler
    };
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export default AuthContext;