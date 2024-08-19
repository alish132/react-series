import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({
    children, 
    authentication = true
}){
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        // => When user is not loggedIn and want to access protected route, then he will simply navigate to /login.
        if(authentication && authStatus !== authentication){
            navigate('/login')
        // => when user is loggedIn and want to access public route, then he will navigate to home page. For eaxmple if is loggedIn and try to access /login route then he will navigate to home page.
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    
    return loader ? <h1>Loading....</h1> : <>{children}</>
}