import {useEffect} from 'react';
import styled from 'styled-components';
import SearchBar from 'components/SearchBar';
import SearchSuggestBox from 'components/SearchSuggestBox';

import {useRecoilValue} from 'recoil';
import {searchKeywordState, dataState} from 'store/atom';

import {useUpdateKeyword} from 'hooks/useUpdateKeyword';
import {useInput} from 'hooks/useInput';
import {useCacheStore} from 'hooks/useCacheStore';
import {useListSelect} from 'hooks/useSelectList';
import useSearchHistory from 'hooks/useSearchHistory';

const Search = () => {
    const [value, changeValue, setValue] = useInput('');
    const searchKeyword = useRecoilValue(searchKeywordState);
    const data = useRecoilValue(dataState);

    const updateKeyword = useUpdateKeyword();
    const caching = useCacheStore();

    useEffect(() => {
        updateKeyword(value);
    }, [value, updateKeyword]);

    useEffect(() => {
        if (searchKeyword) caching(searchKeyword);
    }, [searchKeyword, caching]);

    const {searchLog, addSearchLog} = useSearchHistory();

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!value) return;
        setValue('');
        addSearchLog(value);
        alert(`검색: ${value}`);
    };

    const isEmptyInput = !value.length;
    const noSearchLog = !searchLog.length;

    const {selectListIdx, updateSelectIdx, listRef} = useListSelect(isEmptyInput, setValue);

    return (
        <Box>
            <h1> 국내 임상시험 검색 </h1>
            <SearchBar
                submit={submit}
                placeholder='질환명을 입력해주세요'
                value={value}
                changeValue={changeValue}
                updateSelectIdx={updateSelectIdx}
            />
            <SearchSuggestBox
                dataState={data}
                isEmptyInput={isEmptyInput}
                listRef={listRef}
                selectListIdx={selectListIdx}
                value={value}
                searchLog={searchLog}
                noSearchLog={noSearchLog}
            />
        </Box>
    );
};

export default Search;

const Box = styled.section`
    width: 100%;
    height: 80vh;
    padding-top: 20vh;

    background-color: var(--bg-main);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h1 {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 21px;
    }

    &:has(input:focus) {
        & > div {
            display: block;
        }
    }
`;
