import {useSetRecoilState} from 'recoil';
import {searchKeywordState} from 'store/atom';
import {
    getLastWordAfterSpace,
    debounce,
    isKoreanSyllable,
    keepKoreanSyllables,
} from 'utils/searchHelpers';

export const useUpdateKeyword = () => {
    const setSearchKeyword = useSetRecoilState(searchKeywordState);

    const updateKeyword = (value: string) => {
        const handledValue = getLastWordAfterSpace(value);

        if (handledValue.match(/^[a-zA-Z]*$/)) {
            const debouncedSearch = debounce(() => {
                setSearchKeyword(handledValue);
            }, 1000);

            debouncedSearch(handledValue);
        }

        if (isKoreanSyllable(handledValue[handledValue.length - 1])) {
            const koValue = keepKoreanSyllables(handledValue);
            setSearchKeyword(koValue);
        }
    };

    return updateKeyword;
};
