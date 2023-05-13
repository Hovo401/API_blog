import React, { useState } from 'react';
import Header from './Components/Header.js';
import Form from './Components/Form.js';
import PostList from './Components/PostList/PostList.js';
import PanelRender from './Components/Panel/PanelRendr.js';

import {baseURL} from './Moduls/axiosReq.js';
import axios from 'axios'



function App() {
    const [panelState, setPanelState] = useState(null);
    const [userConfig, setUserConfig] = useState({user_id: -1, nickname:'Unauthorized',newOpen:true});

    if(userConfig.newOpen){
        axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL+'api/checkTokin',
            headers: { 
                Authorization:localStorage.getItem('Authorization')
            }
        })
        .then((e)=>{
            if(!e?.data?.error){
                setUserConfig(e?.data?.body.user )
            }
        })
    }

    return (
        <>  
            <PanelRender setUserConfig={setUserConfig}  rendringName={panelState} setPanelState={setPanelState} />
            <Header userConfig={userConfig} panelState={panelState} setPanelState={setPanelState}/>
            <main>
                <Form setPanelState={setPanelState}/>
                <PostList userConfig={userConfig} setPanelState={setPanelState}/>
                <></>
            </main>
        </>
    )
}

export default App;