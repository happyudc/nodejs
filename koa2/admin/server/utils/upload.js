/**
 * Created by happyu on 2017/10/3.
 */
const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require(busboy);
const UtilDatetime = require('./datetime')
const UtilType = require('./type')

function mkdirsSync(dirname) {
    if(fs.existsSync(dirname)) {
        return true;
    } else {
        if(mkdirsSync(path.dirname(dirname))) {
            fs.mkdir(dirname);
            return true
        }
    }
}

function getSuffixName( fileName ) {
    let nameList = fileName.split('.');
    return nameList[nameList.length - 1]
}

function uploadPicture( ctx, options ) {
    let req = ctx.req;
    let res = ctx.res;
    let busboy = new Busboy({ headers: req.headers});

    let pictureType = 'common';
    if (UtilType.isJSON( options ) && UtilType.isString( options.pictureType )) {
        pictureType = options.pictureType
    }

    let picturePath = path.join(
        __dirname,
        '../../static/output/upload/',
        pictureType,
        UtilDatetime.dateFormat('yyyy/MM/dd',new Date())
    );

    let mkdirResult = mkdirsSync(picturePath);

    return new Promise((resolve, reject) => {
        let result = {
            success: false,
            code: '',
            message: '',
            data: null
        };

        busboy.on('file', function (fieldname, file, filename, coding, mimetype) {
            let pictureName = Math.random().toString(16).substr(2) + "." + getSuffixName(filename);
            let _uploadFilePath = path.join(picturePath, pictureName);

            let saveTo = path.join(_uploadFilePath)
            file.pipe(fs.createWriteStream(saveTo))

            file.on('end', function () {
                result.success = true
                resolve(result)
            })

            busboy.on('error', function (err) {
                reject(result)
            })
            req.pipe(busboy)
        })
    })
}

module.exports = {
    uploadPicture
}













































