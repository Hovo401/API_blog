
import React, { useState } from 'react';
import { baseURL, axiosReq } from '../../../Moduls/axiosReq';



function PostUpdate({ post_id, nickname, message, media_message, userConfig, setPanelState, panelState }) {
    const [textarea, setTextarea] = useState(message);
    const [selectedFile, setSelectedFile] = useState(null);
    return (
        <div style={style.panel} class='panel'>
         <div id='form' >
         {
                media_message.length > 1 ?
                    <div className='Media'>
                        <div className='slide'>

                            {Array([...media_message])?.map(media => (
                                <div className='formMedia'>
                                    <img src={baseURL + media_message}></img>
                                </div>
                            ))}

                        </div>
                    </div> : ''
            }
            <input className='' onChange={handleFileChange} type="file"></input>
            <br /><br />
            <textarea value={textarea} onChange={e => setTextarea(e.target.value)}></textarea>
            <div onClick={() => { updatePost()}} class='buttonDiv'>
                <input className='formButton' type='submit'></input>
            </div>
        </div>
    </div>
    )
    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
      }

      function updatePost() {
        const formData = new FormData();
        formData.append('file', selectedFile); // Добавление выбранного файла

        const jsonData = JSON.stringify( {
            message: textarea,
          });
          
        formData.append('data', jsonData);

        axiosReq.put('api/updatePost/'+post_id,formData,{
        headers: {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'multipart/form-data' // Используйте 'multipart/form-data' для отправки файлов
            }
        }).then((response) => {
            setPanelState('')
        })
    }
}
export default PostUpdate;

const style = {
    panel: {
        height: 'auto',
        width:'80%',
        
    },
    cursorPpointer: {
        cursor: 'pointer',
        userSelect: 'none',
    },
    media:{
        height: '150px'
    }
}