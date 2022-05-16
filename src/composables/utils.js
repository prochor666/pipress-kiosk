export const utils = function () {

    const sleep = function (ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    };


    const formatBytes = function (bytes, decimals = 2) {

        if (bytes === 0) {

            return '0 B';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };


    const decodePath = function (path) {

        return path.split('|').join('/');
    };


    const encodePath = function (path) {

        return path.split('/').join('|');
    };


    const keeper = function (key, value = false) {

        if (value === false) {

            return JSON.parse(localStorage.getItem(key));
        } else {

            localStorage.setItem(key, JSON.stringify(value));
        }
    };


    return {
        sleep,
        keeper,
        decodePath,
        encodePath,
        formatBytes,
    }
}

export default utils;
