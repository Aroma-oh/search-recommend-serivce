import {useRef} from 'react';
import {useSetRecoilState} from 'recoil';
import {searchKeywordState} from 'store/atom';
import {
    getLastWordAfterSpace,
    debounce,
    isKorean,
    keepKoreanSyllables,
    isEnglish,
} from 'utils/searchHelpers';

const DEBOUNCE_TIMING = 500;

export const useUpdateKeyword = () => {
    const setSearchKeyword = useSetRecoilState(searchKeywordState);

    const debouncedSearch = useRef(
        debounce((handledValue: string) => {
            setSearchKeyword(handledValue);
        }, DEBOUNCE_TIMING)
    ).current;

    const updateKeyword = (value: string) => {
        const handledValue = getLastWordAfterSpace(value);

        if (isKorean(handledValue) && handledValue.length > 0) {
            const koValue = keepKoreanSyllables(handledValue);
            debouncedSearch(koValue);
        }
        if (isEnglish(handledValue)) debouncedSearch(handledValue);
    };

    return updateKeyword;
};
