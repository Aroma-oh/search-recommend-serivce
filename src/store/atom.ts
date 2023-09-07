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

export const apiState = atom<Api>({
    key: 'apiState',
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
