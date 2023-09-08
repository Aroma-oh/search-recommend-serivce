import styled from 'styled-components';
import {Api} from 'types/api';
import {AiOutlineSearch} from 'react-icons/ai';
import {Fragment, RefObject} from 'react';
import {getLastWordAfterSpace} from 'utils/searchHelpers';

interface SearchSuggestBoxProps {
    dataState: Api;
    isEmptyInput: boolean;
    listRef: RefObject<HTMLUListElement>;
    selectListIdx: number;
    value: string;
    searchLog: string[];
    noSearchLog: boolean;
}

const SearchSuggestBox = ({
    dataState,
    isEmptyInput,
    listRef,
    selectListIdx,
    value,
    searchLog,
    noSearchLog,
}: SearchSuggestBoxProps) => {
    if (dataState.status === 'ERROR' || !dataState.data)
        return <Box>검색 결과를 불러오는데 실패했습니다. </Box>;

    return (
        <Box>
            <div>
                {isEmptyInput && noSearchLog ? (
                    <p>최근 검색어가 없습니다.</p>
                ) : (
                    <>
                        {isEmptyInput ? (
                            <div>
                                <p>최근 검색어</p>
                                <ul ref={listRef}>
                                    {searchLog.map((item, index) => (
                                        <li key={index}>
                                            <AiOutlineSearch /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <p className='value'>
                                    <AiOutlineSearch /> {value}
                                </p>
                                <p>추천 검색어</p>
                                <ul ref={listRef}>
                                    {dataState.data.map((item, index) => (
                                        <li
                                            key={index}
                                            className={selectListIdx === index ? 'selected' : ''}
                                        >
                                            <AiOutlineSearch />
                                            {item
                                                .split(getLastWordAfterSpace(value))
                                                .map((char, index) => (
                                                    <Fragment key={index}>
                                                        {index > 0 && <strong>{value}</strong>}
                                                        {char}
                                                    </Fragment>
                                                ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
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
    .value {
        font-size: 16px;
        color: black;
    }
    .selected {
        background-color: var(--bg-gray);
    }
    strong {
        font-weight: 700;
    }
`;
