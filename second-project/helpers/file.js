const fs = require('fs');

const deleteFile = (filePath) => {
    //It deletes a file of this path
    fs.unlink(filePath, (err) => {
        if (err) throw (err);
    });
};

exports.deleteFile = deleteFile;