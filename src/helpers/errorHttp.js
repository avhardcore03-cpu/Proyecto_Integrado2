const errorHttp = (status, message) => Object.assign(new Error(message), { status });
module.exports = errorHttp;
