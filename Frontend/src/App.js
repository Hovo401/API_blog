import Header from './Components/Header.js';
import Form from './Components/Form.js';
import PostList from './Components/PostList/PostList.js';

function App() {
    return (
        <>
            <Header/>
            <main>
                <Form/>
                <PostList/>
            </main>
        </>
    )
}
export default App;