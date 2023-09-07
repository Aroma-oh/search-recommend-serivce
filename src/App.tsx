import 'styles/index.css';
import 'styles/global.css';
import Search from 'containers/Search';
import {RecoilRoot} from 'recoil';

function App() {
    return (
        <RecoilRoot>
            <Search />
        </RecoilRoot>
    );
}

export default App;
