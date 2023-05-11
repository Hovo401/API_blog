
function PostUpdate({ setPanelState }) {
    return (
        <div style={style.panel} class='panel'>
            <h3>Update</h3>
            <div id='form'>
                <div className='Media' > 
                    <div className='slide' >
                        <div className='formMedia' style={style.media}>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTjeJUaD3MswsasRaok9NP4VI9a6sWzTksQ&usqp=CAU'></img>
                    </div>

                    </div>
                </div>
                <input className='' type="file"></input>
                <br /><br />
                <textarea ></textarea>
                <div class='buttonDiv'>
                    <input className='formButton' type='submit'></input>
                </div>
            </div>
        </div>
    )
}
export default PostUpdate;

const style = {
    panel: {
        height: 'auto',
        width:'80%',
        
    },
    cursorPpointer: {
        cursor: 'pointer',
        userSelect: 'none',
    },
    media:{
        height: '150px'
    }
}