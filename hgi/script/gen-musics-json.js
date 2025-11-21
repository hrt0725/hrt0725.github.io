import fs from "fs";

const files = fs.readdirSync(musicDir)
    .filter(name => name !== "list.json")
    .sort();

fs.writeFileSync(output, JSON.stringify(files, null, 2), "utf8");

console.log("musics.json 已生成，共", files.length, "个文件");