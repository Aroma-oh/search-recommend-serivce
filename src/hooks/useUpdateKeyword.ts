import {useSetRecoilState} from 'recoil';
import {searchKeywordState} from 'store/atom';
import {
    getLastWordAfterSpace,
    debounce,
    isKoreanSyllable,
    keepKoreanSyllables,
} from 'utils/searchHelpers';

const DEBOUNCE_TIMING = 1000;

export const useUpdateKeyword = () => {
    const setSearchKeyword = useSetRecoilState(searchKeywordState);

    const updateKeyword = (value: string) => {
        const handledValue = getLastWordAfterSpace(value);

        if (handledValue.match(/^[a-zA-Z]*$/)) {
            const debouncedSearch = debounce(() => {
                setSearchKeyword(handledValue);
            }, DEBOUNCE_TIMING);

            debouncedSearch(handledValue);
        }

        if (isKoreanSyllable(handledValue[handledValue.length - 1])) {
            const koValue = keepKoreanSyllables(handledValue);
            setSearchKeyword(koValue);
        }
    };

    return updateKeyword;
};
