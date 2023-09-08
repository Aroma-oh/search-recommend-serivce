import {useRef} from 'react';
import {useSetRecoilState} from 'recoil';
import {searchKeywordState} from 'store/atom';
import {getLastWordAfterSpace, debounce, isKorean, keepKoreanSyllables} from 'utils/searchHelpers';

const DEBOUNCE_TIMING = 100;

export const useUpdateKeyword = () => {
    const setSearchKeyword = useSetRecoilState(searchKeywordState);

    const debouncedSearch = useRef(
        debounce((value: string) => {
            const handledValue = getLastWordAfterSpace(value);

            if (isKorean(handledValue) && handledValue.length > 0) {
                const koValue = keepKoreanSyllables(handledValue);
                setSearchKeyword(koValue);
            } else {
                setSearchKeyword(handledValue);
            }
        }, DEBOUNCE_TIMING)
    ).current;

    const updateKeyword = (value: string) => {
        debouncedSearch(value);
    };

    return updateKeyword;
};
