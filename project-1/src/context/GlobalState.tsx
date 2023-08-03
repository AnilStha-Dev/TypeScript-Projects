
import  { useState } from 'react'
import GlobalContext from './GlobalContext'

interface LoginInterface {
    isLoggedIn: boolean;
    jwt: string;
  }

const GlobalState = (props:any) => {
   
   
    const [loginState, setIsLoginState] = useState<LoginInterface>({
        isLoggedIn: false,
        jwt: "",
      });
  return (
    <>
    <GlobalContext.Provider value={{loginState}}>
    {props.children}

    </GlobalContext.Provider>
    </>
  )
}

export default GlobalState