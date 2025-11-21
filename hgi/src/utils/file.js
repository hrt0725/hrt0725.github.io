export function selectImageFile() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // 只允许选择图片文件
        input.style.display = 'none';

        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) {
                reject('未选择文件');
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            resolve(imageUrl);
        };
        document.body.appendChild(input);
        input.click();
        input.addEventListener('click', () => {
            setTimeout(() => document.body.removeChild(input), 0);
        });
    });
}

export function selectJsonFile() {
    return new Promise((resolve, reject) => {
        const fileEle = document.createElement("input");
        fileEle.type = "file";
        fileEle.accept = ".json"; // 只允许选择 json 文件
        fileEle.onchange = async () => {
            const file = fileEle.files?.[0];
            if (!file) {
                return reject("未选择文件");
            }
            try {
                const text = await file.text();  // 读取文本内容
                const jsonData = JSON.parse(text); // 解析 JSON
                return resolve(jsonData);
            } catch (err) {
                return reject("文件解析失败: " + err);
            }
        };

        fileEle.click();
    });
}


export function imageFile2Base64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
export function imgUrl2Base64(url) {
    return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }));
}

export function base64ToImage(base64) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}