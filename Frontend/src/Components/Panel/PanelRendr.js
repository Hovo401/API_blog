import LogIn from './PanelComponents/LogIn';
import SignUp from './PanelComponents/SignUp';
import PostUpdate  from './PanelComponents/PostUpdate';

function panelRenderSwitch({ rendringName, setPanelState, setUserConfig}) {
    switch (rendringName) {
        case 'LogIn':
            return (
                <LogIn setUserConfig={setUserConfig} setPanelState={setPanelState} />
            );
        case 'SignUp':
            return (
                <SignUp setUserConfig={setUserConfig} setPanelState={setPanelState} />
            );

        default:
            return (<></>)
    }
}
function closePanel(setPanelState, e) {
    if (e.target.className.includes('closeWindow')) {
        setPanelState(null);
    }
}

function PanelRender({ rendringName, setPanelState, setUserConfig }) {
    if (rendringName) {
        return (
            <div onMouseDown={(e) => {closePanel(setPanelState, e)}} id='window' className='closeWindow'>
                {panelRenderSwitch({ rendringName, setPanelState, setUserConfig })}
            </div>
        )
    }
    return <></>
}
export default PanelRender;