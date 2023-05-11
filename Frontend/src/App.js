import React, { useState, useEffect } from 'react';
import Header from './Components/Header.js';
import Form from './Components/Form.js';
import PostList from './Components/PostList/PostList.js';
import PanelRender from './Components/Panel/PanelRendr.js';
import {axiosReq} from './Moduls/axiosReq.js';
import axios from 'axios'

function App() {
    const [panelState, setPanelState] = useState(null);
    const [userConfig, setUserConfig] = useState({user_id: -1, nickname:'Unauthorized'});

    // axiosReq.post({
    //     method: 'post',
    //     url: '/api/checkTokin',
    //     headers:{
    //         Authorization:localStorage.getItem('Authorization')
    //     },
    //   })
    fetch('http://localhost:3001/api/checkTokin',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('Authorization')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
    
}).then((e)=>{
    console.log(e)
})
    

      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/api/checkTokin',
        headers: { 
            Authorization:localStorage.getItem('Authorization')
        }
      };
      
      axios.request(config)
      .then((e)=>{
        
        console.log(e)
      })

    return (
        <>  
            <PanelRender setUserConfig={setUserConfig}  rendringName={panelState} setPanelState={setPanelState} />
            <Header userConfig={userConfig} panelState={panelState} setPanelState={setPanelState}/>
            <main>
                <Form setPanelState={setPanelState}/>
                <PostList setPanelState={setPanelState}/>
            </main>
        </>
    )
}

export default App;