import {useState} from 'react';

function useSearchHistory() {
    const [searchLog, setSearchLog] = useState<string[]>([]);

    const addSearchLog = (searchText: string) => {
        const existingIndex = searchLog.findIndex(item => item === searchText);

        if (existingIndex !== -1) {
            const updatedSearchLog = [
                ...searchLog.slice(0, existingIndex),
                ...searchLog.slice(existingIndex + 1),
            ];
            setSearchLog([searchText, ...updatedSearchLog]);
        } else {
            setSearchLog([searchText, ...searchLog]);
        }

        if (searchLog.length > 7) {
            setSearchLog(searchLog.slice(0, 7));
        }
    };

    return {searchLog, addSearchLog};
}

export default useSearchHistory;
