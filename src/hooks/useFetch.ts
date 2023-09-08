import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {instance} from 'apis/axios';
import {dataState} from 'store/atom';

const MAX_LENGTH = 7;

export const useFetch = () => {
    const setFetch = useSetRecoilState(dataState);

    const fetchData = useCallback(
        async (searchKeyword: string) => {
            try {
                setFetch({data: [], status: 'LOADING'});

                const res = await instance.get(`/sick?sickNm_like=${searchKeyword}`);
                const preprocessedData = res.data
                    .slice(0, MAX_LENGTH)
                    .map((item: {sickCd: string; sickNm: string}) => item.sickNm);

                setFetch({data: preprocessedData, status: 'IDLE'});

                console.info('calling api');
                console.info(`searchKeyword: ${searchKeyword}`);

                return preprocessedData;
            } catch (error) {
                setFetch({data: [], status: 'ERROR'});
            } finally {
                setFetch(prevFetch => ({
                    ...prevFetch,
                    status: 'IDLE',
                }));
            }
        },
        [setFetch]
    );

    return fetchData;
};
