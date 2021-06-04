/**
 * 时间转换格式
 * @param dataParams 日期
 * @param type yyyy-mm-dd hh:mm:dd 年-月-日 时:分:秒
 */
export function dateFomatter(dataParams, type) {
  if (!dataParams) return;
  let date = new Date(dataParams);
  let year = date.getFullYear().toString(); //获取完整的年份(4位)
  let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  let day = date.getDate(); //获取当前日(1-31)
  let hour = date.getHours(); //获取当前小时数(0-23)
  let minus = date.getMinutes(); //获取当前分钟数(0-59)
  let sends = date.getSeconds(); //获取当前秒数(0-59)
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minus < 10) {
    minus = "0" + minus;
  }
  if (sends < 10) {
    sends = "0" + sends;
  }
  switch (type) {
    case "yyyy":
      return `${year}`;
    case "mm":
      return `${month}`;
    case "hh:mm":
      return `${hour}:${minus}`;
    case "mm-dd":
        return `${month}-${day}`;
    case "yyyy-mm":
      return `${year}-${month}`;
    case "hh:mm:dd":
      return `${hour}:${minus}:${sends}`;
    case "mm-dd hh:mm":
      return `${month}-${day} ${hour}:${minus}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    case "yyyy-mm-dd hh:mm:dd":
      return `${year}-${month}-${day} ${hour}:${minus}:${sends}`;
  }
}

/**
 * 根据日期返回周几
 * @param {*} dataParams 日期
 * @returns 星期几
 */
export function getWeek(dataParams) {
  if (!dataParams) return;
  let objWeeks = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  let date = new Date(dataParams);
  let days = date.getDay();
  return objWeeks[days]
}
