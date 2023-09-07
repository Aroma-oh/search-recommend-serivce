import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {instance} from 'apis/axios';
import {apiState} from 'store/atom';

export const useFetch = () => {
    const setFetch = useSetRecoilState(apiState);

    const fetchData = useCallback(
        async (searchKeyword: string) => {
            try {
                setFetch({data: [], status: 'LOADING'});

                const res = await instance.get(`/sick?sickNm_like=${searchKeyword}`);
                const preprocessedData = res.data
                    .slice(0, 7)
                    .map((item: {sickCd: string; sickNm: string}) => item.sickNm);

                setFetch({data: preprocessedData, status: 'IDLE'});

                console.info('calling api');
                console.info(`searchKeyword: ${searchKeyword}`); // 제거 예정
                console.info(`preprocessedData: ${preprocessedData}`); // 제거 예정
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
