/**
 * 数字转换为科学技术法
 * 比如： 100000转换位100,000
 * @param {data} 需要转换的数字
*/
export const scienceMathMethods = (data) => {
    var reg = /(?=(\B)(\d{3})+$)/g;
    let strNumDigit;
    let strNumInternet;
    data = data || '';
    data = typeof data === 'string'  ? data : data + '';
    if(data.indexOf('.') !== -1) {
        strNumInternet = data.substr(0, data.indexOf('.'));
        strNumDigit = data.substr(data.indexOf('.'), data.length);
        return `${strNumInternet.replace(reg, ",")}${strNumDigit}`
    }
    return data.replace(reg, ",");
}