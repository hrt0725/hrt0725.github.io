export function selectImageFile() {
    return new Promise((resolve, reject) => {
        // 创建一个文件选择输入框
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // 只允许选择图片文件
        input.style.display = 'none';

        // 监听选择文件事件
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) {
                reject('未选择文件');
                return;
            }

            // 创建临时URL
            const imageUrl = URL.createObjectURL(file);
            resolve(imageUrl);
        };

        // 触发文件选择
        document.body.appendChild(input);
        input.click();

        // 选择完后清理DOM
        input.addEventListener('click', () => {
            setTimeout(() => document.body.removeChild(input), 0);
        });
    });
}
