import { createContext, useState } from 'react'

let UserContext = new createContext();

export const UserProvider = ({children}) => {
    let [UserName , setUserName] = useState('')
    let [title , setTitle] = useState('')
    let [count , setCount] = useState(0)
    return(
        <UserContext.Provider value={{UserName,setUserName , title , setTitle ,count , setCount}} >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext