let fs = require('fs');
let path = require('path');
let beautify = require('js-beautify').js;
let beautifyOptions = JSON.parse(fs.readFileSync(path.join(__dirname,
    '.jsbeautifyrc'), 'utf8'));
let ignoreFolders = ['$Recycle.Bin', 'node_modules', 'typings',
    '.git'
];
let ignoreFiles = ['bundle.js'];
/**
 * Gets all files where the extions is `.js` and the filename
 * does not start with a `.`. This method is recusive, so all
 * child folders are included in the search too.
 * @param  {} dirPath
 */
let getJsFilesRecursive = function(dirPath) {
    let files = [];
    let dirContents = fs.readdirSync(dirPath);
    dirContents.forEach(element => {
        let elementStat = fs.statSync(path.join(dirPath, element));
        if (element.startsWith('.')) {
            return;
        }
        if (elementStat.isDirectory()) {
            if (ignoreFolders.indexOf(element) >= 0) {
                return;
            }
            files = files.concat(getJsFilesRecursive(path.join(dirPath,
                element)));
        } else {
            if (ignoreFiles.indexOf(element) >= 0 || !element.endsWith(
                    '.js')) {
                return;
            }
            files.push(path.join(dirPath, element));
        }
    });
    return files;
};

let files = getJsFilesRecursive(__dirname);
files.forEach(filePath => {
    let beautifiedFileContents = beautify(fs.readFileSync(filePath, 'utf8'),
        beautifyOptions);
    fs.writeFileSync(filePath, beautifiedFileContents, 'utf8');
});
