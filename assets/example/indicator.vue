/**
 * 作者：yeshengqiang
 * 时间：2017-11-13
 * 描述：loading
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .hy-spin-panel {
        position: absolute;
        background-color: transparent;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        text-align: center;
        &.is-fullscreen {
            position: fixed;
        }
        .hy-spin-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 15px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 5px;
            transform: translate(-50%, -50%);
            span {
                display: inline-block;
                text-align: center;
            }
            &.has-spin-text {
                padding: 20px;
            }
            .hy-indicator-spin {
                display: inline-block;
                text-align: center;
                .hy-spinner-snake {
                    height: 34px;
                    width: 34px;
                    animation: identifier .8s infinite linear;
                    border: 4px solid transparent;
                    border-radius: 50%;
                    border-top-color: #ccc;
                    border-left-color: #ccc;
                    border-bottom-color: #ccc;
                }
            }
        }
        .hy-spin-text {
            color: $white;
            display: block;
            text-align: center;
            margin-top: 10px;
            font-size: 16px;
        }
    }
    @keyframes identifier {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(1turn);
        }
    }
</style>
<template>
    <transition name="fade">
        <div :class="classes" v-show="visible" :style="styles">
            <div class="hy-spin-icon" :class="{'has-spin-text': !!text}">
                <span class="hy-indicator-spin">
                    <div class="hy-spinner-snake"></div>
                </span>
                <p class="hy-spin-text" v-if="!!text">{{text}}</p>
            </div>
        </div>
    </transition>
</template>
<script>
    const prefixCls = 'hy-spin-panel';

    export default {
        name: 'Indicator',
        data () {
            return {
                text: null,               // 文本
                visible: false,           // 展示
                fullscreen: true          // 是否全屏
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`is-fullscreen`]: this.fullscreen
                    }
                ];
            },
            styles () {
                let style = {};
                if (this.background) {
                    style.background = this.background;
                }
                return style;
            }
        },
        methods: {
            open (str) {
                if (!str) this.text = null;
                if (typeof str === 'string') {
                    this.text = str;
                }
                this.visible = true;
            },
            close () {
                this.visible = false;
            }
        }
    };
</script>
