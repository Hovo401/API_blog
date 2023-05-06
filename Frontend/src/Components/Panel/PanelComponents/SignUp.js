
function SignUp({setPanelState}){
    return(
        <div style={style.panel} class='panel'>
            <h3>Login</h3>
            <input type='text'></input>
            <h3>Password</h3>
            <input type='password'></input>
            <h3>Password</h3>
            <input type='password'></input>
            <input style={style.cursorPpointer} type='submit' value='Вход'></input>
            <a onClick={ ()=>setPanelState('LogIn') } style={style.cursorPpointer}>Забыли пароль?</a>
        </div>
    )
}
export default SignUp;

const style = {
    panel:{
        height:'auto',
    },
    cursorPpointer:{
        cursor: 'pointer',
        userSelect: 'none',
    }
}