import post_list from '../../Style/post_list.css';
import React, { useState, useEffect } from 'react';
import Post from './Post.js';
import { axiosReq } from '../../Moduls/axiosReq.js';
import Form from '../Form.js';

function List({ setPanelState, userConfig }) {

  const [posts, setPosts] = useState([]);
  const [getPostStart, setGetPostStart] = useState(0);

  // useEffect(() => {
    axiosReq.get(`/api/getPosts?start=${getPostStart}&max=20`)
      .then(response => {
        setPosts(response.data?.body?.posts);
      })
  // }, []);

  const handleDelete = (postId) => {
    axiosReq
      .delete('/api/post/' + postId, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      })
      .then((response) => {
        setPosts(posts.filter((post) => post.post_id !== postId));
      });
  };

  return (
    <>    
      <Form setGetPostStart={setGetPostStart} getPostStart={getPostStart} setPanelState={setPanelState} />
      <div style={post_list} id='list'>
        {posts?.map(post => (
          <Post handleDelete={handleDelete} userConfig={userConfig} post_id={post.post_id} nickname={post.nickname} message={post.message} media_message={post.media_message} setPanelState={setPanelState} />
        ))}
      </div>
    </>
  )
}
export default List;