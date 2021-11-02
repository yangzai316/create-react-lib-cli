const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const Inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const downloadGitRepo = require('download-git-repo');
const download = promisify(downloadGitRepo);
const { licenses } = require('./const.js');
const ejs = require('ejs');

module.exports = async (args) => {
    const projectName = args[0];
    inBaseInfo(projectName);
};

// 添加基本信息
const inBaseInfo = async (projectName) => {
    Inquirer.prompt([
        {
            type: "input",
            message: "Entry your project's name:",
            name: "name",
            default: projectName
        },
        {
            type: "input",
            message: "Entry your project's description:",
            name: "description",
            default: ''
        },
        {
            type: "confirm",
            message: "Choice your project's private:",
            name: "private",
            default: false
        },
        {
            type: "input",
            message: "Entry your project's one keyword",
            name: "keyword",
            default: ''
        },
        {
            type: "input",
            message: "Entry your project's author",
            name: "author",
            default: ''
        },
        {
            type: "list",
            message: "Choice your project's license",
            name: "license",
            choices: licenses,
            default: 'MIT'
        }
    ]).then(data => {
        renderFile(projectName, data);
    });
};
// 通过模版内容写文件
const renderFile = (projectName, data) => {
    const filename = path.join(__dirname, `./../templates/package.json`);

    ejs.renderFile(filename, data, {}, function (err, str) {
        if (err) return console.log(chalk.red('ejs ERROR :', err));
        inDownload(projectName, str);
    });
}

// 从远程下载项目模版
const inDownload = async (projectName, str) => {

    const loading = ora('downloading ...');// 设置loading效果

    loading.start();// 开始loading
    try {
        const data = await download('github.com:yangzaiwangzi/react-library-cli-template#main', projectName);
        fs.writeFileSync(`${process.cwd()}/${projectName}/package.json`, str);
        loading.succeed('downloading success');// 结束loading
        console.log('')
        console.log('You can :');
        console.log(`   cd ${projectName}`);
        console.log('   npm install');
        console.log('   npm start');
        console.log('to start your component code');
        console.log('')
        console.log(`   cd ${projectName}/example`);
        console.log('   npm install');
        console.log('   npm run dev');
        console.log('to run your component example in the browser.');
        console.log('')
    } catch (error) {
        loading.fail('downloading fatal：'); // 结束loading 
        console.log(chalk.red(error?.statusMessage));
    };
};