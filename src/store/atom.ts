import {atom} from 'recoil';
import {Api} from 'types/api';

export const searchKeywordState = atom({
    key: 'searchKeywordState',
    default: '',
});

export const cacheStoreState = atom<CacheStoreData>({
    key: 'cacheStoreState',
    default: {},
});

export const dataState = atom<Api>({
    key: 'dataState',
    default: {
        data: [],
        status: 'IDLE',
    },
});

type CacheStoreData = {
    [key: string]: {
        data: string[];
        expireTime: number;
    };
};
