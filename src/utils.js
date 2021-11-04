
const ejs = require('ejs');

exports.ejsRenderFile = (filename, data, options, other) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(filename, data, options, function (err, str) {
            if (err) {
                reject(err)
            } else {
                resolve({
                    name: other,
                    data: str
                })
            };
        });
    })
};