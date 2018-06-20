
// find all files in /store
const files = require.context('@/store/modules', true, /^\.\/.*\.js$/);
const filenames = files.keys();

const modules = {};// 最终modules对象
for (let val of filenames){ // 遍历store下获取到的文件
  let res = files(val);// 获取文件里面的输出内容
  let moduleVal = {};
  moduleVal.namespaced = true;
  Object.assign(moduleVal, res);
  let moduleName = val.replace(/^\.\//, '').replace(/\.js$/, '').split('/');// 截取name
  modules[moduleName] = moduleVal
}

export default modules;
