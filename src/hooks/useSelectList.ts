import {useRef, useState} from 'react';

export const useListSelect = (isEmptyInput: boolean) => {
    const [selectListIdx, setSelectListIdx] = useState(-1);
    const selectRef = useRef<HTMLUListElement>(null);

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
                if (selectRef.current?.childElementCount === selectListIdx + 1) setSelectListIdx(0);
                break;
        }
    };

    return {selectListIdx, updateSelectIdx, selectRef};
};
