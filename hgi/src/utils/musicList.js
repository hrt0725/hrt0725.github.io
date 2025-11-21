import pinyin from 'pinyin';

export const groupByFirstLetter = (data) => {
    const groups = {};
    data.forEach(item => {
        const groupKey = getGroupKey(item.name);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
    });
    const result = Object.keys(groups).map(key => ({
        key,
        data: groups[key]
    }));
    return result.sort((a, b) => {
        if (a.key === '#') return 1;
        if (b.key === '#') return -1;
        const aIsPinyin = a.key.startsWith('拼英');
        const bIsPinyin = b.key.startsWith('拼英');
        if (!aIsPinyin && !bIsPinyin) {
            return a.key.localeCompare(b.key);
        } else if (aIsPinyin && !bIsPinyin) {
            return 1;
        } else if (!aIsPinyin && bIsPinyin) {
            return -1;
        } else {
            return a.key.localeCompare(b.key);
        }
    });
};

export const getGroupKey = (str) => {
    if (!str) return '#';
    const firstChar = str.charAt(0);
    const isChinese = /[\u4e00-\u9fa5]/.test(firstChar);
    if (isChinese) {
        const py = pinyin(firstChar, {
            style: pinyin.STYLE_FIRST_LETTER,
        });
        return `拼英${py[0][0].toUpperCase()}`;
    } else {
        const firstLetter = firstChar.toUpperCase();
        return /[A-Z]/.test(firstLetter) ? firstLetter : '#';
    }
};