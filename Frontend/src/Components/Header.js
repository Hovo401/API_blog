import css from '../Style/style.css';
import {useState, useEffect} from 'react';
import {axiosReq} from '../Moduls/axiosReq.js';

function Header({panelState, setPanelState, userConfig}) {
    

    return (
        <>
            <header style={css}>
                <div style={style.leftBlock} className='hedad_left textVerticalCentre'>
                    <p className='textVerticalCentre'>{userConfig.nickname}</p>
                </div>
                <div style={style.rightBlock}>

                    <button onClick={() => { setPanelState('SignUp') }}
                        class="head_button">Sign Up</button>

                    <button onClick={() => { setPanelState('LogIn') }}
                        class="head_button">Log In</button>


                </div>
            </header>
        </>
    )
}
export default Header;

const style = {
    leftBlock: {
        position: 'absolute',
        left: '20px',
        height: '100%',
        color: 'white',
    },
    rightBlock: {
        position: 'absolute',
        right: '0px',
        height: '100%',
    },
}