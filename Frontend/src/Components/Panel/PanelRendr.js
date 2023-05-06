import LogIn from './PanelComponents/LogIn';
import SignUp from './PanelComponents/SignUp';

function panelRenderSwitch({ rendringName, setPanelState }) {
    switch (rendringName) {
        case 'LogIn':
            return (
                <LogIn setPanelState={setPanelState} />
            )
            break;
        case 'SignUp':
            return (
                <SignUp setPanelState={setPanelState} />
            )
            break;
        default:
            return (<></>)
    }
}
function closePanel(setPanelState, e) {
    if (e.target.className.includes('closeWindow')) {
        setPanelState(null);
    }
}

function PanelRender({ rendringName, setPanelState }) {
    if (rendringName) {
        return (
            <div onClick={(e) => closePanel(setPanelState, e)} id='window' className='closeWindow'>
                {panelRenderSwitch({ rendringName, setPanelState })}
            </div>
        )
    }
    return <></>
}
export default PanelRender;