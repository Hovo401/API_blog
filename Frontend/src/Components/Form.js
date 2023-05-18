import { axiosReq } from '../Moduls/axiosReq.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../Moduls/axiosReq.js';
import form from '../Style/form.css'


function Form({ getPostStart, setGetPostStart }) {
    const [textarea, setTextarea] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    return (
        <div id='form' style={form}>
            <div className='Media'>
                <div className='slide'>
                    {/* <div className='formMedia'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTjeJUaD3MswsasRaok9NP4VI9a6sWzTksQ&usqp=CAU'></img>
                    </div> */}

                </div>
            </div>
            <input className='' onChange={handleFileChange} type="file"></input>
            <br /><br />
            <textarea value={textarea} onChange={e => setTextarea(e.target.value)}></textarea>
            <div onClick={() => { loginReq() }} class='buttonDiv'>
                <input className='formButton' type='submit'></input>
            </div>
        </div>
    )
    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
      }
    function loginReq() {
        const formData = new FormData();
        formData.append('file', selectedFile); // Добавление выбранного файла

        const jsonData = JSON.stringify( {
            message: textarea,
          });
          
        formData.append('data', jsonData);

        axiosReq.post('api/createPost',formData,{
        headers: {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'multipart/form-data' // Используйте 'multipart/form-data' для отправки файлов
            }
        }).then((response) => {
                setTextarea('')
                setGetPostStart(getPostStart);
        })
    }
}
export default Form
