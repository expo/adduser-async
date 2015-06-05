var child_process = require('child_process');
var execAsync = require('exec-async');

function userExistsAsync(username) {
  return execAsync('id', {u: username}).then(function () {
    return true;
  }, function () { 
    return false; 
  });
}

function addUserAsync(username) {
  return execAsync('adduser', {'disabled-password': true, gecos: '', _: [username]}, {spaceForLongArgs: true})
}

function addUserIfNotExistsAsync(username) {
  return userExistsAsync(username).then(function (exists) {
    if (exists) {
      return false;
    } else {
      return addUserAsync(username).then(function (_output) {
        return true;
      });
    }
  });
}

module.exports = addUserAsync;
module.exports.addUserIfNotExistsAsync = addUserIfNotExistsAsync;
module.exports.userExistsAsync = userExistsAsync;
module.exports.addUserAsync = addUserAsync;
