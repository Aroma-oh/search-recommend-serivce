import {useRecoilState, useSetRecoilState} from 'recoil';
import {cacheStoreState, dataState} from 'store/atom';
import {useFetch} from './useFetch';
import {useCallback} from 'react';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
// const ONE_DAY_MS = 5000;

export const useCacheStore = () => {
    const [cacheStore, setCacheStoreState] = useRecoilState(cacheStoreState);
    const setData = useSetRecoilState(dataState);

    const fetchData = useFetch();

    const caching = useCallback(
        async (searchKeyword: string) => {
            const currentTime = new Date().getTime();
            const expireTime = new Date(currentTime + ONE_DAY_MS).getTime();

            if (
                !cacheStore[searchKeyword?.toUpperCase()] ||
                cacheStore[searchKeyword]?.expireTime < currentTime
            ) {
                const newData = await fetchData(searchKeyword);
                setCacheStoreState(prev => ({
                    ...prev,
                    [searchKeyword.toUpperCase()]: {data: newData, expireTime},
                }));
            } else {
                if (cacheStore[searchKeyword])
                    setData(prev => ({...prev, data: cacheStore[searchKeyword].data ?? []}));
            }
        },
        [cacheStore, setCacheStoreState, fetchData, setData]
    );

    return caching;
};

// 키 - 값 제대로 캐싱 안됨
