import {axiosReq} from '../Moduls/axiosReq.js';
import React, {useState, useEffect} from 'react';
import form from '../Style/form.css'

function Form ({setPanelState}){
    const [textarea, setTextarea] = useState('');
    // const [password, setPassword] = useState('');

    return (
        <div id='form' style={form}>
            <div className='Media'>
                <div className='slide'>
                    {/* <div className='formMedia'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTjeJUaD3MswsasRaok9NP4VI9a6sWzTksQ&usqp=CAU'></img>
                    </div> */}
                    
                </div>
            </div>
            <input className='' type="file"></input>
            <br/><br/>
            <textarea value={textarea} onChange={ e=> setTextarea(e.target.value) }></textarea>
            <div class='buttonDiv'>
                <input className='formButton' type='submit'></input>
            </div>            
        </div>
    )
    function loginReq(nickname, password){
        axiosReq.post('/api/login', {
            "nickname": nickname,
            "password": password
          })
        .then(response => {
            if(!response.data?.error){
                setPanelState('')
            }
          console.log(response.data?.body)
        })
    }
}
export default Form
