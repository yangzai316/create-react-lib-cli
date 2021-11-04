const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const Inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const downloadGitRepo = require('download-git-repo');
const download = promisify(downloadGitRepo);
const { licenses, templateConfig } = require('./const.js');
const ejs = require('ejs');
const { ejsRenderFile } = require('./utils.js');

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
        data?.name && (data.componentName = data.name.charAt(0).toUpperCase() + data.name.slice(1));

        renderFile(projectName, data);
    });
};
// 通过模版内容写文件
const renderFile = (projectName, data) => {

    const promiseArr = [];
    for (const key in templateConfig) {
        const item = templateConfig[key];
        promiseArr.push(ejsRenderFile(item.path, data, {}, key))
    };

    Promise.all(promiseArr)
        .then(res => {
            inDownload(projectName, res);
        }).catch(err => {
            console.log(chalk.red('ejs ERROR :', err));
        });

}

// 从远程下载项目模版
const inDownload = async (projectName, templateData) => {
    const loading = ora('createing ...');// 设置loading效果

    loading.start();// 开始loading
    try {
        const data = await download('github.com:yangzaiwangzi/react-library-cli-template#main', projectName);
        for (const item of templateData) {
            fs.writeFileSync(`${process.cwd()}/${projectName}${templateConfig[item.name].to}`, item.data);
        }
        loading.succeed('create success ！！！');// 结束loading
        console.log('------------------------------------------------')
        console.log('   You can :');
        console.log('   to start your component code');
        console.log(`       cd ${projectName}/`);
        console.log('       npm install');
        console.log('       npm start');
        console.log('')
        console.log('   to run your component example in the browser.');
        console.log(`       cd ${projectName}/example/`);
        console.log('       npm install');
        console.log('       npm run dev');
        console.log('')
    } catch (error) {
        loading.fail('downloading fatal：'); // 结束loading 
        console.log(chalk.red(error?.statusMessage));
    };
};