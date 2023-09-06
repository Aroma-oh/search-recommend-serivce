import Search from 'containers/Search';
import 'styles/index.css';
import 'styles/global.css';

function App() {
    // instance.get('/sick?q=감염').then((res) => console.info('data', res.data))

    return (
        <div className='App'>
            <Search />
        </div>
    );
}

export default App;
