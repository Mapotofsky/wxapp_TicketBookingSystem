// const formatTime = date=>{
//     const hour = date.getHours()
//     const minute = date.getMinutes()
//     return [hour,minute].map(formatNumber).join(':')
// }
 const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    let hour = date.getHours()
    hour = hour < 10 ? ('0' + hour) : hour
    let minute = date.getMinutes()
    minute = minute < 10 ? ('0' + minute) : minute
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

 const formatTime2 = date=>{
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [hour,minute].map(formatNumber).join(':')
}
  
 const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  const formatTime3 = dateForm => {
    if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
        return "";
    }else{
        var dateee = new Date(dateForm ).toJSON();
        var date = new Date(+new Date(dateee)+ 8 * 3600 * 1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        return new Date(date);
    }}
  
  const getMinutes = dateForm =>{
    if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
      return "";
    }else{
      if(dateForm < 10){
        dateForm = ""+"0"+dateForm;
      }
      return dateForm;
  }}

  
  module.exports = {
    formatTime: formatTime,
    formatTime2:formatTime2,
    formatTime3:formatTime3,
    getMinutes:getMinutes
  }