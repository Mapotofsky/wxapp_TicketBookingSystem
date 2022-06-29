// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
    return await db.collection('order').add({
        data: {
          ordertime:new Date(),
          account:event.account,
          userId:event.userId,
          idofchooseman:event.idofchooseman,
          flight:event.flight,
          contactname:event.contactname,
          contactphone:event.contactphone,
          tickettype:event.tickettype
        }
      })
}