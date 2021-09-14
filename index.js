#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('npx boiler-plate-prueba-serempre my-app');
    process.exit(1);
}
if(process.argv.length>3){
    console.log('soon more templates :)')
}
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = 'https://github.com/Rimhi/create-react-app-serempre';
try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.\n`);
    } else {
        console.log(err);
    }
    process.exit(1);
}
async function main() {
    try {
        const configExecSync = {stdio:'inherit'}
        console.log('Downloading files...\n');
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`,configExecSync);

        process.chdir(projectPath);

        const packageJson = `${projectPath}/package.json`;
        fs.readFile(packageJson,
            (err, file) => {
                if (err) throw err;
                const fileString = JSON.parse(file.toString());
                fileString.name = projectName
                fileString.version = "1.0.0"
                fileString.private = true
                const data =
                    JSON.stringify(fileString,null,3)
                        .toString()
                fs.writeFile(packageJson, data, (err2) => err2 || true);
            })
        console.log('\n\nGo get a coffee, this is going to take ...\n')
        console.log('Installing dependencies...\n');
        execSync('npm install',configExecSync);


        console.log('Removing useless files\n');
        execSync('npx rimraf ./.git',configExecSync);
        // fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

        console.log('The installation is done, this is ready to use !\n\n');
        console.log('run npm start! \n\n')

    } catch (error) {
        console.log(error);
    }

}
main();