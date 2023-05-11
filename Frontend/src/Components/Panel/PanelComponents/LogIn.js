import {axiosReq} from '../../../Moduls/axiosReq.js';
import React, {useState, useEffect} from 'react';


export default function LogIn({setPanelState, setUserConfig}){
    const [Login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div style={style.panel} class='panel'>
            <h3>Login</h3>
            <input value={Login} onChange={ e=> setLogin(e.target.value) } className="forminput" type='text'></input>

            <h3>Password</h3>
            <input value={password} onChange={ e=> setPassword(e.target.value) } className="forminput" type='password'></input>
            <input onClick={()=>{loginReq( Login, password )}} className="forminput" style={style.cursorPpointer} type='submit' value='Вход'></input>
            <a onClick={ ()=>setPanelState('SignUp') } style={style.cursorPpointer}>Забыли пароль?</a>
        </div>
    )
    function loginReq(nickname, password){
        
        axiosReq.post('/api/login', {
            "nickname":nickname,
            "password":password
          })
        .then(response => {
            if(!response.data?.error){
                setPanelState('');
                localStorage.setItem('Authorization', response?.data.body?.tokin);
                setUserConfig({user_id:response.data?.body.user_id, nickname: nickname})
                console.log(response.data)
            }
        })
    }
}


const style = {
    panel:{
        height:'auto',
    },
    cursorPpointer:{
        cursor: 'pointer',
        userSelect: 'none',
    }
}