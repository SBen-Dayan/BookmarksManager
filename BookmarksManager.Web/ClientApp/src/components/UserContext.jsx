import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export default function UserContextComponent({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newUser, setIsNewUser]  = useState(false);

    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/api/account/getCurrentUser');
            setUser(data);
            setIsLoading(false);
        })();
    }, [])

    const valueObj = {
        isLoading, 
        user, 
        setUser, 
        newUser,
        isNewUser : () => {
            setIsNewUser(true);
        }
    }

    return <UserContext.Provider value={valueObj}>
        {children}
    </UserContext.Provider>
}

export function useUser() { return useContext(UserContext) }

