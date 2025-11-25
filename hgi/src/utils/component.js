import { ref, h } from "vue";
import { NInput, NButton } from "naive-ui";

export function InputDialog(dialog, type, title, func) {
    const newThemeName = ref('');
    dialog[type]({
        title: title,
        content: () => h(NInput, {
            placeholder: "请输入内容",
            size: "tiny",
            style: "width:200px",
            value: newThemeName.value,
            onUpdateValue: v => (newThemeName.value = v)
        }),
        style: "width:max-content;height:max-content",
        action: () => h(NButton, {
            type: "primary",
            size: "tiny",
            onClick: () => {
                func(newThemeName.value);
            }
        }, { default: () => "确定" })
    });
}

export function AffirmDialog(dialog, type, title, func) {

}