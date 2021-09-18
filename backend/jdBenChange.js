// /*
//  * 简化版京东日资产变动通知
//  * 支持环境变量控制每次发送的账号个数，默认为2
//  * 环境变量为：JD_BEAN_CHANGE_SENDNUM
//  * By X1a0He
//  * https://github.com/X1a0He/jd_scripts_fixed
//  * */
// const axios = require('axios');
// let cookie = '';
// let assets = {
//     todayIncome: 0,
//     yesterdayIncome: 0,
//     yesterdayExpenditure: 0,
//     currentJingdou: 0,
//     currentRedenvelope: 0.0,
//     jingxiRedenvelope: 0.0,
//     speedRedenvelope: 0.0,
//     jdRedenvelope: 0.0,
//     // <p>今日收入：{{ todayIncome }}</p>
//     // <p>昨日收入：{{ yesterdayIncome }}</p>
//     // <p>昨日支出：{{ yesterdayExpenditure }}</p>
//     // <p>当前京🐶：{{ currentJingdou }}</p>
//     // <p>当前🧧：{{ currentRedenvelope }}</p>
//     // <p>京喜🧧：{{ jingxiRedenvelope }}</p>
//     // <p>极速🧧：{{ speedRedenvelope }}</p>
//     // <p>京东🧧：{{ jdRedenvelope }}</p>
// }
// module.exports.bean = async () => {
//     $.beanPage = 1;
//     $.todayIncome = 0
//     $.todayExpenditure = 0
//     $.yestodayIncome = 0
//     $.yestodayExpenditure = 0
//     $.beanFlag = true;
//     $.beanCount = 0;
//     do {
//         getJingBeanBalanceDetail($.beanPage);
//         await $.wait(500)
//     } while($.beanFlag === true)
// }
// //获取京豆数据
// function getJingBeanBalanceDetail(page) {
//     // 前一天的0:0:0时间戳
//     const yesterdayTimeStamp = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 - (24 * 60 * 60 * 1000);
//     // 今天0:0:0时间戳
//     const todayTimeStamp = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000;
//     const options = {
//         url: 'https://api.m.jd.com/client.action?functionId=getJingBeanBalanceDetail',
//         body: `body=%7B%22pageSize%22%3A%2220%22%2C%22page%22%3A%22${page}%22%7D&appid=ld`,
//         headers: {
//             "Cookie": cookie,
//             Connection: "keep-alive",
//             "User-Agent": "jdapp;iPhone;10.1.2;15.0;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
//         },
//     }
//     const result = await axios(options, (err, resp, data) => {
//         try {
//             if (err) {
//                 if (JSON.stringify(err) !== '\"read ECONNRESET\"') {
//                     console.log(JSON.stringify(err))
//                     console.log('API请求失败，请检查网路重试')
//                 }
//             } else {
//                 if (data) {
//                     data = JSON.parse(data);
//                     if (data.code === "0") {
//                         $.beanPage++;
//                         let detailList = data.detailList;
//                         if (detailList && detailList.length > 0) {
//                             for (let item of detailList) {
//                                 const date = item.date.replace(/-/g, '/') + "+08:00";
//                                 if (new Date(date).getTime() >= todayTimeStamp && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes('扣赠'))) {
//                                     Number(item.amount) > 0 ? $.todayIncome += Number(item.amount) : $.todayExpenditure += Number(item.amount);
//                                 } else if (yesterdayTimeStamp <= new Date(date).getTime() && new Date(date).getTime() < todayTimeStamp && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes('扣赠'))) {
//                                     Number(item.amount) > 0 ? $.yestodayIncome += Number(item.amount) : $.yestodayExpenditure += Number(item.amount)
//                                 } else if (yesterdayTimeStamp > new Date(date).getTime()) {
//                                     beanFlag = false;
//                                     break;
//                                 }
//                             }
//                         } else beanFlag = false;
//                     } else if (data && data.code === "3") {
//                         console.log(`cookie已过期，或者填写不规范`)
//                         beanFlag = false;
//                     } else {
//                         console.log(`未知情况：${JSON.stringify(data)}`);
//                         console.log(`未知情况，跳出`)
//                         beanFlag = false;
//                     }
//                 } else {
//                     console.log(`京东服务器返回空数据`)
//                 }
//             }
//         } catch (e) {
//             console.log(e, resp)
//         } finally {
//             resolve(data);
//         }
//     })
// }