/**
 * 作者：Hyhello
 * 时间：2021-06-08
 * 描述：vBusy
 */
 import { get, set, debounce, throttle } from 'lodash';

 /**
  *
  * @param { string } target
  * @param { array } list
  * @returns { boolean }
  */
 const oneOf = (target, list = []) => {
     return list.includes(target);
 };

 // 支持事件集合
 const EVENT_LIST = ['click', 'dblclick'];

 export default {
     name: 'VBusy',
     abstract: true,
     props: {
         // type
         type: {
             type: String,
             default: 'throttle',
             validator (val) {
                 return oneOf(val, ['debounce', 'throttle']);
             }
         },
         // 触发事件
         trigger: {
             type: String,
             default: 'click',
             validator: function validator(val) {
                 return oneOf(val, EVENT_LIST);
             }
         },
         // 间隔， ms
         interval: {
             type: Number,
             default: 300
         },
         // debounce | throttle 配置，参考lodash
         options: {
             type: Object,
             default: () => {
                 return {};
             }
         }
     },
     computed: {
         callback () {
             const { type } = this;
             return type === 'debounce' ? debounce : throttle;
         }
     },
     render() {
         const { trigger, $slots, callback, interval, options } = this;
         const vnode = $slots.default[0];
         if (!vnode) {
             console.error('components vBusy must be contain one element');
         }
         const triggerKey = `data.on[${trigger}]`;
         const eventFn = get(vnode, triggerKey);
         if (typeof eventFn === 'function') {
             set(vnode, triggerKey, callback(eventFn, interval, options));
         }
         return vnode;
     }
 };