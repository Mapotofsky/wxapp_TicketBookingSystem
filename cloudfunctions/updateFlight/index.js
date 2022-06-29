// 云函数入口文件
const cloud = require('wx-server-sdk')
// const util = require('../../util/util.js');

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.deptime)
    await db.collection('flight').doc(event.id)
    .update({
        data: {
            flightname: event.flightname,
            dep: event.dep,
            arr: event.arr,
            deptime: new Date(event.deptime),
            arrtime: new Date(event.arrtime),
            eco_price: event.eco_price,
            eco_totalticket: event.eco_totalticket,
            first_price: event.first_price,
            first_totalticket: event.first_totalticket,
        },
    });
}