
export function openURL(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = "_blank";
    a.click();
}

export function copy2Clipboard(text) {
    return new Promise((resolve, reject) => {
        if (!navigator.clipboard) {
            // 如果不支持 Clipboard API，使用旧方法
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                successful ? resolve('复制成功') : reject(new Error('复制失败'));
            } catch (err) {
                document.body.removeChild(textarea);
                reject(err);
            }
        } else {
            navigator.clipboard.writeText(text)
                .then(() => resolve('复制成功'))
                .catch(err => reject(err));
        }
    });
}

export function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export function checkUrlStatus(url) {
    if (!isValidUrl(url)) {
        return Promise.resolve(false);
    }
    return fetch(url, { method: 'GET' })
        .then(response => response.ok)
        .catch(() => false);
};