import {axiosReq} from '../../../Moduls/axiosReq.js';
import React, {useState} from 'react';


export default function LogIn({setPanelState, setUserConfig}){
    const [Login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    return(
        <div style={style.panel} class='panel'>
            <h3>Login</h3>
            <input value={Login} onChange={ e=> setLogin(e.target.value) } className="forminput" type='text'></input>

            <h3>Password</h3>
            <input value={password} onChange={ e=> setPassword(e.target.value) } className="forminput" type='password'></input>
            <p>{message}</p>
            <input onClick={()=>{loginReq( Login, password )}} className="forminput" style={style.cursorPpointer} type='submit' value='Вход'></input>
            <a onClick={ ()=>setPanelState('SignUp') } style={style.cursorPpointer}>SignUp</a>
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
                setUserConfig({
                    user_id: response?.data?.body?.user?.user_id || -1, 
                    nickname: response?.data?.body?.user?.nickname || 'Unauthorized'
                });
                console.log(response?.data?.body?.user)
            }else if(response?.data?.error == true){
                setMessage(response?.data?.message)
            }
        }).catch((e)=>{
            setMessage(e?.response?.data?.message)
            console.log(e?.response?.data?.message)
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