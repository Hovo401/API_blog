import form from '../Style/form.css'
function Form (){
    return (
        <div id='form' style={form}>
            <div className='Media'>
                <div className='slide'>
                    {/* <div className='formMedia'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTjeJUaD3MswsasRaok9NP4VI9a6sWzTksQ&usqp=CAU'></img>
                    </div> */}
                    
                </div>
            </div>
            <input className='' type="file"></input>
            <br/><br/>
            <textarea ></textarea>
            <div class='buttonDiv'>
                <input className='formButton' type='submit'></input>
            </div>            
        </div>
    )
}
export default Form
