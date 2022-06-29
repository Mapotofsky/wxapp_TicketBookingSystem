// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event)//传入航班的id和余票数
    if(event.tickettype=='经济舱'){
        return await db.collection('flight')
        .doc(event.id)//航班的_id
        .update({
            data:{
                eco_currentticket:event.currentticket
            }
        })
    }
    else{
        return await db.collection('flight')
        .doc(event.id)//航班的_id
        .update({
            data:{
                first_currentticket:event.currentticket
            }
        })
    }
}