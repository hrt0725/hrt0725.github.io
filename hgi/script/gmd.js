import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, "../../assets");
const musicDir = path.join(__dirname, "../../music");
const output = path.join(__dirname, "../public/data/musics.json");

if (fs.existsSync(assetsDir)) {
    fs.rmSync(assetsDir, { recursive: true, force: true });
    console.log("已删除目录:", assetsDir);
} else {
    console.log("assets 目录不存在，跳过删除");
}

const files = fs.readdirSync(musicDir)
    .filter(name => name !== "list.json")
    .sort();

fs.writeFileSync(output, JSON.stringify(files, null, 2), "utf8");

console.log("musics.json 已生成，共", files.length, "个文件");
