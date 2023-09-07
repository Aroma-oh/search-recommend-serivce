import styled from 'styled-components';

interface SearchBarProps {
    placeholder: string;
    value: string;
    changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    focus: () => void;
    updateSelectIdx: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({placeholder, value, changeValue, focus, updateSelectIdx}: SearchBarProps) => {
    return (
        <Box>
            <label htmlFor='search'> </label>
            <Input
                id='search'
                placeholder={placeholder}
                value={value}
                onChange={changeValue}
                onFocus={focus}
                autoComplete='off'
                onKeyDown={updateSelectIdx}
            />
        </Box>
    );
};

export default SearchBar;

const Box = styled.form`
    width: 450px;
    height: 42px;
    display: flex;
`;

const Input = styled.input`
    padding: 11px 20px 12px 20px;
    width: 100%;

    border-radius: 42px;
    background: var(--white);
    box-shadow: var(--box-shadow);
    border: none;
    overflow: auto;

    font-size: 16px;
`;

// searchKeyword 핸들링 : updateKeyword
// (공통) 띄어쓰기 : 마지막 단어 기준으로 추천 검색어 제공
// (영어) 디바운싱
// (한글) 마지막 음절이 완전할때 완전하지 않은 음절 제거

// + 버튼 클릭할때도  updateKeyword되도록 추가 필요
