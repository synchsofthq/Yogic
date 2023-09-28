'use strict';
const {v4: uuid} = require("uuid");
const fs = require('fs');
const folderPath = 'sessions'; // Change this to the path of the folder you want to create the file in
const moment = require("moment");

const getSecurityToken = (id) => {
    let uid = uuid();
    return {
        "uid": uid,
        "id": id,
        "created_at": moment().utc(),
        "file_name": id + "_" + uid + '.session',
    };
};

const createSecurityToken = async (id) => {
    let token = getSecurityToken(id);
    // Change this to the path and name of the file you want to create
    const filePath = `${folderPath}/${token.file_name}`;
    // Create the folder (if it doesn't exist)
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    // Create the file now
    return await writeFile(filePath, token)
        .then(() => {
            return token;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
}

const writeFile = async (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
const getSessionState = async (session_name) => {
    const filePath = `${folderPath}/${session_name}`;
    return (fs.existsSync(filePath));
}
const deleteSessionState = async (session_name) => {
    const filePath = `${folderPath}/${session_name}`;
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return false;
        }
        console.log('File deleted successfully!');
        return true;
    });
}
const getSession = async (session_name) => {
    const filePath = `${folderPath}/${session_name}`;
    try {
        const fileContent = fs.readFileSync(filePath);
        return JSON.parse(fileContent.toString());
    } catch (err) {
        console.error(err);
        return null;
    }
}

const getAccessToken = async (user) => {
    const options = {
        expiresIn: '365d',
        aud: process.env.APP_DOMAIN,// set the audience claim
        sub:user.id.toString(),
    };

    let payload={
        id:user.id,
        client_id:user.client_id,
        site:user.site,
        session : user.session,

    }
    return global.app.jwt.sign(payload,options);
}

const getAdminAccessToken = async (user) => {
    const options = {
        expiresIn: '365d',
        aud: process.env.APP_DOMAIN,// set the audience claim
        sub:user.id.toString(),
    };
    return global.app.jwt.sign(user,options);
}

// E
module.exports = {
    getSession,
    getSessionState,
    getSecurityToken,
    createSecurityToken,
    deleteSessionState,
    getAccessToken,
    getAdminAccessToken
};