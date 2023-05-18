import React, { useState } from 'react';
import PostUpdate from '../Panel/PanelComponents/PostUpdate';
import { baseURL, axiosReq } from '../../Moduls/axiosReq';

function Post({ post_id, nickname, message, media_message, userConfig, handleDelete }) {
    const [panelState, setPanelState] = useState(null);


    return (
        <div class='post'>
            {
                panelState ? <div onMouseDown={(e) => {
                    if (e.target.className.includes('closeWindow')) {
                        setPanelState(null);
                    }
                }} id='window' className='closeWindow'>
                    <PostUpdate post_id={post_id} panelState={panelState} nickname={nickname} message={message} media_message={media_message} userConfig setPanelState={setPanelState} />
                </div> : ''
            }

            <p>автор публикации - {nickname}</p>
            <br />
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
            <p>{message}</p>
            {
                nickname == userConfig.nickname ?
                    <>
                        <button class='bootonUploadPost' onClick={() => { setPanelState('true') }}>Update</button> 
                        <button class='bootonDeletePost' onClick={() => { handleDelete(post_id) }}>Delete</button> 
                    </>: ''
            }

        </div>

    )

    // function Delete(post_id){
    //     axiosReq.delete('api/post/'+post_id,{
    //         headers: {
    //             'Authorization': localStorage.getItem('Authorization')
    //             }
    //     }).then((response) => {
    //     })
    // }
}
export default Post;

const style = {

}