import React, {useState} from 'react';
import css from '../Style/style.css';
import PanelRender from './Panel/PanelRendr.js';

function Header(){ 
    const [panelState, setPanelState] = useState(null);
    return(
        <>
        <PanelRender rendringName={panelState} setPanelState={setPanelState}/>
        <header style={css}>
                <div style ={style.leftBlock} className='hedad_left textVerticalCentre'>
                    <p className='textVerticalCentre'>userName</p>
                </div>
                <div style ={style.rightBlock}>

                    <button onClick={ ()=>{ setPanelState('SignUp') } } 
                    class="head_button">Sign Up</button>

                    <button onClick={ ()=>{ setPanelState('LogIn') } } 
                    class="head_button">Log In</button>

                </div>
        </header>
        </>
    )
}
export default Header;

const style = {
    leftBlock:{
        position:'absolute',
        left:'20px',
        height:'100%',
        color:'white',
    },
    rightBlock:{
        position:'absolute',
        right:'0px',
        height:'100%',
    },
}