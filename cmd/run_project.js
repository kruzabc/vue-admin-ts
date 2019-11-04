/* 运行项目的脚本 */
/*
*   node cmd/run_project.js -p app1 -m build
* */
const fs = require("fs");
const path = require("path");
const program = require("commander");
const chalk = require("chalk");
let projectName = process.argv[2];

program
    .version("0.1.0")
    .option("-m, --mode [type]", "mode serve or build", "serve")
    .option("-p, --project [type]", "project name", "")
    .parse(process.argv);

if ("serve,build".indexOf(program.mode) < 0) {
    console.error(chalk.red.bold.bgWhite("请输入运行模式"));
    return;
}
/*
*  将数据保存进.env.local, 方便被取到
* */
const envLocalPath = path.resolve(__dirname + "/../.env.local");
const writeKey = "RUN_PROJECT_NAME";

if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, "utf8");
    const lines = content.split("\r\n");

    // const reg = new RegExp(`^[ ]*${writeKey}[ ]*=[ ]*([A-Za-z0-9])*[ ]*/r/n$`);
    let findVal = undefined;
    let hasEqualIcon = true;
    for (let i = 0; i < lines.length; ++i) {
        const trim = lines[i].trim();
        if (trim !== "" || !trim.startsWith("#")) {
            if (trim.startsWith(`${writeKey}`)) {
                let splitS = trim.split("=");
                hasEqualIcon = splitS.length > 1;
                if (splitS[0].trim() === writeKey) {
                    findVal = (splitS[1] || "").trim();
                    break;
                }
            }
        }
    }
    if (findVal === undefined) {
        // 没有这一条
        fs.writeFileSync(envLocalPath, content + `\r\n${writeKey} = ${program.project}`);
    } else if (findVal !== undefined) {
        if (findVal === program.project) {
            // 相同
        } else {
            if (hasEqualIcon) {
                // console.log(content.replace(new RegExp(`${writeKey}\\s*=\\s*[a-z0-9A-Z ]* \r\n`), '999'));
                fs.writeFileSync(envLocalPath, content.replace(new RegExp(`${writeKey}\\s*=\\s*[a-z0-9A-Z ]*`), `${writeKey} = ${program.project}`));
            } else {
                // console.log('没有等号');
                // console.log(content.replace(new RegExp(`${writeKey}\\s*[a-z0-9A-Z ]* \r\n`), '999'));
                fs.writeFileSync(envLocalPath, content.replace(new RegExp(`${writeKey}\\s*[a-z0-9A-Z ]*`), `${writeKey} = ${program.project}`));
            }
        }
    } else {
    }
} else {
    fs.writeFileSync(envLocalPath, `${writeKey} = ${program.project}`);
}

let exec = require("child_process").execSync;
exec(`vue-cli-service ${program.mode}`, {stdio: "inherit"});
