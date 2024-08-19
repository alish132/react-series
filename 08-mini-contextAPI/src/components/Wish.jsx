import React, {useContext} from 'react';
import UserContext from '../context/UserContext';

export default function Wish(){
    const {user} = useContext(UserContext)

    if(!user) return <div>Wait</div>

    return <div>Happy Bithday {user.username} your password is {user.password} </div>
}
