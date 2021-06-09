import Vue from 'vue'

/**
 * 背景：在开发中，有些提交保存按钮有时候会在短时间内被点击多次重复请求接口
 * 需求：防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。
 * 目的：防止按钮重复点击
*/
const preventReClick = Vue.directive('preventReClick', {
  inserted: function (el, binding) {
    el.addEventListener('click', () => {
      //判断是否触发按钮不可操作逻辑
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000) // 传入绑定值就使用，默认3000毫秒内不可重复触发
      }
    })
  }
})

//一键复制文本内容，用于鼠标右键粘贴
const copyText = Vue.directive('copyText', {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候给出提示
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止iOS下自动唤起键盘,同时将textarea移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      //javascript的复制文本
      const result = document.execCommand('copy')
      if (result) {
        console.log('复制成功')
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },

  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },

  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
})

export default {
  preventReClick,
  copyText
}