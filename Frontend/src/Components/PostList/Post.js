import React, { useState, useEffect } from 'react';



function Post({ post_id, nickname, message, media_message, setPanelState }) {



    return (
        <div class='post'>
            <p>автор публикации - {nickname}</p>
            <br />
            {/* <div className='Media'>
                <div className='slide'>

                    {Array([...media_message])?.map(media => (
                        <div className='formMedia'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTjeJUaD3MswsasRaok9NP4VI9a6sWzTksQ&usqp=CAU'></img>
                        </div>
                    ))}

                </div>
            </div> */}
            <p>{message}</p>
            <button onClick={()=>{  setPanelState('PostUpdate')}}>Update</button>
        </div>

    )
}
export default Post;

const style = {

}