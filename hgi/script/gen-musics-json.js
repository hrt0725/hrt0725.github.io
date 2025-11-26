import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileName = 'musics.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const musicDir = path.join(__dirname, "../../music");
const output = path.join(__dirname, "../public/data/" + fileName);


const files = fs.readdirSync(musicDir)
    .filter(name => name !== "list.json")
    .sort();

fs.writeFileSync(output, JSON.stringify(files, null, 2), "utf8");
console.log(fileName + "已生成，共", files.length, "个文件");