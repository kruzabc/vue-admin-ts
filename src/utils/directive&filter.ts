/* 自定义指令 + 自定义过滤器 */
import Vue, { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

import store from '@/store/index';
import {USER_DIRECTIVE_TYPE, USER_FILTER_TYPE} from '@/utils/enum';

const directives: any  = {};

directives[USER_DIRECTIVE_TYPE.PERMISSION] = {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        const permission = store.getters.permission;
        if (permission.indexOf(Number(binding.value)) >= 0) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    },
    update(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        const permission = store.getters.permission;
        if (permission.indexOf(Number(binding.value)) >= 0) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    }
};

directives[USER_DIRECTIVE_TYPE.TITLE] = {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        el.style.display = 'none';
        el.innerHTML = `<!-- 页面标题：${binding.value} -->`;
        document.title = binding.expression;
    }
};

const filters: any  = {};
filters[USER_FILTER_TYPE.MONEY] = (val: string) => {
    let value = Number(val);
    if (isNaN(value)) {
        value = 0;
    }
    let isNeg = '';
    if (value < 0) {
        isNeg = '-';
        value = Math.abs(value);
    }
    let value2 = String(value);
    const pos = value2.indexOf('.');
    if (pos > 0) {
        value2 = (value2 + '00').slice(0, value2.indexOf('.') + 3);
    } else {
        value2 = (value2 + '.00');
    }
    const re = /\d{1,3}(?=(\d{3})+$)/g;
    return isNeg + value2.replace(/^(\d+)((\.\d+)?)$/, (s: any, s1: any, s2: any) => s1.replace(re, '$&,') + s2);
};

filters[USER_FILTER_TYPE.MOBILE_MASK] = (val: string) => {
    if (!val) {
        return val;
    }
    return val.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
};

export { directives, filters };
