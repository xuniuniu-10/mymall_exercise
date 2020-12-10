/*
 * @Author: your name
 * @Date: 2020-12-08 09:09:03
 * @LastEditTime: 2020-12-08 09:17:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \goprojectd:\vue\mymall\vue.config.js
 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
