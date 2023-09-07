import styled from 'styled-components';
import SearchBar from 'components/SearchBar';
import SearchSuggestBox from 'components/SearchSuggestBox';

import {useRecoilValue} from 'recoil';
import {searchKeywordState, apiState} from 'store/atom';

import {useUpdateKeyword} from 'hooks/useUpdateKeyword';
import {useInput} from 'hooks/useInput';
import {useCacheStore} from 'hooks/useCacheStore';
import {useEffect, useState} from 'react';
import {useListSelect} from 'hooks/useSelectList';

const Search = () => {
    const [value, changeValue] = useInput('');
    const isEmptyInput = value.length === 0;

    const searchKeyword = useRecoilValue(searchKeywordState);
    const dataState = useRecoilValue(apiState);

    const updateKeyword = useUpdateKeyword();
    const caching = useCacheStore();

    useEffect(() => {
        updateKeyword(value);
    }, [value, updateKeyword]);

    useEffect(() => {
        if (searchKeyword) caching(searchKeyword);
    }, [searchKeyword, caching]);

    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false); // focus 분리

    const focus = () => {
        setIsSearchBarFocused(true);
    };

    const {selectListIdx, updateSelectIdx, selectRef} = useListSelect(isEmptyInput);

    return (
        <Box>
            <SearchBar
                placeholder='질환명을 입력해주세요'
                value={value}
                changeValue={changeValue}
                focus={focus}
                updateSelectIdx={updateSelectIdx}
            />
            {isSearchBarFocused && (
                <SearchSuggestBox
                    dataState={dataState}
                    isEmptyInput={isEmptyInput}
                    selectRef={selectRef}
                    selectListIdx={selectListIdx}
                    value={value}
                />
            )}
        </Box>
    );
};

export default Search;

const Box = styled.section`
    width: 100vw;
    height: 100vh;

    background-color: var(--bg-main);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
