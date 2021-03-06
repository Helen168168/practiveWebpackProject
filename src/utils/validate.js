import request from '@/router/axios'

const validate = {
  /**
   * 邮箱
   * @param {*} s
   */
  email(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
  },

  /**
   * 电话号码
   * @param {*} s
   */
  phone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
  },

  /**
   * 密码
   * @param {*} s
  */
  password(s) {
    return /^(\w){6,64}$/.test(s)
  },

  /* 合法uri */
  checkURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval)
  },

  /* 小写字母 */
  checkLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str)
  },

  /* 大写字母 */
  checkUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str)
  },

  /* 大小写字母 */
  checkAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str)
  },

  /* 验证pad还是pc */
  checkPcOrPad() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone',
      'SymbianOS', 'Windows Phone',
      'iPad', 'iPod'
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break
      }
    }
    return flag
  },

  /**
   * check email
   * @param email
   * @returns {boolean}
  */
  checkEmail(email) {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  },

  /**
   * 判断身份证号码
  */
  cardId(code) {
    let list = [];
    let result = true;
    let msg = '';
    let city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    };
    if (!this.checkNull(code)) {
      if (code.length == 18) {
        if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
          msg = '证件号码格式错误'
        } else if (!city[code.substr(0, 2)]) {
          msg = '地址编码错误'
        } else {
          // 18位身份证需要验证最后一位校验位
          code = code.split('');
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          // 校验位
          let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
          let sum = 0;
          let ai = 0;
          let wi = 0;
          for (let i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi
          }
          if (parity[sum % 11] != code[17]) {
            msg = '证件号码校验位错误'
          } else {
            result = false
          }
        }
      } else {
        msg = '证件号码长度不为18位'
      }
    } else {
      msg = '证件号码不能为空'
    }
    list.push(result);
    list.push(msg);
    return list
  },

  /**
   * 判断手机号码是否正确
  */
  checkMobile(phone) {
    let list = [];
    let result = true;
    let msg = '';
    let isPhone = /^0\d{2,3}-?\d{7,8}$/;
    //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    let isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
    if (!this.checkNull(phone)) {
      if (phone.length == 11) {
        if (isPhone.test(phone)) {
          msg = '手机号码格式不正确';
        } else {
          result = false;
        }
      } else {
        msg = '手机号码长度不为11位';
      }
    } else {
      msg = '手机号码不能为空';
    }
    list.push(result);
    list.push(msg);
    return list;
  },

  /**
   * 判断姓名是否正确
  */
  checkName(name) {
    let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(name)) return false;
    return true
  },


  /**
   * 判断是否为整数
  */
  checkDigits(num) {
    let regName = /[^\d]/g;
    if (!regName.test(num)) return false;
    return true;
  },


  /**
   * 判断是否为小数
  */
  checkNumber(num) {
    let regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
    return true;
  },

  /**
   * 判断是否为空
  */
  checkNull(val) {
    if (typeof val === 'boolean') {
      return false
    }
    if (typeof val === 'number') {
      return false
    }
    if (val instanceof Array) {
      if (val.length == 0) return true
    } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true
    } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
      return false
    }
    return false
  }
};
export default validate
