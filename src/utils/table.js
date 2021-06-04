/**
 * 合并table列
 * @param {data} table数据
 * @param {spanColNum} 需要合并的列数
 * @param {spanField} 合并的条件
 */
export const combineCol = (data, spanColNum, spanField) => {
  let spanArr = []; //定义在vue的data中
  let pos = 0;
  let temData = {};

  if (data.length == null) {
    return;
  }
  for (var i = 0; i < data.length; i++) {
    temData = {};
    if (i === 0) {
      spanColNum.forEach((item) => {
        temData[item] = 1;
      });
      spanArr.push(temData);
      pos = 0;
    } else {
      if (data[i][spanField] === data[i - 1][spanField]) {
        spanColNum.forEach((item) => {
          spanArr[pos][item] = spanArr[pos][item] + 1;
          temData[item] = 0;
        });
        spanArr.push(temData);
      } else {
        spanColNum.forEach((item) => {
          temData[item] = 1;
        });
        spanArr.push(temData);
        pos = i;
      }
    }
  }
  return { spanArr: spanArr, pos: pos };
};
