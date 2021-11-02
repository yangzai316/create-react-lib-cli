
const path = require('path');
const commander = require('commander');
const { version } = require('./../package.json');

// 创建 init 命令
commander
    .command('create') // 命令的名称
    .alias('c') // 命令的别名
    .description('react-cli create <project-name>, to create a new project') // 命令的描述
    .action(() => { // 动作
        console.log('xx', path.resolve(__dirname, './create.js'));
        if (process.argv.slice(3).length) {
            require(path.resolve(__dirname, './create.js'))(process.argv.slice(3));
        } else {
            console.log('Please enter a project name, or Entry react-cli --help');
        }
    });

// 处理异常 command
commander
    .command('*') // 命令的名称
    .description('react-cli create <project-name>, to create a new project') // 命令的描述
    .action(() => { // 动作
        console.log('Command not found, Entry react-cli --help');
    });

//动态获取版本号
commander.version(version)
    .parse(process.argv);

