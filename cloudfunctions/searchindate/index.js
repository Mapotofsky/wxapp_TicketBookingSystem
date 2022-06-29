// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let selectday = event.deptime
    return await db.collection('flight')
  .where({
  //date是字段，数据类型是date对象，_.gte和_.lte这里要传入date对象，
  //使用例如2020-08-04 12:13:29格式传入
    deptime:_.and(_.gte(new Date(selectday+" 00:00:00")),_.lte(new Date(selectday+" 23:59:59")))
  })
  .get()
}