/**
 * 作者：yeshengqiang
 * 时间：2019-04-11
 * 描述：progress
 */
/* eslint-disable no-undef */
class Progress {
    constructor (id, options) {
        const $dpr = window.devicePixelRatio || 1;
        this.$el = _.isElement(id)
                    ? id
                    : document.getElementById(id);
        const rect = this.$el.getBoundingClientRect();
        if (!rect.height) {
            console.warn('parent box must has height');
            return;
        }
        options = options || {};
        // 校验
        Progress._checkConf(options);
        this._canvas = document.createElement('canvas');
        this._canvas.innerHTML = '您的浏览器版本不支持canvas';
        this.$el.appendChild(this._canvas);
        this.$ctx = this._canvas.getContext('2d');
        // 配置
        this.$conf = {
            ...Progress.defaults,
            ...options
        };
        this.$conf.width = rect.width;
        this.$conf.height = rect.height;
        // 配置宽高
        this._canvas.width = rect.width * $dpr;
        this._canvas.height = rect.height * $dpr;
        this._canvas.style.width = this.$conf.width + 'px';
        this._canvas.style.height = this.$conf.height + 'px';
        this.$ctx.scale($dpr, $dpr);
        // 配置最大的radius
        const offset = Math.max.apply(null, [this.$conf.outCircleWidth / 2, this.$conf.inCircleWidth / 2, this.$conf.startCap ? this.$conf.startCapRadius : 0, this.$conf.endCap ? this.$conf.endCapRadius : 0]);
        this.$conf.radius = Math.min(this.$conf.width / 2, this.$conf.height / 2) - offset;
        // 开始draw
        this._update(this.$conf.value);
    }
    static defaults = {
        outCircleWidth: 6,
        inCircleWidth: 6,
        outCircleStyle: '#91e0db',
        inCircleStyle: '#FFFFFF',
        startCap: false,
        endCap: true,
        fontSize: 36,
        value: 0,
        fontColor: '#FFFFFF',
        startCapRadius: 5,
        startCapStyle: '#FFFFFF',
        endCapRadius: 5,
        endCapStyle: '#FFFFFF'
    };
    static _checkConf (options) {
        const CONF = this.defaults;
        Object.keys(CONF).forEach(function (item, key) {
            const type = typeof CONF[item];
            // eslint-disable-next-line valid-typeof
            if (options[item] && typeof options[item] !== type) {
                throw new TypeError('[Progress] options property：' + item + ' is not a ' + type);
            }
        });
    };
    static percentToPI (percent) {
        return percent * 3.6 * Math.PI / 180;
    }
    _update (n) {
        this.$ctx.clearRect(0, 0, this.$conf.width, this.$conf.height);
        this.$ctx.beginPath();
        this.$ctx.save();
        this.$ctx.translate(this.$conf.width / 2, this.$conf.height / 2);
        this.$ctx.rotate(-Math.PI / 2);
        n = n < 0 ? 0 : Math.min(100, n);
        this._outCircle();

        this._inCircle(n);
        this._percentText(n);
        if (this.$conf.startCap) {
            this._startCap();
        }
        if (this.$conf.endCap) {
            this._endCap(n);
        }
        this.$ctx.restore();
    }
    _outCircle () {
        this.$ctx.beginPath();
        this.$ctx.save();
        this.$ctx.lineWidth = this.$conf.outCircleWidth;
        this.$ctx.strokeStyle = this.$conf.outCircleStyle;
        this.$ctx.arc(0, 0, this.$conf.radius, 0, Math.PI * 2, false);
        this.$ctx.stroke();
        this.$ctx.restore();
    }
    _inCircle (n) {
        this.$ctx.beginPath();
        this.$ctx.save();
        this.$ctx.lineWidth = this.$conf.inCircleWidth;
        this.$ctx.lineCap = 'round';
        this.$ctx.strokeStyle = this.$conf.inCircleStyle;
        this.$ctx.arc(0, 0, this.$conf.radius, 0, Progress.percentToPI(n), false);

        this.$ctx.stroke();
        this.$ctx.restore();
    }
    _percentText (n) {
        this.$ctx.beginPath();
        this.$ctx.save();
        this.$ctx.rotate(Math.PI / 2);
        this.$ctx.font = this.$conf.fontSize + 'px Arial';
        this.$ctx.fillStyle = this.$conf.fontColor;
        this.$ctx.textAlign = 'center';
        this.$ctx.textBaseline = 'middle';
        // this.$ctx.measureText('M').width / 2
        this.$ctx.fillText(`${Math.floor(n)}%`, 0, 0);
        this.$ctx.restore();
    }
    _startCap () {
        this.$ctx.beginPath();
        this.$ctx.save();
        this.$ctx.fillStyle = this.$conf.startCapStyle;
        this.$ctx.arc(this.$conf.radius, 0, this.$conf.startCapRadius, 0, Math.PI * 2, false);
        this.$ctx.fill();

        this.$ctx.restore();
    }
    _endCap (n) {
        this.$ctx.beginPath();
        this.$ctx.save();
        this.$ctx.fillStyle = this.$conf.endCapStyle;
        const PI = Progress.percentToPI(n);
        const x = Math.cos(PI) * this.$conf.radius;
        const y = Math.sin(PI) * this.$conf.radius;
        this.$ctx.arc(x, y, this.$conf.endCapRadius, 0, Math.PI * 2, false);
        this.$ctx.fill();
        this.$ctx.restore();
    }
};

const progress = {
    name: 'Progress',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        start: {
            type: Boolean,
            default: true
        },
        percent: {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            speed: 0.5,
            timer: null,
            frameVal: 0
        };
    },
    render (h) {
        return h(this.tag, {
            attrs: {
                'rule': 'progress'
            }
        });
    },
    mounted () {
        this._progress = new Progress(this.$el);
        if (this.start) {
            this._count();
        }
    },
    methods: {
        _count () {
            let sign = this.frameVal < this.percent ? 1 : -1;
            this.frameVal += sign * this.speed;
            this._progress._update(this.frameVal);
            if (Math.abs(this.frameVal) - Math.abs(this.percent)) {
                this.clear();
                this.timer = window.requestAnimationFrame(this._count.bind(this));
            }
        },
        clear () {
            if (this.timer) {
                window.cancelAnimationFrame(this.timer);
                this.timer = null;
            }
        }
    },
    watch: {
        percent (val) {
            this._count();
        },
        start (val) {
            if (val) {
                this._count();
            }
        }
    },
    beforeDestroy () {
        this.clear();
    }
};

// export default progress
