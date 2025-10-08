import { useState, useEffect} from 'react'
import AuthContext from './AuthContext';

export default function AuthProvider( { children } ) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser({role: payload.role});
        }
    }, []);

    return (
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}