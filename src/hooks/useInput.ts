import {ChangeEvent, Dispatch, useState} from 'react';

type ReturnType = [
    string,
    (event: ChangeEvent<HTMLInputElement>) => void,
    Dispatch<React.SetStateAction<string>>,
];

export const useInput = (initialData: string): ReturnType => {
    const [value, setValue] = useState(initialData);

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return [value, inputChange, setValue];
};
