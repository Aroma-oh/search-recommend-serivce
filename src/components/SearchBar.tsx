import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';

interface InputType {
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({label, placeholder, value, onChange}: InputType) => {
    return (
        <Box>
            <label htmlFor={label} />
            <Input id={label} placeholder={placeholder} value={value} onChange={onChange} />
            <Button>
                <AiOutlineSearch />
            </Button>
        </Box>
    );
};

export default SearchBar;

const Box = styled.form`
    width: 280px;
    height: 16px;
    position: relative;
`;

const Input = styled.input`
    padding: 11px 20px 12px 20px;
    width: 100%;

    border-radius: 42px;
    background: var(--white);
    box-shadow: var(--box-shadow);
    border: none;
    overflow: auto;
`;
const Button = styled.button`
    border: none;
    background: var(--white);
    font-size: 18px;
    right: -21px;
`;
