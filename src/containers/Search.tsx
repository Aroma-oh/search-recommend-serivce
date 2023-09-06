import styled from 'styled-components';
import SearchBar from 'components/SearchBar';
import {useInput} from 'hooks/useInput';

const Search = () => {
    const [value, changeValue] = useInput('');

    return (
        <Box>
            <SearchBar
                label='search'
                placeholder='질환명을 입력해주세요'
                value={value}
                onChange={changeValue}
            />
        </Box>
    );
};

export default Search;

const Box = styled.section`
    width: 100vw;
    height: 100vh;

    background-color: var(--bg-color);
`;
