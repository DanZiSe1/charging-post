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
function formatDuring(mss,type) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  if (hours >= 1 && hours <= 9) {
    hours = "0" + hours;
  } else if (hours == 0) {
    hours = "00";
  }
  if (minutes >= 1 && minutes <= 9) {
    minutes = "0" + minutes;
  } else if (minutes == 0) {
    minutes = "00"
  }
  if (seconds >= 1 && seconds <= 9) {
    seconds = "0" + seconds;
  } else if (seconds == 0) {
    seconds = "00"
  }
  // console.log(hours + ":" + minutes + ":" + seconds);
  // 充电中(结束充电00:15:12)
  if (type == 1) {
    if (days <= 0) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return days + ":" + hours + ":" + minutes + ":" + seconds;
    }
  } else if (type == 2) { // 订单详情(1小时30分)
    if (days <= 0) {
      return hours + "小时" + minutes + "分" + seconds + "秒";
    } else {
      return days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
    }
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
      if (elesplit[1]) {
        var electricValue = elesplit[1].replace(/:/g, "");
        var finalElectricValue = parseFloat(electricValue).toFixed(2);
        electricObj['elemoney'] = "电费：" + finalElectricValue;
      }
      
      newServiceFee.forEach(function (element, sindex) {
        var servicesplit = element.split(" 服务费");
        if (servicesplit[1]) {
          var servicesValue = servicesplit[1].replace(/:/g, "");
          var finalServicesValue = parseFloat(servicesValue).toFixed(2);
          if (elesplit[0] == servicesplit[0]) {
            electricObj['servemoney'] = "服务费：" + finalServicesValue;
          }
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
      // electricObj['servemoney'] = "服务费" + elesplit[1];
      if (elesplit[1]) {
        var electricValue = elesplit[1].replace(/:/g, "");
        var finalElectricValue = parseFloat(electricValue).toFixed(2);
        electricObj['servemoney'] = "服务费：" + finalElectricValue;
      }

      newElectricityFee.forEach(function (element, sindex) {
        var servicesplit = element.split(" 电费");
        if (servicesplit[1]) {
          var servicesValue = servicesplit[1].replace(/:/g, "");
          var finalServicesValue = parseFloat(servicesValue).toFixed(2);
          if (elesplit[0] == servicesplit[0]) {
            electricObj['elemoney'] = "电费：" + finalServicesValue;
          }
        }
        // if (elesplit[0] == servicesplit[0]) {
        //   electricObj['elemoney'] = "电费" + servicesplit[1];
        // }
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