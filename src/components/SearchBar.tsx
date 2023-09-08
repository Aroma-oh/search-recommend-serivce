import styled from 'styled-components';

interface SearchBarProps {
    placeholder: string;
    value: string;
    changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateSelectIdx: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    submit: (event: React.FormEvent) => void;
}

const SearchBar = ({placeholder, value, changeValue, updateSelectIdx, submit}: SearchBarProps) => {
    return (
        <Box onSubmit={submit}>
            <label htmlFor='search'> </label>
            <Input
                id='search'
                placeholder={placeholder}
                value={value}
                onChange={changeValue}
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
    outline: none;
`;
