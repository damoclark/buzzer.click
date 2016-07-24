var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js;
var beautifyOptions = JSON.parse(fs.readFileSync(path.join(__dirname,
    '.jsbeautifyrc'), 'utf8'));
var ignoreFolders = ['$Recycle.Bin', '.vscode', 'node_modules', 'typings',
    '.git'
];
var ignoreFiles = ['bundle.js'];
/**
 * Gets all files where the extions is `.js` and the filename
 * does not start with a `.`. This method is recusive, so all
 * child folders are included in the search too.
 * @param  {} dirPath
 */
var getJsFilesRecursive = function(dirPath) {
    var files = [];
    var dirContents = fs.readdirSync(dirPath);
    for (var i = 0; i < dirContents.length; i++) {
        var element = dirContents[i];
        var elementStat = fs.statSync(path.join(dirPath, element));
        if (elementStat.isDirectory()) {
            if (ignoreFolders.indexOf(element) >= 0) {
                continue;
            }
            files = files.concat(getJsFilesRecursive(path.join(dirPath, element)));
        } else {
            if (ignoreFiles.indexOf(element) >= 0) {
                continue;
            }
            if (element.startsWith('.') || !element.endsWith('.js')) {
                continue;
            }
            files.push(path.join(dirPath, element));
        }
    }
    return files;
};
var files = getJsFilesRecursive(__dirname);
for (var i = 0; i < files.length; i++) {
    var filePath = files[i];
    var beautifiedFileContents = beautify(fs.readFileSync(filePath, 'utf8'),
        beautifyOptions);
    fs.writeFileSync(filePath, beautifiedFileContents, 'utf8');
}
