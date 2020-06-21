const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 封装时分秒
function formatDuring(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = ((mss % (1000 * 60)) / 1000).toFixed();
  if (hours >= 1 && hours <= 9) {
		hours = "0" + hours;
  }
  if (minutes >= 1 && minutes <= 9) {
		minutes = "0" + minutes;
  }
  if (seconds >= 1 && seconds <= 9) {
		seconds = "0" + seconds;
  }
  // console.log(hours + ":" + minutes + ":" + seconds);
  if (days <= 0){
    return hours + ":" + minutes + ":" + seconds;
  } else {
    return days + "天" + hours + ":" + minutes + ":" + seconds;
  } 
}

// 服务费，电费封装
function electricServeMoney(electricityFee, serviceFee) {
  var resultDataArr = [];
  var newElectricityFee = electricityFee.split(",");
  var newServiceFee = serviceFee.split(",");

  if (electricityFee.length >= serviceFee.length) {
    newElectricityFee.forEach(function (e, eindex) {
      var electricObj = {};
      var elesplit = e.split(" 电费");
      electricObj['time'] = elesplit[0];
      electricObj['elemoney'] = "电费" + elesplit[1];
      newServiceFee.forEach(function (element, sindex) {
        var servicesplit = element.split(" 服务费");
        if (elesplit[0] == servicesplit[0]) {
          electricObj['servemoney'] = "服务费" + servicesplit[1];
        }
      });
      resultDataArr.push(electricObj);
    });
    return resultDataArr;
  } else {
    newServiceFee.forEach(function (e, eindex) {
      var electricObj = {};
      var elesplit = e.split(" 服务费");
      electricObj['time'] = elesplit[0];
      electricObj['servemoney'] = "服务费" + elesplit[1];
      newElectricityFee.forEach(function (element, sindex) {
        var servicesplit = element.split(" 电费");
        if (elesplit[0] == servicesplit[0]) {
          electricObj['elemoney'] = "电费" + servicesplit[1];
        }
      });
      resultDataArr.push(electricObj);
    });
    return resultDataArr;
  }
}

module.exports = {
  formatTime: formatTime,
  electricServeMoney,
  formatDuring,
}