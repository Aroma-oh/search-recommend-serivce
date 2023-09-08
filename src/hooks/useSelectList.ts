import {useRef, useState} from 'react';

export const useListSelect = (
    isEmptyInput: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>
) => {
    const [selectListIdx, setSelectListIdx] = useState(-1);
    const listRef = useRef<HTMLUListElement>(null);

    const updateSelectIdx = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.nativeEvent.isComposing) return;

        if (isEmptyInput) {
            setSelectListIdx(-1);
        }

        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();

                if (selectListIdx < 0) return;
                setSelectListIdx(prev => prev - 1);
                if (selectListIdx <= 0) setSelectListIdx(-1);

                break;

            case 'ArrowDown':
                setSelectListIdx(prev => prev + 1);
                if (listRef.current?.childElementCount === selectListIdx + 1) setSelectListIdx(0);
                break;

            case 'Enter':
                if (listRef.current) {
                    const listElement = listRef.current;
                    const selectedElementText = listElement.childNodes[selectListIdx]?.textContent;

                    if (selectedElementText) setValue(selectedElementText);
                }
        }
    };

    return {selectListIdx, updateSelectIdx, listRef};
};
