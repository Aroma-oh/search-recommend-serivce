export const getLastWordAfterSpace = (inputValue: string) => {
    const words = inputValue.split(' ');
    return words[words.length - 1];
};

export const debounce = (callback: (value: string) => void, delay: number) => {
    let timer: NodeJS.Timeout;

    return (value: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
};

export const isKoreanSyllable = (text: string) => {
    return /^[가-힣]+$/.test(text);
};

export const keepKoreanSyllables = (text: string) => {
    const koreanText = text.match(/[가-힣]+/g);
    return koreanText ? koreanText.join('') : '';
};
