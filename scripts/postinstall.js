'use strict';
/**
 * 用于覆盖覆盖文件，应对需要对第三方库进行修改的情况。
 * 配置文件的路径必须设置以项目主目录的相对路径。
 */

// 配置
const config = [
  //rn-fetch-blob支持拷贝文件夹
  {
    source: 'scripts/overwrite/rn-fetch-blob/index.js',
    dist: 'node_modules/rn-fetch-blob/index.js'
  },
  {
    source: 'scripts/overwrite/rn-fetch-blob/fs.js',
    dist: 'node_modules/rn-fetch-blob/fs.js'
  },
  {
    source: 'scripts/overwrite/rn-fetch-blob/RNFetchBlob.java',
    dist: 'node_modules/rn-fetch-blob/android/src/main/java/com/RNFetchBlob/RNFetchBlob.java'
  },
  {
    source: 'scripts/overwrite/rn-fetch-blob/RNFetchBlobFS.java',
    dist: 'node_modules/rn-fetch-blob/android/src/main/java/com/RNFetchBlob/RNFetchBlobFS.java'
  },
];

const fs = require('fs-extra');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');

const log = (pass, msg) => {
  const prefix = pass ? chalk.green.bgBlack('PASS') : chalk.red.bgBlack('FAIL');
  const color = pass ? chalk.blue : chalk.red;
  console.log(prefix, color(msg));
};

config.forEach((item, index) => {
  if (item.source && item.dist) {
    const source = path.join(process.cwd(), item.source);
    const dist = path.join(process.cwd(), item.dist);
    fs.copy(source, dist, function(err) {
      if (err) {
        log(false, `overwrite file '${item.source}' => '${item.dist}'\n${err}`);
      } else {
        log(true, `overwrite file '${item.source}' => '${item.dist}'`);
      }
    });
  }
});
