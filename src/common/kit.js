const fail = require('../static/img/fail.png')
export const newProcess = function (process, { waitMsg = '请等待...', successMsg = null, errorMsg = null } = {}) {
  return params => new Promise((resolve, reject) => {
    process(params)
      .then((result) => {
        if (successMsg) {
          uni.showToast({
            title: successMsg,
            duration: 1000
          });
        } else {
          uni.hideToast();
        }
        resolve(result);
      })
      .catch((error) => {
        error = error.toString().replace('Error:', '');
        console.log('方法', process);
        console.log('异常', error);
        uni.showToast({
          title: error,
          image:fail,
          duration: 1000
        });
        reject(error);
      })
  });
}