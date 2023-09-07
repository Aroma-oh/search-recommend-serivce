import styled from 'styled-components';
import {Api} from 'types/api';
import {AiOutlineSearch} from 'react-icons/ai';
import {RefObject} from 'react';

interface SearchSuggestBoxProps {
    dataState: Api;
    isEmptyInput: boolean;
    selectRef: RefObject<HTMLUListElement>;
    selectListIdx: number;
    value: string;
}

const SearchSuggestBox = ({
    dataState,
    isEmptyInput,
    selectRef,
    selectListIdx,
    value,
}: SearchSuggestBoxProps) => {
    if (dataState.status === 'ERROR' || !dataState.data)
        return <Box>결과를 불러오는데 실패했습니다. </Box>;

    return (
        <Box>
            <ul ref={selectRef}>
                {isEmptyInput ? (
                    <p>최근 검색어가 없습니다.</p>
                ) : (
                    <>
                        <li>
                            <AiOutlineSearch /> {value}
                        </li>
                        <p>추천 검색어</p>
                        {dataState.data.map((item, index) => (
                            <li key={index} className={selectListIdx === index ? 'selected' : ''}>
                                <AiOutlineSearch /> {item}
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </Box>
    );
};

export default SearchSuggestBox;

const Box = styled.div`
    display: none;

    width: 450px;
    min-height: 140px;

    margin-top: 6px;
    padding: 20px 0;
    box-sizing: border-box;

    background: var(--white);
    box-shadow: var(--box-shadow);
    border-radius: 14px;

    p {
        color: var(--gray);
        padding: 8px 20px;
        font-size: 12px;
    }
    li {
        padding: 12px 20px;
    }

    .selected {
        background-color: var(--bg-gray);
    }
`;
