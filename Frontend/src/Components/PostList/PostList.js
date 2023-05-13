import post_list from '../../Style/post_list.css';
import React, {useState, useEffect} from 'react';
import Post from './Post.js';
import {axiosReq} from '../../Moduls/axiosReq.js';


 function List({setPanelState, userConfig}){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      axiosReq.get( '/api/getPosts?start=0&max=20')
        .then(response => {
          setPosts(response.data?.body?.posts);
          console.log(response.data?.body?.posts)
        })
    }, []);
    
    return (
        <div style={post_list} id='list'>
          {posts?.map(post => (
            <Post userConfig={userConfig} post_id={post.post_id} nickname={post.nickname} message={post.message} media_message={post.media_message} setPanelState={setPanelState} />
          ))}
        </div>
      )
}
export default List;