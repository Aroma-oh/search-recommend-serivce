import {useRecoilState, useRecoilValue} from 'recoil';
import {cacheStoreState, apiState} from 'store/atom';
import {useFetch} from './useFetch';
import {useCallback} from 'react';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
// const ONE_DAY_MS = 5;

export const useCacheStore = () => {
    const fetchState = useRecoilValue(apiState);
    const [cacheStore, setCacheStoreState] = useRecoilState(cacheStoreState);

    const fetchData = useFetch();

    const caching = useCallback(
        async (searchKeyword: string) => {
            const currentTime = new Date().getTime();
            const expireTime = new Date(currentTime + ONE_DAY_MS).getTime();

            if (
                !cacheStore[searchKeyword?.toUpperCase()] ||
                cacheStore[searchKeyword]?.expireTime < currentTime
            ) {
                await fetchData(searchKeyword);
                setCacheStoreState(prev => ({
                    ...prev,
                    [searchKeyword.toUpperCase()]: {data: fetchState.data ?? [], expireTime},
                }));
            }
        },
        [cacheStore, setCacheStoreState, fetchData]
    );

    return caching;
};
