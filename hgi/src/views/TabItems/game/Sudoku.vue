<template>
    <main class="TabItemMain">
        <n-space vertical>
            <h6>developing...</h6>
            <n-space>
                <n-button type="primary" size="tiny">大小</n-button>
                <n-slider size="tiny" style="width: 200px;" v-model:value="fontSize" :min="12" :max="28" :step="1" />
            </n-space>
            <div>
                <div class="sdkMain">
                    <span :class="[{ activeSuduItemIndex: activeSuduItemIndex === index }]" class="sdkItem"
                        :style="{ fontSize: fontSize + 'px' }" v-for="(item, index) in sudukuData" :key="index"
                        @click="sdkItemClickEvent(index)">{{ item == 0 ? '' : item
                        }}</span>
                </div>
                <div style="display: flex;gap: 1px;margin: 5px;">
                    <n-button type="primary" size="tiny" style="width: 24px;" v-for="(item, index) in 10"
                        @click="numberListClickEvent(index)">{{ item == 10 ? 'X' : item }}</n-button>
                </div>
                <n-button @click="verifySuduku" type="primary" size="small">校验</n-button>
            </div>
        </n-space>
    </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
const fontSize = ref(17);
const sudukuData = ref([]);
const activeSuduItemIndex = ref(null);

onMounted(() => {
    sudukuData.value = generatePuzzle81(40);
});

function sdkItemClickEvent(index) {
    activeSuduItemIndex.value = index;
}

function numberListClickEvent(index) {
    if (index == 9) {
        sudukuData.value[activeSuduItemIndex.value] = 0;
    } else {
        sudukuData.value[activeSuduItemIndex.value] = index + 1;
    }
    activeSuduItemIndex.value = null;
}

function verifySuduku() {
    if (isBoardValid81(sudukuData.value)) {
        alert("成功");
    } else {
        alert("失败");
    }
}

//--------------------------------------------------------
// 工具函数：一维数组表示数独 index = r * 9 + c
//--------------------------------------------------------

// 深拷贝
function clone81(arr) {
    return arr.slice();
}

// Fisher–Yates 洗牌
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 行、列、宫的索引计算
function rowOf(i) { return Math.floor(i / 9); }
function colOf(i) { return i % 9; }
function boxOf(i) { return Math.floor(rowOf(i) / 3) * 3 + Math.floor(colOf(i) / 3); }

// 判断在 index 位置放 num 是否合法
function isValidPlacement81(board, index, num) {
    const r = rowOf(index);
    const c = colOf(index);
    const b = boxOf(index);
    // 行
    const startRow = r * 9;
    for (let i = startRow; i < startRow + 9; i++) {
        if (board[i] === num) return false;
    }
    // 列
    for (let i = c; i < 81; i += 9) {
        if (board[i] === num) return false;
    }
    // 宫
    const br = Math.floor(r / 3) * 3;
    const bc = Math.floor(c / 3) * 3;
    for (let rr = br; rr < br + 3; rr++) {
        for (let cc = bc; cc < bc + 3; cc++) {
            const ii = rr * 9 + cc;
            if (board[ii] === num) return false;
        }
    }
    return true;
}

// 检查整个盘是否合法（调试用）
function isBoardValid81(board) {
    for (let i = 0; i < 81; i++) {
        const v = board[i];
        if (!v) continue;
        board[i] = 0;
        if (!isValidPlacement81(board, i, v)) {
            board[i] = v;
            return false;
        }
        board[i] = v;
    }
    return true;
}

//--------------------------------------------------------
// 求解器：计数解
//--------------------------------------------------------
function solveAndCount81(board, limit = 2) {
    const b = clone81(board);
    let count = 0;
    let firstSolution = null;

    function findEmptyIndex() {
        for (let i = 0; i < 81; i++) {
            if (!b[i]) return i;
        }
        return -1;
    }
    function backtrack() {
        if (count >= limit) return;
        const idx = findEmptyIndex();
        if (idx === -1) {
            count++;
            if (!firstSolution) firstSolution = clone81(b);
            return;
        }
        for (let num = 1; num <= 9; num++) {
            if (isValidPlacement81(b, idx, num)) {
                b[idx] = num;
                backtrack();
                b[idx] = 0;
                if (count >= limit) return;
            }
        }
    }
    backtrack();
    return { count, solution: firstSolution };
}

//--------------------------------------------------------
// 完整解生成器（随机回溯）
//--------------------------------------------------------
function generateFullSolution81() {
    const board = Array(81).fill(0);
    function fill() {
        const idx = board.indexOf(0);
        if (idx === -1) return true;

        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of nums) {
            if (isValidPlacement81(board, idx, num)) {
                board[idx] = num;
                if (fill()) return true;
                board[idx] = 0;
            }
        }
        return false;
    }
    fill();
    return board;
}

//--------------------------------------------------------
// 挖空生成唯一解题目
//--------------------------------------------------------
function generatePuzzle81(holesTarget = 40) {
    const full = generateFullSolution81();
    const puzzle = clone81(full);
    const idxs = shuffle([...Array(81).keys()]);
    let holes = 0;
    for (let idx of idxs) {
        if (holes >= holesTarget) break;
        const backup = puzzle[idx];
        puzzle[idx] = 0;
        const { count } = solveAndCount81(puzzle, 2);
        if (count !== 1) {
            puzzle[idx] = backup;
        } else {
            holes++;
        }
    }
    return puzzle;
}

//--------------------------------------------------------
// 可读输出（方便 console.log）
//--------------------------------------------------------
function boardToString81(board) {
    let s = "";
    for (let i = 0; i < 81; i++) {
        s += board[i] ? board[i] : ".";
        s += (i % 9 === 8) ? "\n" : " ";
        if (i % 27 === 26 && i !== 80) s += "\n";
    }
    return s;
}
</script>

<style scoped>
.sdkMain {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    width: max-content;
    border: 1px solid var(--n-bar-color);
    border-radius: 5px;
    aspect-ratio: 1 / 1;
    padding-right: 2px;
}

.sdkItem {
    aspect-ratio: 1 / 1;
    text-align: center;
    padding: 1px;
}

.sdkItem:hover {
    background-color: var(--n-bar-color);
}

.activeSuduItemIndex {
    background-color: rgb(143, 255, 147);
}

.activeSuduItemIndex:hover {
    background-color: rgb(143, 255, 147);
}

.sdkItem:nth-child(1) {
    border-radius: 5px 0px 0px 0px;
}

.sdkItem:nth-child(9) {
    border-radius: 0px 5px 0px 0px;
}

.sdkItem:nth-child(73) {
    border-radius: 0px 0px 0px 5px;
}

.sdkItem:nth-child(81) {
    border-radius: 0px 0px 5px 0px;
}

.sdkItem:nth-child(9n + 3),
.sdkItem:nth-child(9n + 6) {
    border-right: 1px solid var(--n-bar-color);
}

.sdkItem:nth-child(n + 19):nth-child(-n + 27),
.sdkItem:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 1px solid var(--n-bar-color);
}
</style>