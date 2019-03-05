/*!
 * UEditor
 * version: ueditor
 * build: Wed Aug 10 2016 11:06:02 GMT+0800 (CST)
 */

(function(){

// editor.js
UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};

var baidu = window.baidu || {};

window.baidu = baidu;

window.UE = baidu.editor =  window.UE || {};

UE.plugins = {};

UE.commands = {};

UE.instants = {};

UE.I18N = {};

UE._customizeUI = {};

UE.version = "1.4.3";

var dom = UE.dom = {};

// core/browser.js
/**
 * 浏览器判断模块
 * @file
 * @module UE.browser
 * @since 1.2.6.1
 */

/**
 * 提供浏览器检测的模块
 * @unfile
 * @module UE.browser
 */
var browser = UE.browser = function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
        /**
         * @property {boolean} ie 检测当前浏览器是否为IE
         * @example
         * ```javascript
         * if ( UE.browser.ie ) {
         *     console.log( '当前浏览器是IE' );
         * }
         * ```
         */
        ie		:  /(msie\s|trident.*rv:)([\w.]+)/.test(agent),

        /**
         * @property {boolean} opera 检测当前浏览器是否为Opera
         * @example
         * ```javascript
         * if ( UE.browser.opera ) {
         *     console.log( '当前浏览器是Opera' );
         * }
         * ```
         */
        opera	: ( !!opera && opera.version ),

        /**
         * @property {boolean} webkit 检测当前浏览器是否是webkit内核的浏览器
         * @example
         * ```javascript
         * if ( UE.browser.webkit ) {
         *     console.log( '当前浏览器是webkit内核浏览器' );
         * }
         * ```
         */
        webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),

        /**
         * @property {boolean} mac 检测当前浏览器是否是运行在mac平台下
         * @example
         * ```javascript
         * if ( UE.browser.mac ) {
         *     console.log( '当前浏览器运行在mac平台下' );
         * }
         * ```
         */
        mac	: ( agent.indexOf( 'macintosh' ) > -1 ),

        /**
         * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
         * @example
         * ```javascript
         * if ( UE.browser.quirks ) {
         *     console.log( '当前浏览器运行处于“怪异模式”' );
         * }
         * ```
         */
        quirks : ( document.compatMode == 'BackCompat' )
    };

    /**
    * @property {boolean} gecko 检测当前浏览器内核是否是gecko内核
    * @example
    * ```javascript
    * if ( UE.browser.gecko ) {
    *     console.log( '当前浏览器内核是gecko内核' );
    * }
    * ```
    */
    browser.gecko =( navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);

    var version = 0;

    // Internet Explorer 6.0+
    if ( browser.ie ){

        var v1 =  agent.match(/(?:msie\s([\w.]+))/);
        var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
        if(v1 && v2 && v1[1] && v2[1]){
            version = Math.max(v1[1]*1,v2[1]*1);
        }else if(v1 && v1[1]){
            version = v1[1]*1;
        }else if(v2 && v2[1]){
            version = v2[1]*1;
        }else{
            version = 0;
        }

        browser.ie11Compat = document.documentMode == 11;
        /**
         * @property { boolean } ie9Compat 检测浏览器模式是否为 IE9 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie9Compat ) {
         *     console.log( '当前浏览器运行在IE9兼容模式下' );
         * }
         * ```
         */
        browser.ie9Compat = document.documentMode == 9;

        /**
         * @property { boolean } ie8 检测浏览器是否是IE8浏览器
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie8 ) {
         *     console.log( '当前浏览器是IE8浏览器' );
         * }
         * ```
         */
        browser.ie8 = !!document.documentMode;

        /**
         * @property { boolean } ie8Compat 检测浏览器模式是否为 IE8 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie8Compat ) {
         *     console.log( '当前浏览器运行在IE8兼容模式下' );
         * }
         * ```
         */
        browser.ie8Compat = document.documentMode == 8;

        /**
         * @property { boolean } ie7Compat 检测浏览器模式是否为 IE7 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie7Compat ) {
         *     console.log( '当前浏览器运行在IE7兼容模式下' );
         * }
         * ```
         */
        browser.ie7Compat = ( ( version == 7 && !document.documentMode )
                || document.documentMode == 7 );

        /**
         * @property { boolean } ie6Compat 检测浏览器模式是否为 IE6 模式 或者怪异模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * ```javascript
         * if ( UE.browser.ie6Compat ) {
         *     console.log( '当前浏览器运行在IE6模式或者怪异模式下' );
         * }
         * ```
         */
        browser.ie6Compat = ( version < 7 || browser.quirks );

        browser.ie9above = version > 8;

        browser.ie9below = version < 9;

        browser.ie11above = version > 10;

        browser.ie11below = version < 11;

    }

    // Gecko.
    if ( browser.gecko ){
        var geckoRelease = agent.match( /rv:([\d\.]+)/ );
        if ( geckoRelease )
        {
            geckoRelease = geckoRelease[1].split( '.' );
            version = geckoRelease[0] * 10000 + ( geckoRelease[1] || 0 ) * 100 + ( geckoRelease[2] || 0 ) * 1;
        }
    }

    /**
     * @property { Number } chrome 检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号
     * @warning 如果浏览器不是chrome， 则该值为undefined
     * @example
     * ```javascript
     * if ( UE.browser.chrome ) {
     *     console.log( '当前浏览器是Chrome' );
     * }
     * ```
     */
    if (/chrome\/(\d+\.\d)/i.test(agent)) {
        browser.chrome = + RegExp['\x241'];
    }

    /**
     * @property { Number } safari 检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号
     * @warning 如果浏览器不是safari， 则该值为undefined
     * @example
     * ```javascript
     * if ( UE.browser.safari ) {
     *     console.log( '当前浏览器是Safari' );
     * }
     * ```
     */
    if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)){
    	browser.safari = + (RegExp['\x241'] || RegExp['\x242']);
    }


    // Opera 9.50+
    if ( browser.opera )
        version = parseFloat( opera.version() );

    // WebKit 522+ (Safari 3+)
    if ( browser.webkit )
        version = parseFloat( agent.match( / applewebkit\/(\d+)/ )[1] );

    /**
     * @property { Number } version 检测当前浏览器版本号
     * @remind
     * <ul>
     *     <li>IE系列返回值为5,6,7,8,9,10等</li>
     *     <li>gecko系列会返回10900，158900等</li>
     *     <li>webkit系列会返回其build号 (如 522等)</li>
     * </ul>
     * @example
     * ```javascript
     * console.log( '当前浏览器版本号是： ' + UE.browser.version );
     * ```
     */
    browser.version = version;

    /**
     * @property { boolean } isCompatible 检测当前浏览器是否能够与UEditor良好兼容
     * @example
     * ```javascript
     * if ( UE.browser.isCompatible ) {
     *     console.log( '浏览器与UEditor能够良好兼容' );
     * }
     * ```
     */
    browser.isCompatible =
        !browser.mobile && (
        ( browser.ie && version >= 6 ) ||
        ( browser.gecko && version >= 10801 ) ||
        ( browser.opera && version >= 9.5 ) ||
        ( browser.air && version >= 1 ) ||
        ( browser.webkit && version >= 522 ) ||
        false );
    return browser;
}();
//快捷方式
var ie = browser.ie,
    webkit = browser.webkit,
    gecko = browser.gecko,
    opera = browser.opera;

// core/utils.js
/**
 * 工具函数包
 * @file
 * @module UE.utils
 * @since 1.2.6.1
 */

/**
 * UEditor封装使用的静态工具函数
 * @module UE.utils
 * @unfile
 */

var utils = UE.utils = {

    /**
     * 用给定的迭代器遍历对象
     * @method each
     * @param { Object } obj 需要遍历的对象
     * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
     * @example
     * ```javascript
     * var demoObj = {
     *     key1: 1,
     *     key2: 2
     * };
     *
     * //output: key1: 1, key2: 2
     * UE.utils.each( demoObj, funciton ( value, key ) {
     *
     *     console.log( key + ":" + value );
     *
     * } );
     * ```
     */

    /**
     * 用给定的迭代器遍历数组或类数组对象
     * @method each
     * @param { Array } array 需要遍历的数组或者类数组
     * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
     * @example
     * ```javascript
     * var divs = document.getElmentByTagNames( "div" );
     *
     * //output: 0: DIV, 1: DIV ...
     * UE.utils.each( divs, funciton ( value, key ) {
     *
     *     console.log( key + ":" + value.tagName );
     *
     * } );
     * ```
     */
    each : function(obj, iterator, context) {
        if (obj == null) return;
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if(iterator.call(context, obj[i], i, obj) === false)
                    return false;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if(iterator.call(context, obj[key], key, obj) === false)
                        return false;
                }
            }
        }
    },

    /**
     * 以给定对象作为原型创建一个新对象
     * @method makeInstance
     * @param { Object } protoObject 该对象将作为新创建对象的原型
     * @return { Object } 新的对象， 该对象的原型是给定的protoObject对象
     * @example
     * ```javascript
     *
     * var protoObject = { sayHello: function () { console.log('Hello UEditor!'); } };
     *
     * var newObject = UE.utils.makeInstance( protoObject );
     * //output: Hello UEditor!
     * newObject.sayHello();
     * ```
     */
    makeInstance:function (obj) {
        var noop = new Function();
        noop.prototype = obj;
        obj = new noop;
        noop.prototype = null;
        return obj;
    },

    /**
     * 将source对象中的属性扩展到target对象上
     * @method extend
     * @remind 该方法将强制把source对象上的属性复制到target对象上
     * @see UE.utils.extend(Object,Object,Boolean)
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
     * @return { Object } 返回target对象
     * @example
     * ```javascript
     *
     * var target = { name: 'target', sex: 1 },
     *      source = { name: 'source', age: 17 };
     *
     * UE.utils.extend( target, source );
     *
     * //output: { name: 'source', sex: 1, age: 17 }
     * console.log( target );
     *
     * ```
     */

    /**
     * 将source对象中的属性扩展到target对象上， 根据指定的isKeepTarget值决定是否保留目标对象中与
     * 源对象属性名相同的属性值。
     * @method extend
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
     * @param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
     * @return { Object } 返回target对象
     * @example
     * ```javascript
     *
     * var target = { name: 'target', sex: 1 },
     *      source = { name: 'source', age: 17 };
     *
     * UE.utils.extend( target, source, true );
     *
     * //output: { name: 'target', sex: 1, age: 17 }
     * console.log( target );
     *
     * ```
     */
    extend:function (t, s, b) {
        if (s) {
            for (var k in s) {
                if (!b || !t.hasOwnProperty(k)) {
                    t[k] = s[k];
                }
            }
        }
        return t;
    },

    /**
     * 将给定的多个对象的属性复制到目标对象target上
     * @method extend2
     * @remind 该方法将强制把源对象上的属性复制到target对象上
     * @remind 该方法支持两个及以上的参数， 从第二个参数开始， 其属性都会被复制到第一个参数上。 如果遇到同名的属性，
     *          将会覆盖掉之前的值。
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object... } source 源对象， 支持多个对象， 该对象的属性会被附加到target对象上
     * @return { Object } 返回target对象
     * @example
     * ```javascript
     *
     * var target = {},
     *     source1 = { name: 'source', age: 17 },
     *     source2 = { title: 'dev' };
     *
     * UE.utils.extend2( target, source1, source2 );
     *
     * //output: { name: 'source', age: 17, title: 'dev' }
     * console.log( target );
     *
     * ```
     */
    extend2:function (t) {
        var a = arguments;
        for (var i = 1; i < a.length; i++) {
            var x = a[i];
            for (var k in x) {
                if (!t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    },

    /**
     * 模拟继承机制， 使得subClass继承自superClass
     * @method inherits
     * @param { Object } subClass 子类对象
     * @param { Object } superClass 超类对象
     * @warning 该方法只能让subClass继承超类的原型， subClass对象自身的属性和方法不会被继承
     * @return { Object } 继承superClass后的子类对象
     * @example
     * ```javascript
     * function SuperClass(){
     *     this.name = "小李";
     * }
     *
     * SuperClass.prototype = {
     *     hello:function(str){
     *         console.log(this.name + str);
     *     }
     * }
     *
     * function SubClass(){
     *     this.name = "小张";
     * }
     *
     * UE.utils.inherits(SubClass,SuperClass);
     *
     * var sub = new SubClass();
     * //output: '小张早上好!
     * sub.hello("早上好!");
     * ```
     */
    inherits:function (subClass, superClass) {
        var oldP = subClass.prototype,
            newP = utils.makeInstance(superClass.prototype);
        utils.extend(newP, oldP, true);
        subClass.prototype = newP;
        return (newP.constructor = subClass);
    },

    /**
     * 用指定的context对象作为函数fn的上下文
     * @method bind
     * @param { Function } fn 需要绑定上下文的函数对象
     * @param { Object } content 函数fn新的上下文对象
     * @return { Function } 一个新的函数， 该函数作为原始函数fn的代理， 将完成fn的上下文调换工作。
     * @example
     * ```javascript
     *
     * var name = 'window',
     *     newTest = null;
     *
     * function test () {
     *     console.log( this.name );
     * }
     *
     * newTest = UE.utils.bind( test, { name: 'object' } );
     *
     * //output: object
     * newTest();
     *
     * //output: window
     * test();
     *
     * ```
     */
    bind:function (fn, context) {
        return function () {
            return fn.apply(context, arguments);
        };
    },

    /**
     * 创建延迟指定时间后执行的函数fn
     * @method defer
     * @param { Function } fn 需要延迟执行的函数对象
     * @param { int } delay 延迟的时间， 单位是毫秒
     * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
     *           而不能保证刚好到达延迟时间时执行。
     * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
     * @example
     * ```javascript
     * var start = 0;
     *
     * function test(){
     *     console.log( new Date() - start );
     * }
     *
     * var testDefer = UE.utils.defer( test, 1000 );
     * //
     * start = new Date();
     * //output: (大约在1000毫秒之后输出) 1000
     * testDefer();
     * ```
     */

    /**
     * 创建延迟指定时间后执行的函数fn, 如果在延迟时间内再次执行该方法， 将会根据指定的exclusion的值，
     * 决定是否取消前一次函数的执行， 如果exclusion的值为true， 则取消执行，反之，将继续执行前一个方法。
     * @method defer
     * @param { Function } fn 需要延迟执行的函数对象
     * @param { int } delay 延迟的时间， 单位是毫秒
     * @param { Boolean } exclusion 如果在延迟时间内再次执行该函数，该值将决定是否取消执行前一次函数的执行，
     *                     值为true表示取消执行， 反之则将在执行前一次函数之后才执行本次函数调用。
     * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
     *           而不能保证刚好到达延迟时间时执行。
     * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
     * @example
     * ```javascript
     *
     * function test(){
     *     console.log(1);
     * }
     *
     * var testDefer = UE.utils.defer( test, 1000, true );
     *
     * //output: (两次调用仅有一次输出) 1
     * testDefer();
     * testDefer();
     * ```
     */
    defer:function (fn, delay, exclusion) {
        var timerID;
        return function () {
            if (exclusion) {
                clearTimeout(timerID);
            }
            timerID = setTimeout(fn, delay);
        };
    },

    /**
     * 获取元素item在数组array中首次出现的位置, 如果未找到item， 则返回-1
     * @method indexOf
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @param { Array } array 需要查找的数组对象
     * @param { * } item 需要在目标数组中查找的值
     * @return { int } 返回item在目标数组array中首次出现的位置， 如果在数组中未找到item， 则返回-1
     * @example
     * ```javascript
     * var item = 1,
     *     arr = [ 3, 4, 6, 8, 1, 1, 2 ];
     *
     * //output: 4
     * console.log( UE.utils.indexOf( arr, item ) );
     * ```
     */

    /**
     * 获取元素item数组array中首次出现的位置, 如果未找到item， 则返回-1。通过start的值可以指定搜索的起始位置。
     * @method indexOf
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @param { Array } array 需要查找的数组对象
     * @param { * } item 需要在目标数组中查找的值
     * @param { int } start 搜索的起始位置
     * @return { int } 返回item在目标数组array中的start位置之后首次出现的位置， 如果在数组中未找到item， 则返回-1
     * @example
     * ```javascript
     * var item = 1,
     *     arr = [ 3, 4, 6, 8, 1, 2, 8, 3, 2, 1, 1, 4 ];
     *
     * //output: 9
     * console.log( UE.utils.indexOf( arr, item, 5 ) );
     * ```
     */
    indexOf:function (array, item, start) {
        var index = -1;
        start = this.isNumber(start) ? start : 0;
        this.each(array, function (v, i) {
            if (i >= start && v === item) {
                index = i;
                return false;
            }
        });
        return index;
    },

    /**
     * 移除数组array中所有的元素item
     * @method removeItem
     * @param { Array } array 要移除元素的目标数组
     * @param { * } item 将要被移除的元素
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @example
     * ```javascript
     * var arr = [ 4, 5, 7, 1, 3, 4, 6 ];
     *
     * UE.utils.removeItem( arr, 4 );
     * //output: [ 5, 7, 1, 3, 6 ]
     * console.log( arr );
     *
     * ```
     */
    removeItem:function (array, item) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                i--;
            }
        }
    },

    /**
     * 删除字符串str的首尾空格
     * @method trim
     * @param { String } str 需要删除首尾空格的字符串
     * @return { String } 删除了首尾的空格后的字符串
     * @example
     * ```javascript
     *
     * var str = " UEdtior ";
     *
     * //output: 9
     * console.log( str.length );
     *
     * //output: 7
     * console.log( UE.utils.trim( " UEdtior " ).length );
     *
     * //output: 9
     * console.log( str.length );
     *
     *  ```
     */
    trim:function (str) {
        return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
    },

    /**
     * 将字符串str以','分隔成数组后，将该数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
     * @method listToMap
     * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
     * @param { String } str 该字符串将被以','分割为数组， 然后进行转化
     * @return { Object } 转化之后的hash对象
     * @example
     * ```javascript
     *
     * //output: Object {UEdtior: 1, UEDTIOR: 1, Hello: 1, HELLO: 1}
     * console.log( UE.utils.listToMap( 'UEdtior,Hello' ) );
     *
     * ```
     */

    /**
     * 将字符串数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
     * @method listToMap
     * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
     * @param { Array } arr 字符串数组
     * @return { Object } 转化之后的hash对象
     * @example
     * ```javascript
     *
     * //output: Object {UEdtior: 1, UEDTIOR: 1, Hello: 1, HELLO: 1}
     * console.log( UE.utils.listToMap( [ 'UEdtior', 'Hello' ] ) );
     *
     * ```
     */
    listToMap:function (list) {
        if (!list)return {};
        list = utils.isArray(list) ? list : list.split(',');
        for (var i = 0, ci, obj = {}; ci = list[i++];) {
            obj[ci.toUpperCase()] = obj[ci] = 1;
        }
        return obj;
    },

    /**
     * 将str中的html符号转义,将转义“'，&，<，"，>”五个字符
     * @method unhtml
     * @param { String } str 需要转义的字符串
     * @return { String } 转义后的字符串
     * @example
     * ```javascript
     * var html = '<body>&</body>';
     *
     * //output: &lt;body&gt;&amp;&lt;/body&gt;
     * console.log( UE.utils.unhtml( html ) );
     *
     * ```
     */
    unhtml:function (str, reg) {
        return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
            if (b) {
                return a;
            } else {
                return {
                    '<':'&lt;',
                    '&':'&amp;',
                    '"':'&quot;',
                    '>':'&gt;',
                    "'":'&#39;'
                }[a]
            }

        }) : '';
    },
    /**
     * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
     * @param  { String } str 需要转义的字符串
     * @param  { RegExp } reg 自定义的正则
     * @return { String }     转义后的字符串
     */
    unhtmlForUrl:function (str, reg) {
        return str ? str.replace(reg || /[<">']/g, function (a) {
            return {
                '<':'&lt;',
                '&':'&amp;',
                '"':'&quot;',
                '>':'&gt;',
                "'":'&#39;'
            }[a]

        }) : '';
    },

    /**
     * 将str中的转义字符还原成html字符
     * @see UE.utils.unhtml(String);
     * @method html
     * @param { String } str 需要逆转义的字符串
     * @return { String } 逆转义后的字符串
     * @example
     * ```javascript
     *
     * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
     *
     * //output: <body>&</body>
     * console.log( UE.utils.html( str ) );
     *
     * ```
     */
    html:function (str) {
        return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;':'<',
                '&amp;':'&',
                '&quot;':'"',
                '&gt;':'>',
                '&#39;':"'",
                '&nbsp;':' '
            }[m]
        }) : '';
    },

    /**
     * 将css样式转换为驼峰的形式
     * @method cssStyleToDomStyle
     * @param { String } cssName 需要转换的css样式名
     * @return { String } 转换成驼峰形式后的css样式名
     * @example
     * ```javascript
     *
     * var str = 'border-top';
     *
     * //output: borderTop
     * console.log( UE.utils.cssStyleToDomStyle( str ) );
     *
     * ```
     */
    cssStyleToDomStyle:function () {
        var test = document.createElement('div').style,
            cache = {
                'float':test.cssFloat != undefined ? 'cssFloat' : test.styleFloat != undefined ? 'styleFloat' : 'float'
            };

        return function (cssName) {
            return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace(/-./g, function (match) {
                return match.charAt(1).toUpperCase();
            }));
        };
    }(),

    /**
     * 动态加载文件到doc中
     * @method loadFile
     * @param { DomDocument } document 需要加载资源文件的文档对象
     * @param { Object } options 加载资源文件的属性集合， 取值请参考代码示例
     * @example
     * ```javascript
     *
     * UE.utils.loadFile( document, {
     *     src:"test.js",
     *     tag:"script",
     *     type:"text/javascript",
     *     defer:"defer"
     * } );
     *
     * ```
     */

    /**
     * 动态加载文件到doc中，加载成功后执行的回调函数fn
     * @method loadFile
     * @param { DomDocument } document 需要加载资源文件的文档对象
     * @param { Object } options 加载资源文件的属性集合， 该集合支持的值是script标签和style标签支持的所有属性。
     * @param { Function } fn 资源文件加载成功之后执行的回调
     * @warning 对于在同一个文档中多次加载同一URL的文件， 该方法会在第一次加载之后缓存该请求，
     *           在此之后的所有同一URL的请求， 将会直接触发回调。
     * @example
     * ```javascript
     *
     * UE.utils.loadFile( document, {
     *     src:"test.js",
     *     tag:"script",
     *     type:"text/javascript",
     *     defer:"defer"
     * }, function () {
     *     console.log('加载成功');
     * } );
     *
     * ```
     */
    loadFile:function () {
        var tmpList = [];

        function getItem(doc, obj) {
            try {
                for (var i = 0, ci; ci = tmpList[i++];) {
                    if (ci.doc === doc && ci.url == (obj.src || obj.href)) {
                        return ci;
                    }
                }
            } catch (e) {
                return null;
            }

        }

        return function (doc, obj, fn) {
            var item = getItem(doc, obj);
            if (item) {
                if (item.ready) {
                    fn && fn();
                } else {
                    item.funs.push(fn)
                }
                return;
            }
            tmpList.push({
                doc:doc,
                url:obj.src || obj.href,
                funs:[fn]
            });
            if (!doc.body) {
                var html = [];
                for (var p in obj) {
                    if (p == 'tag')continue;
                    html.push(p + '="' + obj[p] + '"')
                }
                doc.write('<' + obj.tag + ' ' + html.join(' ') + ' ></' + obj.tag + '>');
                return;
            }
            if (obj.id && doc.getElementById(obj.id)) {
                return;
            }
            var element = doc.createElement(obj.tag);
            delete obj.tag;
            for (var p in obj) {
                element.setAttribute(p, obj[p]);
            }
            element.onload = element.onreadystatechange = function () {
                if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                    item = getItem(doc, obj);
                    if (item.funs.length > 0) {
                        item.ready = 1;
                        for (var fi; fi = item.funs.pop();) {
                            fi();
                        }
                    }
                    element.onload = element.onreadystatechange = null;
                }
            };
            element.onerror = function () {
                throw Error('The load ' + (obj.href || obj.src) + ' fails,check the url settings of file ueditor.config.js ')
            };
            doc.getElementsByTagName("head")[0].appendChild(element);
        }
    }(),

    /**
     * 判断obj对象是否为空
     * @method isEmptyObject
     * @param { * } obj 需要判断的对象
     * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
     *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
     * @return { Boolean } 对象是否为空
     * @example
     * ```javascript
     *
     * //output: true
     * console.log( UE.utils.isEmptyObject( {} ) );
     *
     * //output: true
     * console.log( UE.utils.isEmptyObject( [] ) );
     *
     * //output: true
     * console.log( UE.utils.isEmptyObject( "" ) );
     *
     * //output: false
     * console.log( UE.utils.isEmptyObject( { key: 1 } ) );
     *
     * //output: false
     * console.log( UE.utils.isEmptyObject( [1] ) );
     *
     * //output: false
     * console.log( UE.utils.isEmptyObject( "1" ) );
     *
     * ```
     */
    isEmptyObject:function (obj) {
        if (obj == null) return true;
        if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    },

    /**
     * 把rgb格式的颜色值转换成16进制格式
     * @method fixColor
     * @param { String } rgb格式的颜色值
     * @param { String }
     * @example
     * rgb(255,255,255)  => "#ffffff"
     */
    fixColor:function (name, value) {
        if (/color/i.test(name) && /rgba?/.test(value)) {
            var array = value.split(",");
            if (array.length > 3)
                return "";
            value = "#";
            for (var i = 0, color; color = array[i++];) {
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length == 1 ? "0" + color : color;
            }
            value = value.toUpperCase();
        }
        return  value;
    },
    /**
     * 只针对border,padding,margin做了处理，因为性能问题
     * @public
     * @function
     * @param {String}    val style字符串
     */
    optCss:function (val) {
        var padding, margin, border;
        val = val.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function (str, key, name, val) {
            if (val.split(' ').length == 1) {
                switch (key) {
                    case 'padding':
                        !padding && (padding = {});
                        padding[name] = val;
                        return '';
                    case 'margin':
                        !margin && (margin = {});
                        margin[name] = val;
                        return '';
                    case 'border':
                        return val == 'initial' ? '' : str;
                }
            }
            return str;
        });

        function opt(obj, name) {
            if (!obj) {
                return '';
            }
            var t = obj.top , b = obj.bottom, l = obj.left, r = obj.right, val = '';
            if (!t || !l || !b || !r) {
                for (var p in obj) {
                    val += ';' + name + '-' + p + ':' + obj[p] + ';';
                }
            } else {
                val += ';' + name + ':' +
                    (t == b && b == l && l == r ? t :
                        t == b && l == r ? (t + ' ' + l) :
                            l == r ? (t + ' ' + l + ' ' + b) : (t + ' ' + r + ' ' + b + ' ' + l)) + ';'
            }
            return val;
        }

        val += opt(padding, 'padding') + opt(margin, 'margin');
        return val.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, '').replace(/;([ \n\r\t]+)|\1;/g, ';')
            .replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (a, b) {
                return b ? b + ";;" : ';'
            });
    },

    /**
     * 克隆对象
     * @method clone
     * @param { Object } source 源对象
     * @return { Object } source的一个副本
     */

    /**
     * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
     * @method clone
     * @param { Object } source 源对象
     * @param { Object } target 目标对象
     * @return { Object } 附加了source对象所有属性的target对象
     */
    clone:function (source, target) {
        var tmp;
        target = target || {};
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                tmp = source[i];
                if (typeof tmp == 'object') {
                    target[i] = utils.isArray(tmp) ? [] : {};
                    utils.clone(source[i], target[i])
                } else {
                    target[i] = tmp;
                }
            }
        }
        return target;
    },

    /**
     * 把cm／pt为单位的值转换为px为单位的值
     * @method transUnitToPx
     * @param { String } 待转换的带单位的字符串
     * @return { String } 转换为px为计量单位的值的字符串
     * @example
     * ```javascript
     *
     * //output: 500px
     * console.log( UE.utils.transUnitToPx( '20cm' ) );
     *
     * //output: 27px
     * console.log( UE.utils.transUnitToPx( '20pt' ) );
     *
     * ```
     */
    transUnitToPx:function (val) {
        if (!/(pt|cm)/.test(val)) {
            return val
        }
        var unit;
        val.replace(/([\d.]+)(\w+)/, function (str, v, u) {
            val = v;
            unit = u;
        });
        switch (unit) {
            case 'cm':
                val = parseFloat(val) * 25;
                break;
            case 'pt':
                val = Math.round(parseFloat(val) * 96 / 72);
        }
        return val + (val ? 'px' : '');
    },

    /**
     * 在dom树ready之后执行给定的回调函数
     * @method domReady
     * @remind 如果在执行该方法的时候， dom树已经ready， 那么回调函数将立刻执行
     * @param { Function } fn dom树ready之后的回调函数
     * @example
     * ```javascript
     *
     * UE.utils.domReady( function () {
     *
     *     console.log('123');
     *
     * } );
     *
     * ```
     */
    domReady:function () {

        var fnArr = [];

        function doReady(doc) {
            //确保onready只执行一次
            doc.isReady = true;
            for (var ci; ci = fnArr.pop(); ci()) {
            }
        }

        return function (onready, win) {
            win = win || window;
            var doc = win.document;
            onready && fnArr.push(onready);
            if (doc.readyState === "complete") {
                doReady(doc);
            } else {
                doc.isReady && doReady(doc);
                if (browser.ie && browser.version != 11) {
                    (function () {
                        if (doc.isReady) return;
                        try {
                            doc.documentElement.doScroll("left");
                        } catch (error) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        doReady(doc);
                    })();
                    win.attachEvent('onload', function () {
                        doReady(doc)
                    });
                } else {
                    doc.addEventListener("DOMContentLoaded", function () {
                        doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
                        doReady(doc);
                    }, false);
                    win.addEventListener('load', function () {
                        doReady(doc)
                    }, false);
                }
            }

        }
    }(),

    /**
     * 动态添加css样式
     * @method cssRule
     * @param { String } 节点名称
     * @grammar UE.utils.cssRule('添加的样式的节点名称',['样式'，'放到哪个document上'])
     * @grammar UE.utils.cssRule('body','body{background:#ccc}') => null  //给body添加背景颜色
     * @grammar UE.utils.cssRule('body') =>样式的字符串  //取得key值为body的样式的内容,如果没有找到key值先关的样式将返回空，例如刚才那个背景颜色，将返回 body{background:#ccc}
     * @grammar UE.utils.cssRule('body',document) => 返回指定key的样式，并且指定是哪个document
     * @grammar UE.utils.cssRule('body','') =>null //清空给定的key值的背景颜色
     */
    cssRule:browser.ie && browser.version != 11 ? function (key, style, doc) {
        var indexList, index;
        if(style === undefined || style && style.nodeType && style.nodeType == 9){
            //获取样式
            doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
            indexList = doc.indexList || (doc.indexList = {});
            index = indexList[key];
            if(index !==  undefined){
                return doc.styleSheets[index].cssText
            }
            return undefined;
        }
        doc = doc || document;
        indexList = doc.indexList || (doc.indexList = {});
        index = indexList[key];
        //清除样式
        if(style === ''){
            if(index!== undefined){
                doc.styleSheets[index].cssText = '';
                delete indexList[key];
                return true
            }
            return false;
        }

        //添加样式
        if(index!== undefined){
            sheetStyle =  doc.styleSheets[index];
        }else{
            sheetStyle = doc.createStyleSheet('', index = doc.styleSheets.length);
            indexList[key] = index;
        }
        sheetStyle.cssText = style;
    }: function (key, style, doc) {
        var head, node;
        if(style === undefined || style && style.nodeType && style.nodeType == 9){
            //获取样式
            doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
            node = doc.getElementById(key);
            return node ? node.innerHTML : undefined;
        }
        doc = doc || document;
        node = doc.getElementById(key);

        //清除样式
        if(style === ''){
            if(node){
                node.parentNode.removeChild(node);
                return true
            }
            return false;
        }

        //添加样式
        if(node){
            node.innerHTML = style;
        }else{
            node = doc.createElement('style');
            node.id = key;
            node.innerHTML = style;
            doc.getElementsByTagName('head')[0].appendChild(node);
        }
    },
    sort:function(array,compareFn){
        compareFn = compareFn || function(item1, item2){ return item1.localeCompare(item2);};
        for(var i= 0,len = array.length; i<len; i++){
            for(var j = i,length = array.length; j<length; j++){
                if(compareFn(array[i], array[j]) > 0){
                    var t = array[i];
                    array[i] = array[j];
                    array[j] = t;
                }
            }
        }
        return array;
    },
    serializeParam:function (json) {
        var strArr = [];
        for (var i in json) {
            //忽略默认的几个参数
            if(i=="method" || i=="timeout" || i=="async") continue;
            //传递过来的对象和函数不在提交之列
            if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
                strArr.push( encodeURIComponent(i) + "="+encodeURIComponent(json[i]) );
            } else if (utils.isArray(json[i])) {
                //支持传数组内容
                for(var j = 0; j < json[i].length; j++) {
                    strArr.push( encodeURIComponent(i) + "[]="+encodeURIComponent(json[i][j]) );
                }
            }
        }
        return strArr.join("&");
    },
    formatUrl:function (url) {
        var u = url.replace(/&&/g, '&');
        u = u.replace(/\?&/g, '?');
        u = u.replace(/&$/g, '');
        u = u.replace(/&#/g, '#');
        u = u.replace(/&+/g, '&');
        return u;
    },
    isCrossDomainUrl:function (url) {
        var a = document.createElement('a');
        a.href = url;
        if (browser.ie) {
            a.href = a.href;
        }
        return !(a.protocol == location.protocol && a.hostname == location.hostname &&
        (a.port == location.port || (a.port == '80' && location.port == '') || (a.port == '' && location.port == '80')));
    },
    clearEmptyAttrs : function(obj){
        for(var p in obj){
            if(obj[p] === ''){
                delete obj[p]
            }
        }
        return obj;
    },
    str2json : function(s){

        if (!utils.isString(s)) return null;
        if (window.JSON) {
            return JSON.parse(s);
        } else {
            return (new Function("return " + utils.trim(s || '')))();
        }

    },
    json2str : (function(){

        if (window.JSON) {

            return JSON.stringify;

        } else {

            var escapeMap = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"' : '\\"',
                "\\": '\\\\'
            };

            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function (match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00"
                            + Math.floor(c / 16).toString(16)
                            + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }

            function encodeArray(source) {
                var result = ["["],
                    l = source.length,
                    preComma, i, item;

                for (i = 0; i < l; i++) {
                    item = source[i];

                    switch (typeof item) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if(preComma) {
                                result.push(',');
                            }
                            result.push(utils.json2str(item));
                            preComma = 1;
                    }
                }
                result.push("]");
                return result.join("");
            }

            function pad(source) {
                return source < 10 ? '0' + source : source;
            }

            function encodeDate(source){
                return '"' + source.getFullYear() + "-"
                + pad(source.getMonth() + 1) + "-"
                + pad(source.getDate()) + "T"
                + pad(source.getHours()) + ":"
                + pad(source.getMinutes()) + ":"
                + pad(source.getSeconds()) + '"';
            }

            return function (value) {
                switch (typeof value) {
                    case 'undefined':
                        return 'undefined';

                    case 'number':
                        return isFinite(value) ? String(value) : "null";

                    case 'string':
                        return encodeString(value);

                    case 'boolean':
                        return String(value);

                    default:
                        if (value === null) {
                            return 'null';
                        } else if (utils.isArray(value)) {
                            return encodeArray(value);
                        } else if (utils.isDate(value)) {
                            return encodeDate(value);
                        } else {
                            var result = ['{'],
                                encode = utils.json2str,
                                preComma,
                                item;

                            for (var key in value) {
                                if (Object.prototype.hasOwnProperty.call(value, key)) {
                                    item = value[key];
                                    switch (typeof item) {
                                        case 'undefined':
                                        case 'unknown':
                                        case 'function':
                                            break;
                                        default:
                                            if (preComma) {
                                                result.push(',');
                                            }
                                            preComma = 1;
                                            result.push(encode(key) + ':' + encode(item));
                                    }
                                }
                            }
                            result.push('}');
                            return result.join('');
                        }
                }
            };
        }

    })()

};
/**
 * 判断给定的对象是否是字符串
 * @method isString
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是字符串
 */

/**
 * 判断给定的对象是否是数组
 * @method isArray
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是数组
 */

/**
 * 判断给定的对象是否是一个Function
 * @method isFunction
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是Function
 */

/**
 * 判断给定的对象是否是Number
 * @method isNumber
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是Number
 */

/**
 * 判断给定的对象是否是一个正则表达式
 * @method isRegExp
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是正则表达式
 */

/**
 * 判断给定的对象是否是一个普通对象
 * @method isObject
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是普通对象
 */
utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function (v) {
    UE.utils['is' + v] = function (obj) {
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
});


// core/EventBase.js
/**
 * UE采用的事件基类
 * @file
 * @module UE
 * @class EventBase
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

/**
 * UE采用的事件基类，继承此类的对应类将获取addListener,removeListener,fireEvent方法。
 * 在UE中，Editor以及所有ui实例都继承了该类，故可以在对应的ui对象以及editor对象上使用上述方法。
 * @unfile
 * @module UE
 * @class EventBase
 */

/**
 * 通过此构造器，子类可以继承EventBase获取事件监听的方法
 * @constructor
 * @example
 * ```javascript
 * UE.EventBase.call(editor);
 * ```
 */
var EventBase = UE.EventBase = function () {};

EventBase.prototype = {

    /**
     * 注册事件监听器
     * @method addListener
     * @param { String } types 监听的事件名称，同时监听多个事件使用空格分隔
     * @param { Function } fn 监听的事件被触发时，会执行该回调函数
     * @waining 事件被触发时，监听的函数假如返回的值恒等于true，回调函数的队列中后面的函数将不执行
     * @example
     * ```javascript
     * editor.addListener('selectionchange',function(){
     *      console.log("选区已经变化！");
     * })
     * editor.addListener('beforegetcontent aftergetcontent',function(type){
     *         if(type == 'beforegetcontent'){
     *             //do something
     *         }else{
     *             //do something
     *         }
     *         console.log(this.getContent) // this是注册的事件的编辑器实例
     * })
     * ```
     * @see UE.EventBase:fireEvent(String)
     */
    addListener:function (types, listener) {
        types = utils.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            getListener(this, ti, true).push(listener);
        }
    },

    on : function(types, listener){
      return this.addListener(types,listener);
    },
    off : function(types, listener){
        return this.removeListener(types, listener)
    },
    trigger:function(){
        return this.fireEvent.apply(this,arguments);
    },
    /**
     * 移除事件监听器
     * @method removeListener
     * @param { String } types 移除的事件名称，同时移除多个事件使用空格分隔
     * @param { Function } fn 移除监听事件的函数引用
     * @example
     * ```javascript
     * //changeCallback为方法体
     * editor.removeListener("selectionchange",changeCallback);
     * ```
     */
    removeListener:function (types, listener) {
        types = utils.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            utils.removeItem(getListener(this, ti) || [], listener);
        }
    },

    /**
     * 触发事件
     * @method fireEvent
     * @param { String } types 触发的事件名称，同时触发多个事件使用空格分隔
     * @remind 该方法会触发addListener
     * @return { * } 返回触发事件的队列中，最后执行的回调函数的返回值
     * @example
     * ```javascript
     * editor.fireEvent("selectionchange");
     * ```
     */

    /**
     * 触发事件
     * @method fireEvent
     * @param { String } types 触发的事件名称，同时触发多个事件使用空格分隔
     * @param { *... } options 可选参数，可以传入一个或多个参数，会传给事件触发的回调函数
     * @return { * } 返回触发事件的队列中，最后执行的回调函数的返回值
     * @example
     * ```javascript
     *
     * editor.addListener( "selectionchange", function ( type, arg1, arg2 ) {
     *
     *     console.log( arg1 + " " + arg2 );
     *
     * } );
     *
     * //触发selectionchange事件， 会执行上面的事件监听器
     * //output: Hello World
     * editor.fireEvent("selectionchange", "Hello", "World");
     * ```
     */
    fireEvent:function () {
        var types = arguments[0];
        types = utils.trim(types).split(' ');
        for (var i = 0, ti; ti = types[i++];) {
            var listeners = getListener(this, ti),
                r, t, k;
            if (listeners) {
                k = listeners.length;
                while (k--) {
                    if(!listeners[k])continue;
                    t = listeners[k].apply(this, arguments);
                    if(t === true){
                        return t;
                    }
                    if (t !== undefined) {
                        r = t;
                    }
                }
            }
            if (t = this['on' + ti.toLowerCase()]) {
                r = t.apply(this, arguments);
            }
        }
        return r;
    }
};
/**
 * 获得对象所拥有监听类型的所有监听器
 * @unfile
 * @module UE
 * @since 1.2.6.1
 * @method getListener
 * @public
 * @param { Object } obj  查询监听器的对象
 * @param { String } type 事件类型
 * @param { Boolean } force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
 * @return { Array } 监听器数组
 */
function getListener(obj, type, force) {
    var allListeners;
    type = type.toLowerCase();
    return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
        && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
}



// core/dtd.js
///import editor.js
///import core/dom/dom.js
///import core/utils.js
/**
 * dtd html语义化的体现类
 * @constructor
 * @namespace dtd
 */
var dtd = dom.dtd = (function() {
    function _( s ) {
        for (var k in s) {
            s[k.toUpperCase()] = s[k];
        }
        return s;
    }
    var X = utils.extend2;
    var A = _({isindex:1,fieldset:1}),
        B = _({input:1,button:1,select:1,textarea:1,label:1}),
        C = X( _({a:1}), B ),
        D = X( {iframe:1}, C ),
        E = _({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),
        F = _({ins:1,del:1,script:1,style:1}),
        G = X( _({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}), F ),
        H = X( _({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}), G ),
        I = X( _({p:1}), H ),
        J = X( _({iframe:1}), H, B ),
        K = _({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),

        L = X( _({a:0}), J ),//a不能被切开，所以把他
        M = _({tr:1}),
        N = _({'#':1}),
        O = X( _({param:1}), K ),
        P = X( _({form:1}), A, D, E, I ),
        Q = _({li:1,ol:1,ul:1}),
        R = _({style:1,script:1}),
        S = _({base:1,link:1,meta:1,title:1}),
        T = X( S, R ),
        U = _({head:1,body:1}),
        V = _({html:1});

    var block = _({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),

        empty =  _({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1});

    return  _({

        // $ 表示自定的属性

        // body外的元素列表.
        $nonBodyContent: X( V, U, S ),

        //块结构元素列表
        $block : block,

        //内联元素列表
        $inline : L,

        $inlineWithA : X(_({a:1}),L),

        $body : X( _({script:1,style:1}), block ),

        $cdata : _({script:1,style:1}),

        //自闭和元素
        $empty : empty,

        //不是自闭合，但不能让range选中里边
        $nonChild : _({iframe:1,textarea:1}),
        //列表元素列表
        $listItem : _({dd:1,dt:1,li:1}),

        //列表根元素列表
        $list: _({ul:1,ol:1,dl:1}),

        //不能认为是空的元素
        $isNotEmpty : _({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),

        //如果没有子节点就可以删除的元素列表，像span,a
        $removeEmpty : _({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1}),

        $removeEmptyBlock : _({'p':1,'div':1}),

        //在table元素里的元素列表
        $tableContent : _({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),
        //不转换的标签
        $notTransContent : _({pre:1,script:1,style:1,textarea:1}),
        html: U,
        head: T,
        style: N,
        script: N,
        body: P,
        base: {},
        link: {},
        meta: {},
        title: N,
        col : {},
        tr : _({td:1,th:1}),
        img : {},
        embed: {},
        colgroup : _({thead:1,col:1,tbody:1,tr:1,tfoot:1}),
        noscript : P,
        td : P,
        br : {},
        th : P,
        center : P,
        kbd : L,
        button : X( I, E ),
        basefont : {},
        h5 : L,
        h4 : L,
        samp : L,
        h6 : L,
        ol : Q,
        h1 : L,
        h3 : L,
        option : N,
        h2 : L,
        form : X( A, D, E, I ),
        select : _({optgroup:1,option:1}),
        font : L,
        ins : L,
        menu : Q,
        abbr : L,
        label : L,
        table : _({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),
        code : L,
        tfoot : M,
        cite : L,
        li : P,
        input : {},
        iframe : P,
        strong : L,
        textarea : N,
        noframes : P,
        big : L,
        small : L,
        //trace:
        span :_({'#':1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),
        hr : L,
        dt : L,
        sub : L,
        optgroup : _({option:1}),
        param : {},
        bdo : L,
        'var' : L,
        div : P,
        object : O,
        sup : L,
        dd : P,
        strike : L,
        area : {},
        dir : Q,
        map : X( _({area:1,form:1,p:1}), A, F, E ),
        applet : O,
        dl : _({dt:1,dd:1}),
        del : L,
        isindex : {},
        fieldset : X( _({legend:1}), K ),
        thead : M,
        ul : Q,
        acronym : L,
        b : L,
        a : X( _({a:1}), J ),
        blockquote :X(_({td:1,tr:1,tbody:1,li:1}),P),
        caption : L,
        i : L,
        u : L,
        tbody : M,
        s : L,
        address : X( D, I ),
        tt : L,
        legend : L,
        q : L,
        pre : X( G, C ),
        p : X(_({'a':1}),L),
        em :L,
        dfn : L
    });
})();


// core/domUtils.js
/**
 * Dom操作工具包
 * @file
 * @module UE.dom.domUtils
 * @since 1.2.6.1
 */

/**
 * Dom操作工具包
 * @unfile
 * @module UE.dom.domUtils
 */
function getDomNode(node, start, ltr, startFromChild, fn, guard) {
    var tmpNode = startFromChild && node[start],
        parent;
    !tmpNode && (tmpNode = node[ltr]);
    while (!tmpNode && (parent = (parent || node).parentNode)) {
        if (parent.tagName == 'BODY' || guard && !guard(parent)) {
            return null;
        }
        tmpNode = parent[ltr];
    }
    if (tmpNode && fn && !fn(tmpNode)) {
        return  getDomNode(tmpNode, start, ltr, false, fn);
    }
    return tmpNode;
}
var attrFix = ie && browser.version < 9 ? {
        tabindex:"tabIndex",
        readonly:"readOnly",
        "for":"htmlFor",
        "class":"className",
        maxlength:"maxLength",
        cellspacing:"cellSpacing",
        cellpadding:"cellPadding",
        rowspan:"rowSpan",
        colspan:"colSpan",
        usemap:"useMap",
        frameborder:"frameBorder"
    } : {
        tabindex:"tabIndex",
        readonly:"readOnly"
    },
    styleBlock = utils.listToMap([
        '-webkit-box', '-moz-box', 'block' ,
        'list-item' , 'table' , 'table-row-group' ,
        'table-header-group', 'table-footer-group' ,
        'table-row' , 'table-column-group' , 'table-column' ,
        'table-cell' , 'table-caption'
    ]);
var domUtils = dom.domUtils = {
    //节点常量
    NODE_ELEMENT:1,
    NODE_DOCUMENT:9,
    NODE_TEXT:3,
    NODE_COMMENT:8,
    NODE_DOCUMENT_FRAGMENT:11,

    //位置关系
    POSITION_IDENTICAL:0,
    POSITION_DISCONNECTED:1,
    POSITION_FOLLOWING:2,
    POSITION_PRECEDING:4,
    POSITION_IS_CONTAINED:8,
    POSITION_CONTAINS:16,
    //ie6使用其他的会有一段空白出现
    fillChar:ie && browser.version == '6' ? '\ufeff' : '\u200B',
    //-------------------------Node部分--------------------------------
    keys:{
        /*Backspace*/ 8:1, /*Delete*/ 46:1,
        /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
        37:1, 38:1, 39:1, 40:1,
        13:1 /*enter*/
    },
    /**
     * 获取节点A相对于节点B的位置关系
     * @method getPosition
     * @param { Node } nodeA 需要查询位置关系的节点A
     * @param { Node } nodeB 需要查询位置关系的节点B
     * @return { Number } 节点A与节点B的关系
     * @example
     * ```javascript
     * //output: 20
     * var position = UE.dom.domUtils.getPosition( document.documentElement, document.body );
     *
     * switch ( position ) {
     *
     *      //0
     *      case UE.dom.domUtils.POSITION_IDENTICAL:
     *          console.log('元素相同');
     *          break;
     *      //1
     *      case UE.dom.domUtils.POSITION_DISCONNECTED:
     *          console.log('两个节点在不同的文档中');
     *          break;
     *      //2
     *      case UE.dom.domUtils.POSITION_FOLLOWING:
     *          console.log('节点A在节点B之后');
     *          break;
     *      //4
     *      case UE.dom.domUtils.POSITION_PRECEDING;
     *          console.log('节点A在节点B之前');
     *          break;
     *      //8
     *      case UE.dom.domUtils.POSITION_IS_CONTAINED:
     *          console.log('节点A被节点B包含');
     *          break;
     *      case 10:
     *          console.log('节点A被节点B包含且节点A在节点B之后');
     *          break;
     *      //16
     *      case UE.dom.domUtils.POSITION_CONTAINS:
     *          console.log('节点A包含节点B');
     *          break;
     *      case 20:
     *          console.log('节点A包含节点B且节点A在节点B之前');
     *          break;
     *
     * }
     * ```
     */
    getPosition:function (nodeA, nodeB) {
        // 如果两个节点是同一个节点
        if (nodeA === nodeB) {
            // domUtils.POSITION_IDENTICAL
            return 0;
        }
        var node,
            parentsA = [nodeA],
            parentsB = [nodeB];
        node = nodeA;
        while (node = node.parentNode) {
            // 如果nodeB是nodeA的祖先节点
            if (node === nodeB) {
                // domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING
                return 10;
            }
            parentsA.push(node);
        }
        node = nodeB;
        while (node = node.parentNode) {
            // 如果nodeA是nodeB的祖先节点
            if (node === nodeA) {
                // domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING
                return 20;
            }
            parentsB.push(node);
        }
        parentsA.reverse();
        parentsB.reverse();
        if (parentsA[0] !== parentsB[0]) {
            // domUtils.POSITION_DISCONNECTED
            return 1;
        }
        var i = -1;
        while (i++, parentsA[i] === parentsB[i]) {
        }
        nodeA = parentsA[i];
        nodeB = parentsB[i];
        while (nodeA = nodeA.nextSibling) {
            if (nodeA === nodeB) {
                // domUtils.POSITION_PRECEDING
                return 4
            }
        }
        // domUtils.POSITION_FOLLOWING
        return  2;
    },

    /**
     * 检测节点node在父节点中的索引位置
     * @method getNodeIndex
     * @param { Node } node 需要检测的节点对象
     * @return { Number } 该节点在父节点中的位置
     * @see UE.dom.domUtils.getNodeIndex(Node,Boolean)
     */

    /**
     * 检测节点node在父节点中的索引位置， 根据给定的mergeTextNode参数决定是否要合并多个连续的文本节点为一个节点
     * @method getNodeIndex
     * @param { Node } node 需要检测的节点对象
     * @param { Boolean } mergeTextNode 是否合并多个连续的文本节点为一个节点
     * @return { Number } 该节点在父节点中的位置
     * @example
     * ```javascript
     *
     *      var node = document.createElement("div");
     *
     *      node.appendChild( document.createTextNode( "hello" ) );
     *      node.appendChild( document.createTextNode( "world" ) );
     *      node.appendChild( node = document.createElement( "div" ) );
     *
     *      //output: 2
     *      console.log( UE.dom.domUtils.getNodeIndex( node ) );
     *
     *      //output: 1
     *      console.log( UE.dom.domUtils.getNodeIndex( node, true ) );
     *
     * ```
     */
    getNodeIndex:function (node, ignoreTextNode) {
        var preNode = node,
            i = 0;
        while (preNode = preNode.previousSibling) {
            if (ignoreTextNode && preNode.nodeType == 3) {
                if(preNode.nodeType != preNode.nextSibling.nodeType ){
                    i++;
                }
                continue;
            }
            i++;
        }
        return i;
    },

    /**
     * 检测节点node是否在给定的document对象上
     * @method inDoc
     * @param { Node } node 需要检测的节点对象
     * @param { DomDocument } doc 需要检测的document对象
     * @return { Boolean } 该节点node是否在给定的document的dom树上
     * @example
     * ```javascript
     *
     * var node = document.createElement("div");
     *
     * //output: false
     * console.log( UE.do.domUtils.inDoc( node, document ) );
     *
     * document.body.appendChild( node );
     *
     * //output: true
     * console.log( UE.do.domUtils.inDoc( node, document ) );
     *
     * ```
     */
    inDoc:function (node, doc) {
        return domUtils.getPosition(node, doc) == 10;
    },
    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 查找的起点是给定node节点的父节点。
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var filterNode = UE.dom.domUtils.findParent( document.body.firstChild, function ( node ) {
     *
     *     //由于查找的终点是body节点， 所以永远也不会匹配当前过滤器的条件， 即这里永远会返回false
     *     return node.tagName === "HTML";
     *
     * } );
     *
     * //output: true
     * console.log( filterNode === null );
     * ```
     */

    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 如果includeSelf的值为true，则查找的起点是给定的节点node， 否则， 起点是node的父节点
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @param { Boolean } includeSelf 查找过程是否包含自身
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @remind 如果includeSelf为true， 则过滤器第一次执行时的参数会是节点本身。
     *          反之， 过滤器第一次执行时的参数将是该节点的父节点。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     * @example
     * ```html
     * <body>
     *
     *      <div id="test">
     *      </div>
     *
     *      <script type="text/javascript">
     *
     *          //output: DIV, BODY
     *          var filterNode = UE.dom.domUtils.findParent( document.getElementById( "test" ), function ( node ) {
     *
     *              console.log( node.tagName );
     *              return false;
     *
     *          }, true );
     *
     *      </script>
     * </body>
     * ```
     */
    findParent:function (node, filterFn, includeSelf) {
        if (node && !domUtils.isBody(node)) {
            node = includeSelf ? node : node.parentNode;
            while (node) {
                if (!filterFn || filterFn(node) || domUtils.isBody(node)) {
                    return filterFn && !filterFn(node) && domUtils.isBody(node) ? null : node;
                }
                node = node.parentNode;
            }
        }
        return null;
    },
    /**
     * 查找node的节点名为tagName的第一个祖先节点， 查找的起点是node节点的父节点。
     * @method findParentByTagName
     * @param { Node } node 需要查找的节点对象
     * @param { Array } tagNames 需要查找的父节点的名称数组
     * @warning 查找的终点是到body节点为止
     * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var node = UE.dom.domUtils.findParentByTagName( document.getElementsByTagName("div")[0], [ "BODY" ] );
     * //output: BODY
     * console.log( node.tagName );
     * ```
     */

    /**
     * 查找node的节点名为tagName的祖先节点， 如果includeSelf的值为true，则查找的起点是给定的节点node，
     * 否则， 起点是node的父节点。
     * @method findParentByTagName
     * @param { Node } node 需要查找的节点对象
     * @param { Array } tagNames 需要查找的父节点的名称数组
     * @param { Boolean } includeSelf 查找过程是否包含node节点自身
     * @warning 查找的终点是到body节点为止
     * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var queryTarget = document.getElementsByTagName("div")[0];
     * var node = UE.dom.domUtils.findParentByTagName( queryTarget, [ "DIV" ], true );
     * //output: true
     * console.log( queryTarget === node );
     * ```
     */
    findParentByTagName:function (node, tagNames, includeSelf, excludeFn) {
        tagNames = utils.listToMap(utils.isArray(tagNames) ? tagNames : [tagNames]);
        return domUtils.findParent(node, function (node) {
            return tagNames[node.tagName] && !(excludeFn && excludeFn(node));
        }, includeSelf);
    },
    /**
     * 查找节点node的祖先节点集合， 查找的起点是给定节点的父节点，结果集中不包含给定的节点。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     * @grammar UE.dom.domUtils.findParents(node)  => Array  //返回一个祖先节点数组集合，不包含自身
     * @grammar UE.dom.domUtils.findParents(node,includeSelf)  => Array  //返回一个祖先节点数组集合，includeSelf指定是否包含自身
     * @grammar UE.dom.domUtils.findParents(node,includeSelf,filterFn)  => Array  //返回一个祖先节点数组集合，filterFn指定过滤条件，返回true的node将被选取
     * @grammar UE.dom.domUtils.findParents(node,includeSelf,filterFn,closerFirst)  => Array  //返回一个祖先节点数组集合，closerFirst为true的话，node的直接父亲节点是数组的第0个
     */

    /**
     * 查找节点node的祖先节点集合， 如果includeSelf的值为true，
     * 则返回的结果集中允许出现当前给定的节点， 否则， 该节点不会出现在其结果集中。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @param { Boolean } includeSelf 查找的结果中是否允许包含当前查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     */
    findParents:function (node, includeSelf, filterFn, closerFirst) {
        var parents = includeSelf && ( filterFn && filterFn(node) || !filterFn ) ? [node] : [];
        while (node = domUtils.findParent(node, filterFn)) {
            parents.push(node);
        }
        return closerFirst ? parents : parents.reverse();
    },

    /**
     * 在节点node后面插入新节点newNode
     * @method insertAfter
     * @param { Node } node 目标节点
     * @param { Node } newNode 新插入的节点， 该节点将置于目标节点之后
     * @return { Node } 新插入的节点
     */
    insertAfter:function (node, newNode) {
        return node.nextSibling ? node.parentNode.insertBefore(newNode, node.nextSibling):
            node.parentNode.appendChild(newNode);
    },

    /**
     * 删除节点node及其下属的所有节点
     * @method remove
     * @param { Node } node 需要删除的节点对象
     * @return { Node } 返回刚删除的节点对象
     * @example
     * ```html
     * <div id="test">
     *     <div id="child">你好</div>
     * </div>
     * <script>
     *     UE.dom.domUtils.remove( document.body, false );
     *     //output: false
     *     console.log( document.getElementById( "child" ) !== null );
     * </script>
     * ```
     */

    /**
     * 删除节点node，并根据keepChildren的值决定是否保留子节点
     * @method remove
     * @param { Node } node 需要删除的节点对象
     * @param { Boolean } keepChildren 是否需要保留子节点
     * @return { Node } 返回刚删除的节点对象
     * @example
     * ```html
     * <div id="test">
     *     <div id="child">你好</div>
     * </div>
     * <script>
     *     UE.dom.domUtils.remove( document.body, true );
     *     //output: true
     *     console.log( document.getElementById( "child" ) !== null );
     * </script>
     * ```
     */
    remove:function (node, keepChildren) {
        var parent = node.parentNode,
            child;
        if (parent) {
            if (keepChildren && node.hasChildNodes()) {
                while (child = node.firstChild) {
                    parent.insertBefore(child, node);
                }
            }
            parent.removeChild(node);
        }
        return node;
    },

    /**
     * 取得node节点的下一个兄弟节点， 如果该节点其后没有兄弟节点， 则递归查找其父节点之后的第一个兄弟节点，
     * 直到找到满足条件的节点或者递归到BODY节点之后才会结束。
     * @method getNextDomNode
     * @param { Node } node 需要获取其后的兄弟节点的节点对象
     * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```html
     *     <body>
     *      <div id="test">
     *          <span></span>
     *      </div>
     *      <i>xxx</i>
     * </body>
     * <script>
     *
     *     //output: i节点
     *     console.log( UE.dom.domUtils.getNextDomNode( document.getElementById( "test" ) ) );
     *
     * </script>
     * ```
     * @example
     * ```html
     * <body>
     *      <div>
     *          <span></span>
     *          <i id="test">xxx</i>
     *      </div>
     *      <b>xxx</b>
     * </body>
     * <script>
     *
     *     //由于id为test的i节点之后没有兄弟节点， 则查找其父节点（div）后面的兄弟节点
     *     //output: b节点
     *     console.log( UE.dom.domUtils.getNextDomNode( document.getElementById( "test" ) ) );
     *
     * </script>
     * ```
     */

    /**
     * 取得node节点的下一个兄弟节点， 如果startFromChild的值为ture，则先获取其子节点，
     * 如果有子节点则直接返回第一个子节点；如果没有子节点或者startFromChild的值为false，
     * 则执行<a href="#UE.dom.domUtils.getNextDomNode(Node)">getNextDomNode(Node node)</a>的查找过程。
     * @method getNextDomNode
     * @param { Node } node 需要获取其后的兄弟节点的节点对象
     * @param { Boolean } startFromChild 查找过程是否从其子节点开始
     * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
     * @see UE.dom.domUtils.getNextDomNode(Node)
     */
    getNextDomNode:function (node, startFromChild, filterFn, guard) {
        return getDomNode(node, 'firstChild', 'nextSibling', startFromChild, filterFn, guard);
    },
    getPreDomNode:function (node, startFromChild, filterFn, guard) {
        return getDomNode(node, 'lastChild', 'previousSibling', startFromChild, filterFn, guard);
    },
    /**
     * 检测节点node是否属是UEditor定义的bookmark节点
     * @method isBookmarkNode
     * @private
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 是否是bookmark节点
     * @example
     * ```html
     * <span id="_baidu_bookmark_1"></span>
     * <script>
     *      var bookmarkNode = document.getElementById("_baidu_bookmark_1");
     *      //output: true
     *      console.log( UE.dom.domUtils.isBookmarkNode( bookmarkNode ) );
     * </script>
     * ```
     */
    isBookmarkNode:function (node) {
        return node.nodeType == 1 && node.id && /^_baidu_bookmark_/i.test(node.id);
    },
    /**
     * 获取节点node所属的window对象
     * @method  getWindow
     * @param { Node } node 节点对象
     * @return { Window } 当前节点所属的window对象
     * @example
     * ```javascript
     * //output: true
     * console.log( UE.dom.domUtils.getWindow( document.body ) === window );
     * ```
     */
    getWindow:function (node) {
        var doc = node.ownerDocument || node;
        return doc.defaultView || doc.parentWindow;
    },
    /**
     * 获取离nodeA与nodeB最近的公共的祖先节点
     * @method  getCommonAncestor
     * @param { Node } nodeA 第一个节点
     * @param { Node } nodeB 第二个节点
     * @remind 如果给定的两个节点是同一个节点， 将直接返回该节点。
     * @return { Node | NULL } 如果未找到公共节点， 返回NULL， 否则返回最近的公共祖先节点。
     * @example
     * ```javascript
     * var commonAncestor = UE.dom.domUtils.getCommonAncestor( document.body, document.body.firstChild );
     * //output: true
     * console.log( commonAncestor.tagName.toLowerCase() === 'body' );
     * ```
     */
    getCommonAncestor:function (nodeA, nodeB) {
        if (nodeA === nodeB)
            return nodeA;
        var parentsA = [nodeA] , parentsB = [nodeB], parent = nodeA, i = -1;
        while (parent = parent.parentNode) {
            if (parent === nodeB) {
                return parent;
            }
            parentsA.push(parent);
        }
        parent = nodeB;
        while (parent = parent.parentNode) {
            if (parent === nodeA)
                return parent;
            parentsB.push(parent);
        }
        parentsA.reverse();
        parentsB.reverse();
        while (i++, parentsA[i] === parentsB[i]) {
        }
        return i == 0 ? null : parentsA[i - 1];

    },
    /**
     * 清除node节点左右连续为空的兄弟inline节点
     * @method clearEmptySibling
     * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
     * 则这些兄弟节点将被删除
     * @grammar UE.dom.domUtils.clearEmptySibling(node,ignoreNext)  //ignoreNext指定是否忽略右边空节点
     * @grammar UE.dom.domUtils.clearEmptySibling(node,ignoreNext,ignorePre)  //ignorePre指定是否忽略左边空节点
     * @example
     * ```html
     * <body>
     *     <div></div>
     *     <span id="test"></span>
     *     <i></i>
     *     <b></b>
     *     <em>xxx</em>
     *     <span></span>
     * </body>
     * <script>
     *
     *      UE.dom.domUtils.clearEmptySibling( document.getElementById( "test" ) );
     *
     *      //output: <div></div><span id="test"></span><em>xxx</em><span></span>
     *      console.log( document.body.innerHTML );
     *
     * </script>
     * ```
     */

    /**
     * 清除node节点左右连续为空的兄弟inline节点， 如果ignoreNext的值为true，
     * 则忽略对右边兄弟节点的操作。
     * @method clearEmptySibling
     * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
     * @param { Boolean } ignoreNext 是否忽略忽略对右边的兄弟节点的操作
     * 则这些兄弟节点将被删除
     * @see UE.dom.domUtils.clearEmptySibling(Node)
     */

    /**
     * 清除node节点左右连续为空的兄弟inline节点， 如果ignoreNext的值为true，
     * 则忽略对右边兄弟节点的操作， 如果ignorePre的值为true，则忽略对左边兄弟节点的操作。
     * @method clearEmptySibling
     * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
     * @param { Boolean } ignoreNext 是否忽略忽略对右边的兄弟节点的操作
     * @param { Boolean } ignorePre 是否忽略忽略对左边的兄弟节点的操作
     * 则这些兄弟节点将被删除
     * @see UE.dom.domUtils.clearEmptySibling(Node)
     */
    clearEmptySibling:function (node, ignoreNext, ignorePre) {
        function clear(next, dir) {
            var tmpNode;
            while (next && !domUtils.isBookmarkNode(next) && (domUtils.isEmptyInlineElement(next)
                //这里不能把空格算进来会吧空格干掉，出现文字间的空格丢掉了
                || !new RegExp('[^\t\n\r' + domUtils.fillChar + ']').test(next.nodeValue) )) {
                tmpNode = next[dir];
                domUtils.remove(next);
                next = tmpNode;
            }
        }
        !ignoreNext && clear(node.nextSibling, 'nextSibling');
        !ignorePre && clear(node.previousSibling, 'previousSibling');
    },
    /**
     * 将一个文本节点textNode拆分成两个文本节点，offset指定拆分位置
     * @method split
     * @param { Node } textNode 需要拆分的文本节点对象
     * @param { int } offset 需要拆分的位置， 位置计算从0开始
     * @return { Node } 拆分后形成的新节点
     * @example
     * ```html
     * <div id="test">abcdef</div>
     * <script>
     *      var newNode = UE.dom.domUtils.split( document.getElementById( "test" ).firstChild, 3 );
     *      //output: def
     *      console.log( newNode.nodeValue );
     * </script>
     * ```
     */
    split:function (node, offset) {
        var doc = node.ownerDocument;
        if (browser.ie && offset == node.nodeValue.length) {
            var next = doc.createTextNode('');
            return domUtils.insertAfter(node, next);
        }
        var retval = node.splitText(offset);
        //ie8下splitText不会跟新childNodes,我们手动触发他的更新
        if (browser.ie8) {
            var tmpNode = doc.createTextNode('');
            domUtils.insertAfter(retval, tmpNode);
            domUtils.remove(tmpNode);
        }
        return retval;
    },

    /**
     * 检测文本节点textNode是否为空节点（包括空格、换行、占位符等字符）
     * @method  isWhitespace
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 检测的节点是否为空
     * @example
     * ```html
     * <div id="test">
     *
     * </div>
     * <script>
     *      //output: true
     *      console.log( UE.dom.domUtils.isWhitespace( document.getElementById("test").firstChild ) );
     * </script>
     * ```
     */
    isWhitespace:function (node) {
        return !new RegExp('[^ \t\n\r' + domUtils.fillChar + ']').test(node.nodeValue);
    },
    /**
     * 获取元素element相对于viewport的位置坐标
     * @method getXY
     * @param { Node } element 需要计算位置的节点对象
     * @return { Object } 返回形如{x:left,y:top}的一个key-value映射对象， 其中键x代表水平偏移距离，
     *                          y代表垂直偏移距离。
     *
     * @example
     * ```javascript
     * var location = UE.dom.domUtils.getXY( document.getElementById("test") );
     * //output: test的坐标为: 12, 24
     * console.log( 'test的坐标为： ', location.x, ',', location.y );
     * ```
     */
    getXY:function (element) {
        var x = 0, y = 0;
        while (element.offsetParent) {
            y += element.offsetTop;
            x += element.offsetLeft;
            element = element.offsetParent;
        }
        return { 'x':x, 'y':y};
    },
    /**
     * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
     * @method on
     * @param { Node } element 需要绑定事件的节点对象
     * @param { String } type 绑定的事件类型
     * @param { Function } handler 事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.on(document.body,"click",function(e){
     *     //e为事件对象，this为被点击元素对戏那个
     * });
     * ```
     */

    /**
     * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
     * @method on
     * @param { Node } element 需要绑定事件的节点对象
     * @param { Array } type 绑定的事件类型数组
     * @param { Function } handler 事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.on(document.body,["click","mousedown"],function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */
    on:function (element, type, handler) {

        var types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
            k = types.length;
        if (k) while (k--) {
            type = types[k];
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else {
                if (!handler._d) {
                    handler._d = {
                        els : []
                    };
                }
                var key = type + handler.toString(),index = utils.indexOf(handler._d.els,element);
                if (!handler._d[key] || index == -1) {
                    if(index == -1){
                        handler._d.els.push(element);
                    }
                    if(!handler._d[key]){
                        handler._d[key] = function (evt) {
                            return handler.call(evt.srcElement, evt || window.event);
                        };
                    }


                    element.attachEvent('on' + type, handler._d[key]);
                }
            }
        }
        element = null;
    },
    /**
     * 解除DOM事件绑定
     * @method un
     * @param { Node } element 需要解除事件绑定的节点对象
     * @param { String } type 需要接触绑定的事件类型
     * @param { Function } handler 对应的事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.un(document.body,"click",function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */

    /**
     * 解除DOM事件绑定
     * @method un
     * @param { Node } element 需要解除事件绑定的节点对象
     * @param { Array } type 需要接触绑定的事件类型数组
     * @param { Function } handler 对应的事件处理器
     * @example
     * ```javascript
     * UE.dom.domUtils.un(document.body, ["click","mousedown"],function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */
    un:function (element, type, handler) {
        var types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
            k = types.length;
        if (k) while (k--) {
            type = types[k];
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else {
                var key = type + handler.toString();
                try{
                    element.detachEvent('on' + type, handler._d ? handler._d[key] : handler);
                }catch(e){}
                if (handler._d && handler._d[key]) {
                    var index = utils.indexOf(handler._d.els,element);
                    if(index!=-1){
                        handler._d.els.splice(index,1);
                    }
                    handler._d.els.length == 0 && delete handler._d[key];
                }
            }
        }
    },

    /**
     * 比较节点nodeA与节点nodeB是否具有相同的标签名、属性名以及属性值
     * @method  isSameElement
     * @param { Node } nodeA 需要比较的节点
     * @param { Node } nodeB 需要比较的节点
     * @return { Boolean } 两个节点是否具有相同的标签名、属性名以及属性值
     * @example
     * ```html
     * <span style="font-size:12px">ssss</span>
     * <span style="font-size:12px">bbbbb</span>
     * <span style="font-size:13px">ssss</span>
     * <span style="font-size:14px">bbbbb</span>
     *
     * <script>
     *
     *     var nodes = document.getElementsByTagName( "span" );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isSameElement( nodes[0], nodes[1] ) );
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.isSameElement( nodes[2], nodes[3] ) );
     *
     * </script>
     * ```
     */
    isSameElement:function (nodeA, nodeB) {
        if (nodeA.tagName != nodeB.tagName) {
            return false;
        }
        var thisAttrs = nodeA.attributes,
            otherAttrs = nodeB.attributes;
        if (!ie && thisAttrs.length != otherAttrs.length) {
            return false;
        }
        var attrA, attrB, al = 0, bl = 0;
        for (var i = 0; attrA = thisAttrs[i++];) {
            if (attrA.nodeName == 'style') {
                if (attrA.specified) {
                    al++;
                }
                if (domUtils.isSameStyle(nodeA, nodeB)) {
                    continue;
                } else {
                    return false;
                }
            }
            if (ie) {
                if (attrA.specified) {
                    al++;
                    attrB = otherAttrs.getNamedItem(attrA.nodeName);
                } else {
                    continue;
                }
            } else {
                attrB = nodeB.attributes[attrA.nodeName];
            }
            if (!attrB.specified || attrA.nodeValue != attrB.nodeValue) {
                return false;
            }
        }
        // 有可能attrB的属性包含了attrA的属性之外还有自己的属性
        if (ie) {
            for (i = 0; attrB = otherAttrs[i++];) {
                if (attrB.specified) {
                    bl++;
                }
            }
            if (al != bl) {
                return false;
            }
        }
        return true;
    },

    /**
     * 判断节点nodeA与节点nodeB的元素的style属性是否一致
     * @method isSameStyle
     * @param { Node } nodeA 需要比较的节点
     * @param { Node } nodeB 需要比较的节点
     * @return { Boolean } 两个节点是否具有相同的style属性值
     * @example
     * ```html
     * <span style="font-size:12px">ssss</span>
     * <span style="font-size:12px">bbbbb</span>
     * <span style="font-size:13px">ssss</span>
     * <span style="font-size:14px">bbbbb</span>
     *
     * <script>
     *
     *     var nodes = document.getElementsByTagName( "span" );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isSameStyle( nodes[0], nodes[1] ) );
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.isSameStyle( nodes[2], nodes[3] ) );
     *
     * </script>
     * ```
     */
    isSameStyle:function (nodeA, nodeB) {
        var styleA = nodeA.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':'),
            styleB = nodeB.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':');
        if (browser.opera) {
            styleA = nodeA.style;
            styleB = nodeB.style;
            if (styleA.length != styleB.length)
                return false;
            for (var p in styleA) {
                if (/^(\d+|csstext)$/i.test(p)) {
                    continue;
                }
                if (styleA[p] != styleB[p]) {
                    return false;
                }
            }
            return true;
        }
        if (!styleA || !styleB) {
            return styleA == styleB;
        }
        styleA = styleA.split(';');
        styleB = styleB.split(';');
        if (styleA.length != styleB.length) {
            return false;
        }
        for (var i = 0, ci; ci = styleA[i++];) {
            if (utils.indexOf(styleB, ci) == -1) {
                return false;
            }
        }
        return true;
    },
    /**
     * 检查节点node是否为block元素
     * @method isBlockElm
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 是否是block元素节点
     * @warning 该方法的判断规则如下： 如果该元素原本是block元素， 则不论该元素当前的css样式是什么都会返回true；
     *          否则，检测该元素的css样式， 如果该元素当前是block元素， 则返回true。 其余情况下都返回false。
     * @example
     * ```html
     * <span id="test1" style="display: block"></span>
     * <span id="test2"></span>
     * <div id="test3" style="display: inline"></div>
     *
     * <script>
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test1") ) );
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test2") ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test3") ) );
     *
     * </script>
     * ```
     */
    isBlockElm:function (node) {
        return node.nodeType == 1 && (dtd.$block[node.tagName] || styleBlock[domUtils.getComputedStyle(node, 'display')]) && !dtd.$nonChild[node.tagName];
    },
    /**
     * 检测node节点是否为body节点
     * @method isBody
     * @param { Element } node 需要检测的dom元素
     * @return { Boolean } 给定的元素是否是body元素
     * @example
     * ```javascript
     * //output: true
     * console.log( UE.dom.domUtils.isBody( document.body ) );
     * ```
     */
    isBody:function (node) {
        return  node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
    },
    /**
     * 以node节点为分界，将该节点的指定祖先节点parent拆分成两个独立的节点，
     * 拆分形成的两个节点之间是node节点
     * @method breakParent
     * @param { Node } node 作为分界的节点对象
     * @param { Node } parent 该节点必须是node节点的祖先节点， 且是block节点。
     * @return { Node } 给定的node分界节点
     * @example
     * ```javascript
     *
     *      var node = document.createElement("span"),
     *          wrapNode = document.createElement( "div" ),
     *          parent = document.createElement("p");
     *
     *      parent.appendChild( node );
     *      wrapNode.appendChild( parent );
     *
     *      //拆分前
     *      //output: <p><span></span></p>
     *      console.log( wrapNode.innerHTML );
     *
     *
     *      UE.dom.domUtils.breakParent( node, parent );
     *      //拆分后
     *      //output: <p></p><span></span><p></p>
     *      console.log( wrapNode.innerHTML );
     *
     * ```
     */
    breakParent:function (node, parent) {
        var tmpNode,
            parentClone = node,
            clone = node,
            leftNodes,
            rightNodes;
        do {
            parentClone = parentClone.parentNode;
            if (leftNodes) {
                tmpNode = parentClone.cloneNode(false);
                tmpNode.appendChild(leftNodes);
                leftNodes = tmpNode;
                tmpNode = parentClone.cloneNode(false);
                tmpNode.appendChild(rightNodes);
                rightNodes = tmpNode;
            } else {
                leftNodes = parentClone.cloneNode(false);
                rightNodes = leftNodes.cloneNode(false);
            }
            while (tmpNode = clone.previousSibling) {
                leftNodes.insertBefore(tmpNode, leftNodes.firstChild);
            }
            while (tmpNode = clone.nextSibling) {
                rightNodes.appendChild(tmpNode);
            }
            clone = parentClone;
        } while (parent !== parentClone);
        tmpNode = parent.parentNode;
        tmpNode.insertBefore(leftNodes, parent);
        tmpNode.insertBefore(rightNodes, parent);
        tmpNode.insertBefore(node, rightNodes);
        domUtils.remove(parent);
        return node;
    },
    /**
     * 检查节点node是否是空inline节点
     * @method  isEmptyInlineElement
     * @param { Node } node 需要检测的节点对象
     * @return { Number }  如果给定的节点是空的inline节点， 则返回1, 否则返回0。
     * @example
     * ```html
     * <b><i></i></b> => 1
     * <b><i></i><u></u></b> => 1
     * <b></b> => 1
     * <b>xx<i></i></b> => 0
     * ```
     */
    isEmptyInlineElement:function (node) {
        if (node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ]) {
            return 0;
        }
        node = node.firstChild;
        while (node) {
            //如果是创建的bookmark就跳过
            if (domUtils.isBookmarkNode(node)) {
                return 0;
            }
            if (node.nodeType == 1 && !domUtils.isEmptyInlineElement(node) ||
                node.nodeType == 3 && !domUtils.isWhitespace(node)
                ) {
                return 0;
            }
            node = node.nextSibling;
        }
        return 1;

    },

    /**
     * 删除node节点下首尾两端的空白文本子节点
     * @method trimWhiteTextNode
     * @param { Element } node 需要执行删除操作的元素对象
     * @example
     * ```javascript
     *      var node = document.createElement("div");
     *
     *      node.appendChild( document.createTextNode( "" ) );
     *
     *      node.appendChild( document.createElement("div") );
     *
     *      node.appendChild( document.createTextNode( "" ) );
     *
     *      //3
     *      console.log( node.childNodes.length );
     *
     *      UE.dom.domUtils.trimWhiteTextNode( node );
     *
     *      //1
     *      console.log( node.childNodes.length );
     * ```
     */
    trimWhiteTextNode:function (node) {
        function remove(dir) {
            var child;
            while ((child = node[dir]) && child.nodeType == 3 && domUtils.isWhitespace(child)) {
                node.removeChild(child);
            }
        }
        remove('firstChild');
        remove('lastChild');
    },

    /**
     * 合并node节点下相同的子节点
     * @name mergeChild
     * @desc
     * UE.dom.domUtils.mergeChild(node,tagName) //tagName要合并的子节点的标签
     * @example
     * <p><span style="font-size:12px;">xx<span style="font-size:12px;">aa</span>xx</span></p>
     * ==> UE.dom.domUtils.mergeChild(node,'span')
     * <p><span style="font-size:12px;">xxaaxx</span></p>
     */
    mergeChild:function (node, tagName, attrs) {
        var list = domUtils.getElementsByTagName(node, node.tagName.toLowerCase());
        for (var i = 0, ci; ci = list[i++];) {
            if (!ci.parentNode || domUtils.isBookmarkNode(ci)) {
                continue;
            }
            //span单独处理
            if (ci.tagName.toLowerCase() == 'span') {
                if (node === ci.parentNode) {
                    domUtils.trimWhiteTextNode(node);
                    if (node.childNodes.length == 1) {
                        node.style.cssText = ci.style.cssText + ";" + node.style.cssText;
                        domUtils.remove(ci, true);
                        continue;
                    }
                }
                ci.style.cssText = node.style.cssText + ';' + ci.style.cssText;
                if (attrs) {
                    var style = attrs.style;
                    if (style) {
                        style = style.split(';');
                        for (var j = 0, s; s = style[j++];) {
                            ci.style[utils.cssStyleToDomStyle(s.split(':')[0])] = s.split(':')[1];
                        }
                    }
                }
                if (domUtils.isSameStyle(ci, node)) {
                    domUtils.remove(ci, true);
                }
                continue;
            }
            if (domUtils.isSameElement(node, ci)) {
                domUtils.remove(ci, true);
            }
        }
    },

    /**
     * 原生方法getElementsByTagName的封装
     * @method getElementsByTagName
     * @param { Node } node 目标节点对象
     * @param { String } tagName 需要查找的节点的tagName， 多个tagName以空格分割
     * @return { Array } 符合条件的节点集合
     */
    getElementsByTagName:function (node, name,filter) {
        if(filter && utils.isString(filter)){
           var className = filter;
           filter =  function(node){return domUtils.hasClass(node,className)}
        }
        name = utils.trim(name).replace(/[ ]{2,}/g,' ').split(' ');
        var arr = [];
        for(var n = 0,ni;ni=name[n++];){
            var list = node.getElementsByTagName(ni);
            for (var i = 0, ci; ci = list[i++];) {
                if(!filter || filter(ci))
                    arr.push(ci);
            }
        }

        return arr;
    },
    /**
     * 将节点node提取到父节点上
     * @method mergeToParent
     * @param { Element } node 需要提取的元素对象
     * @example
     * ```html
     * <div id="parent">
     *     <div id="sub">
     *         <span id="child"></span>
     *     </div>
     * </div>
     *
     * <script>
     *
     *     var child = document.getElementById( "child" );
     *
     *     //output: sub
     *     console.log( child.parentNode.id );
     *
     *     UE.dom.domUtils.mergeToParent( child );
     *
     *     //output: parent
     *     console.log( child.parentNode.id );
     *
     * </script>
     * ```
     */
    mergeToParent:function (node) {
        var parent = node.parentNode;
        while (parent && dtd.$removeEmpty[parent.tagName]) {
            if (parent.tagName == node.tagName || parent.tagName == 'A') {//针对a标签单独处理
                domUtils.trimWhiteTextNode(parent);
                //span需要特殊处理  不处理这样的情况 <span stlye="color:#fff">xxx<span style="color:#ccc">xxx</span>xxx</span>
                if (parent.tagName == 'SPAN' && !domUtils.isSameStyle(parent, node)
                    || (parent.tagName == 'A' && node.tagName == 'SPAN')) {
                    if (parent.childNodes.length > 1 || parent !== node.parentNode) {
                        node.style.cssText = parent.style.cssText + ";" + node.style.cssText;
                        parent = parent.parentNode;
                        continue;
                    } else {
                        parent.style.cssText += ";" + node.style.cssText;
                        //trace:952 a标签要保持下划线
                        if (parent.tagName == 'A') {
                            parent.style.textDecoration = 'underline';
                        }
                    }
                }
                if (parent.tagName != 'A') {
                    parent === node.parentNode && domUtils.remove(node, true);
                    break;
                }
            }
            parent = parent.parentNode;
        }
    },
    /**
     * 合并节点node的左右兄弟节点
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @example
     * ```html
     * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
     *
     * <script>
     *     var demoNode = document.getElementById("test");
     *     UE.dom.domUtils.mergeSibling( demoNode );
     *     //output: xxxxoooxxxx
     *     console.log( demoNode.innerHTML );
     * </script>
     * ```
     */

    /**
     * 合并节点node的左右兄弟节点， 可以根据给定的条件选择是否忽略合并左节点。
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @param { Boolean } ignorePre 是否忽略合并左节点
     * @example
     * ```html
     * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
     *
     * <script>
     *     var demoNode = document.getElementById("test");
     *     UE.dom.domUtils.mergeSibling( demoNode, true );
     *     //output: oooxxxx
     *     console.log( demoNode.innerHTML );
     * </script>
     * ```
     */

    /**
     * 合并节点node的左右兄弟节点，可以根据给定的条件选择是否忽略合并左右节点。
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @param { Boolean } ignorePre 是否忽略合并左节点
     * @param { Boolean } ignoreNext 是否忽略合并右节点
     * @remind 如果同时忽略左右节点， 则该操作什么也不会做
     * @example
     * ```html
     * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
     *
     * <script>
     *     var demoNode = document.getElementById("test");
     *     UE.dom.domUtils.mergeSibling( demoNode, false, true );
     *     //output: xxxxooo
     *     console.log( demoNode.innerHTML );
     * </script>
     * ```
     */
    mergeSibling:function (node, ignorePre, ignoreNext) {
        function merge(rtl, start, node) {
            var next;
            if ((next = node[rtl]) && !domUtils.isBookmarkNode(next) && next.nodeType == 1 && domUtils.isSameElement(node, next)) {
                while (next.firstChild) {
                    if (start == 'firstChild') {
                        node.insertBefore(next.lastChild, node.firstChild);
                    } else {
                        node.appendChild(next.firstChild);
                    }
                }
                domUtils.remove(next);
            }
        }
        !ignorePre && merge('previousSibling', 'firstChild', node);
        !ignoreNext && merge('nextSibling', 'lastChild', node);
    },

    /**
     * 设置节点node及其子节点不会被选中
     * @method unSelectable
     * @param { Element } node 需要执行操作的dom元素
     * @remind 执行该操作后的节点， 将不能被鼠标选中
     * @example
     * ```javascript
     * UE.dom.domUtils.unSelectable( document.body );
     * ```
     */
    unSelectable:ie && browser.ie9below || browser.opera ? function (node) {
        //for ie9
        node.onselectstart = function () {
            return false;
        };
        node.onclick = node.onkeyup = node.onkeydown = function () {
            return false;
        };
        node.unselectable = 'on';
        node.setAttribute("unselectable", "on");
        for (var i = 0, ci; ci = node.all[i++];) {
            switch (ci.tagName.toLowerCase()) {
                case 'iframe' :
                case 'textarea' :
                case 'input' :
                case 'select' :
                    break;
                default :
                    ci.unselectable = 'on';
                    node.setAttribute("unselectable", "on");
            }
        }
    } : function (node) {
        node.style.MozUserSelect =
            node.style.webkitUserSelect =
                node.style.msUserSelect =
                    node.style.KhtmlUserSelect = 'none';
    },
    /**
     * 删除节点node上的指定属性名称的属性
     * @method  removeAttributes
     * @param { Node } node 需要删除属性的节点对象
     * @param { String } attrNames 可以是空格隔开的多个属性名称，该操作将会依次删除相应的属性
     * @example
     * ```html
     * <div id="wrap">
     *      <span style="font-size:14px;" id="test" name="followMe">xxxxx</span>
     * </div>
     *
     * <script>
     *
     *     UE.dom.domUtils.removeAttributes( document.getElementById( "test" ), "id name" );
     *
     *     //output: <span style="font-size:14px;">xxxxx</span>
     *     console.log( document.getElementById("wrap").innerHTML );
     *
     * </script>
     * ```
     */

    /**
     * 删除节点node上的指定属性名称的属性
     * @method  removeAttributes
     * @param { Node } node 需要删除属性的节点对象
     * @param { Array } attrNames 需要删除的属性名数组
     * @example
     * ```html
     * <div id="wrap">
     *      <span style="font-size:14px;" id="test" name="followMe">xxxxx</span>
     * </div>
     *
     * <script>
     *
     *     UE.dom.domUtils.removeAttributes( document.getElementById( "test" ), ["id", "name"] );
     *
     *     //output: <span style="font-size:14px;">xxxxx</span>
     *     console.log( document.getElementById("wrap").innerHTML );
     *
     * </script>
     * ```
     */
    removeAttributes:function (node, attrNames) {
        attrNames = utils.isArray(attrNames) ? attrNames : utils.trim(attrNames).replace(/[ ]{2,}/g,' ').split(' ');
        for (var i = 0, ci; ci = attrNames[i++];) {
            ci = attrFix[ci] || ci;
            switch (ci) {
                case 'className':
                    node[ci] = '';
                    break;
                case 'style':
                    node.style.cssText = '';
                    var val = node.getAttributeNode('style');
                    !browser.ie && val && node.removeAttributeNode(val);
            }
            node.removeAttribute(ci);
        }
    },
    /**
     * 在doc下创建一个标签名为tag，属性为attrs的元素
     * @method createElement
     * @param { DomDocument } doc 新创建的元素属于该document节点创建
     * @param { String } tagName 需要创建的元素的标签名
     * @param { Object } attrs 新创建的元素的属性key-value集合
     * @return { Element } 新创建的元素对象
     * @example
     * ```javascript
     * var ele = UE.dom.domUtils.createElement( document, 'div', {
     *     id: 'test'
     * } );
     *
     * //output: DIV
     * console.log( ele.tagName );
     *
     * //output: test
     * console.log( ele.id );
     *
     * ```
     */
    createElement:function (doc, tag, attrs) {
        return domUtils.setAttributes(doc.createElement(tag), attrs)
    },
    /**
     * 为节点node添加属性attrs，attrs为属性键值对
     * @method setAttributes
     * @param { Element } node 需要设置属性的元素对象
     * @param { Object } attrs 需要设置的属性名-值对
     * @return { Element } 设置属性的元素对象
     * @example
     * ```html
     * <span id="test"></span>
     *
     * <script>
     *
     *     var testNode = UE.dom.domUtils.setAttributes( document.getElementById( "test" ), {
     *         id: 'demo'
     *     } );
     *
     *     //output: demo
     *     console.log( testNode.id );
     *
     * </script>
     *
     */
    setAttributes:function (node, attrs) {
        for (var attr in attrs) {
            if(attrs.hasOwnProperty(attr)){
                var value = attrs[attr];
                switch (attr) {
                    case 'class':
                        //ie下要这样赋值，setAttribute不起作用
                        node.className = value;
                        break;
                    case 'style' :
                        node.style.cssText = node.style.cssText + ";" + value;
                        break;
                    case 'innerHTML':
                        node[attr] = value;
                        break;
                    case 'value':
                        node.value = value;
                        break;
                    default:
                        node.setAttribute(attrFix[attr] || attr, value);
                }
            }
        }
        return node;
    },

    /**
     * 获取元素element经过计算后的样式值
     * @method getComputedStyle
     * @param { Element } element 需要获取样式的元素对象
     * @param { String } styleName 需要获取的样式名
     * @return { String } 获取到的样式值
     * @example
     * ```html
     * <style type="text/css">
     *      #test {
     *          font-size: 15px;
     *      }
     * </style>
     *
     * <span id="test"></span>
     *
     * <script>
     *     //output: 15px
     *     console.log( UE.dom.domUtils.getComputedStyle( document.getElementById( "test" ), 'font-size' ) );
     * </script>
     * ```
     */
    getComputedStyle:function (element, styleName) {
        //一下的属性单独处理
        var pros = 'width height top left';

        if(pros.indexOf(styleName) > -1){
            return element['offset' + styleName.replace(/^\w/,function(s){return s.toUpperCase()})] + 'px';
        }
        //忽略文本节点
        if (element.nodeType == 3) {
            element = element.parentNode;
        }
        //ie下font-size若body下定义了font-size，则从currentStyle里会取到这个font-size. 取不到实际值，故此修改.
        if (browser.ie && browser.version < 9 && styleName == 'font-size' && !element.style.fontSize &&
            !dtd.$empty[element.tagName] && !dtd.$nonChild[element.tagName]) {
            var span = element.ownerDocument.createElement('span');
            span.style.cssText = 'padding:0;border:0;font-family:simsun;';
            span.innerHTML = '.';
            element.appendChild(span);
            var result = span.offsetHeight;
            element.removeChild(span);
            span = null;
            return result + 'px';
        }
        try {
            var value = domUtils.getStyle(element, styleName) ||
                (window.getComputedStyle ? domUtils.getWindow(element).getComputedStyle(element, '').getPropertyValue(styleName) :
                    ( element.currentStyle || element.style )[utils.cssStyleToDomStyle(styleName)]);

        } catch (e) {
            return "";
        }
        return utils.transUnitToPx(utils.fixColor(styleName, value));
    },
    /**
     * 删除元素element指定的className
     * @method removeClasses
     * @param { Element } ele 需要删除class的元素节点
     * @param { String } classNames 需要删除的className， 多个className之间以空格分开
     * @example
     * ```html
     * <span id="test" class="test1 test2 test3">xxx</span>
     *
     * <script>
     *
     *     var testNode = document.getElementById( "test" );
     *     UE.dom.domUtils.removeClasses( testNode, "test1 test2" );
     *
     *     //output: test3
     *     console.log( testNode.className );
     *
     * </script>
     * ```
     */

    /**
     * 删除元素element指定的className
     * @method removeClasses
     * @param { Element } ele 需要删除class的元素节点
     * @param { Array } classNames 需要删除的className数组
     * @example
     * ```html
     * <span id="test" class="test1 test2 test3">xxx</span>
     *
     * <script>
     *
     *     var testNode = document.getElementById( "test" );
     *     UE.dom.domUtils.removeClasses( testNode, ["test1", "test2"] );
     *
     *     //output: test3
     *     console.log( testNode.className );
     *
     * </script>
     * ```
     */
    removeClasses:function (elm, classNames) {
        classNames = utils.isArray(classNames) ? classNames :
            utils.trim(classNames).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = elm.className;ci=classNames[i++];){
            cls = cls.replace(new RegExp('\\b' + ci + '\\b'),'')
        }
        cls = utils.trim(cls).replace(/[ ]{2,}/g,' ');
        if(cls){
            elm.className = cls;
        }else{
            domUtils.removeAttributes(elm,['class']);
        }
    },
    /**
     * 给元素element添加className
     * @method addClass
     * @param { Node } ele 需要增加className的元素
     * @param { String } classNames 需要添加的className， 多个className之间以空格分割
     * @remind 相同的类名不会被重复添加
     * @example
     * ```html
     * <span id="test" class="cls1 cls2"></span>
     *
     * <script>
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.addClass( testNode, "cls2 cls3 cls4" );
     *
     *     //output: cl1 cls2 cls3 cls4
     *     console.log( testNode.className );
     *
     * <script>
     * ```
     */

    /**
     * 给元素element添加className
     * @method addClass
     * @param { Node } ele 需要增加className的元素
     * @param { Array } classNames 需要添加的className的数组
     * @remind 相同的类名不会被重复添加
     * @example
     * ```html
     * <span id="test" class="cls1 cls2"></span>
     *
     * <script>
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.addClass( testNode, ["cls2", "cls3", "cls4"] );
     *
     *     //output: cl1 cls2 cls3 cls4
     *     console.log( testNode.className );
     *
     * <script>
     * ```
     */
    addClass:function (elm, classNames) {
        if(!elm)return;
        classNames = utils.trim(classNames).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = elm.className;ci=classNames[i++];){
            if(!new RegExp('\\b' + ci + '\\b').test(cls)){
                cls += ' ' + ci;
            }
        }
        elm.className = utils.trim(cls);
    },
    /**
     * 判断元素element是否包含给定的样式类名className
     * @method hasClass
     * @param { Node } ele 需要检测的元素
     * @param { String } classNames 需要检测的className， 多个className之间用空格分割
     * @return { Boolean } 元素是否包含所有给定的className
     * @example
     * ```html
     * <span id="test1" class="cls1 cls2"></span>
     *
     * <script>
     *     var test1 = document.getElementById("test1");
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.hasClass( test1, "cls2 cls1 cls3" ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.hasClass( test1, "cls2 cls1" ) );
     * </script>
     * ```
     */

    /**
     * 判断元素element是否包含给定的样式类名className
     * @method hasClass
     * @param { Node } ele 需要检测的元素
     * @param { Array } classNames 需要检测的className数组
     * @return { Boolean } 元素是否包含所有给定的className
     * @example
     * ```html
     * <span id="test1" class="cls1 cls2"></span>
     *
     * <script>
     *     var test1 = document.getElementById("test1");
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.hasClass( test1, [ "cls2", "cls1", "cls3" ] ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.hasClass( test1, [ "cls2", "cls1" ]) );
     * </script>
     * ```
     */
    hasClass:function (element, className) {
        if(utils.isRegExp(className)){
            return className.test(element.className)
        }
        className = utils.trim(className).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = element.className;ci=className[i++];){
            if(!new RegExp('\\b' + ci + '\\b','i').test(cls)){
                return false;
            }
        }
        return i - 1 == className.length;
    },

    /**
     * 阻止事件默认行为
     * @method preventDefault
     * @param { Event } evt 需要阻止默认行为的事件对象
     * @example
     * ```javascript
     * UE.dom.domUtils.preventDefault( evt );
     * ```
     */
    preventDefault:function (evt) {
        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    },
    /**
     * 删除元素element指定的样式
     * @method removeStyle
     * @param { Element } element 需要删除样式的元素
     * @param { String } styleName 需要删除的样式名
     * @example
     * ```html
     * <span id="test" style="color: red; background: blue;"></span>
     *
     * <script>
     *
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.removeStyle( testNode, 'color' );
     *
     *     //output: background: blue;
     *     console.log( testNode.style.cssText );
     *
     * </script>
     * ```
     */
    removeStyle:function (element, name) {
        if(browser.ie ){
            //针对color先单独处理一下
            if(name == 'color'){
                name = '(^|;)' + name;
            }
            element.style.cssText = element.style.cssText.replace(new RegExp(name + '[^:]*:[^;]+;?','ig'),'')
        }else{
            if (element.style.removeProperty) {
                element.style.removeProperty (name);
            }else {
                element.style.removeAttribute (utils.cssStyleToDomStyle(name));
            }
        }


        if (!element.style.cssText) {
            domUtils.removeAttributes(element, ['style']);
        }
    },
    /**
     * 获取元素element的style属性的指定值
     * @method getStyle
     * @param { Element } element 需要获取属性值的元素
     * @param { String } styleName 需要获取的style的名称
     * @warning 该方法仅获取元素style属性中所标明的值
     * @return { String } 该元素包含指定的style属性值
     * @example
     * ```html
     * <div id="test" style="color: red;"></div>
     *
     * <script>
     *
     *      var testNode = document.getElementById( "test" );
     *
     *      //output: red
     *      console.log( UE.dom.domUtils.getStyle( testNode, "color" ) );
     *
     *      //output: ""
     *      console.log( UE.dom.domUtils.getStyle( testNode, "background" ) );
     *
     * </script>
     * ```
     */
    getStyle:function (element, name) {
        var value = element.style[ utils.cssStyleToDomStyle(name) ];
        return utils.fixColor(name, value);
    },
    /**
     * 为元素element设置样式属性值
     * @method setStyle
     * @param { Element } element 需要设置样式的元素
     * @param { String } styleName 样式名
     * @param { String } styleValue 样式值
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *
     *      var testNode = document.getElementById( "test" );
     *
     *      //output: ""
     *      console.log( testNode.style.color );
     *
     *      UE.dom.domUtils.setStyle( testNode, 'color', 'red' );
     *      //output: "red"
     *      console.log( testNode.style.color );
     *
     * </script>
     * ```
     */
    setStyle:function (element, name, value) {
        element.style[utils.cssStyleToDomStyle(name)] = value;
        if(!utils.trim(element.style.cssText)){
            this.removeAttributes(element,'style')
        }
    },
    /**
     * 为元素element设置多个样式属性值
     * @method setStyles
     * @param { Element } element 需要设置样式的元素
     * @param { Object } styles 样式名值对
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *
     *      var testNode = document.getElementById( "test" );
     *
     *      //output: ""
     *      console.log( testNode.style.color );
     *
     *      UE.dom.domUtils.setStyles( testNode, {
     *          'color': 'red'
     *      } );
     *      //output: "red"
     *      console.log( testNode.style.color );
     *
     * </script>
     * ```
     */
    setStyles:function (element, styles) {
        for (var name in styles) {
            if (styles.hasOwnProperty(name)) {
                domUtils.setStyle(element, name, styles[name]);
            }
        }
    },
    /**
     * 删除_moz_dirty属性
     * @private
     * @method removeDirtyAttr
     */
    removeDirtyAttr:function (node) {
        for (var i = 0, ci, nodes = node.getElementsByTagName('*'); ci = nodes[i++];) {
            ci.removeAttribute('_moz_dirty');
        }
        node.removeAttribute('_moz_dirty');
    },
    /**
     * 获取子节点的数量
     * @method getChildCount
     * @param { Element } node 需要检测的元素
     * @return { Number } 给定的node元素的子节点数量
     * @example
     * ```html
     * <div id="test">
     *      <span></span>
     * </div>
     *
     * <script>
     *
     *     //output: 3
     *     console.log( UE.dom.domUtils.getChildCount( document.getElementById("test") ) );
     *
     * </script>
     * ```
     */

    /**
     * 根据给定的过滤规则， 获取符合条件的子节点的数量
     * @method getChildCount
     * @param { Element } node 需要检测的元素
     * @param { Function } fn 过滤器， 要求对符合条件的子节点返回true， 反之则要求返回false
     * @return { Number } 符合过滤条件的node元素的子节点数量
     * @example
     * ```html
     * <div id="test">
     *      <span></span>
     * </div>
     *
     * <script>
     *
     *     //output: 1
     *     console.log( UE.dom.domUtils.getChildCount( document.getElementById("test"), function ( node ) {
     *
     *         return node.nodeType === 1;
     *
     *     } ) );
     *
     * </script>
     * ```
     */
    getChildCount:function (node, fn) {
        var count = 0, first = node.firstChild;
        fn = fn || function () {
            return 1;
        };
        while (first) {
            if (fn(first)) {
                count++;
            }
            first = first.nextSibling;
        }
        return count;
    },

    /**
     * 判断给定节点是否为空节点
     * @method isEmptyNode
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 节点是否为空
     * @example
     * ```javascript
     * UE.dom.domUtils.isEmptyNode( document.body );
     * ```
     */
    isEmptyNode:function (node) {
        return !node.firstChild || domUtils.getChildCount(node, function (node) {
            return  !domUtils.isBr(node) && !domUtils.isBookmarkNode(node) && !domUtils.isWhitespace(node)
        }) == 0
    },
    clearSelectedArr:function (nodes) {
        var node;
        while (node = nodes.pop()) {
            domUtils.removeAttributes(node, ['class']);
        }
    },
    /**
     * 将显示区域滚动到指定节点的位置
     * @method scrollToView
     * @param    {Node}   node    节点
     * @param    {window}   win      window对象
     * @param    {Number}    offsetTop    距离上方的偏移量
     */
    scrollToView:function (node, win, offsetTop) {
        var getViewPaneSize = function () {
                var doc = win.document,
                    mode = doc.compatMode == 'CSS1Compat';
                return {
                    width:( mode ? doc.documentElement.clientWidth : doc.body.clientWidth ) || 0,
                    height:( mode ? doc.documentElement.clientHeight : doc.body.clientHeight ) || 0
                };
            },
            getScrollPosition = function (win) {
                if ('pageXOffset' in win) {
                    return {
                        x:win.pageXOffset || 0,
                        y:win.pageYOffset || 0
                    };
                }
                else {
                    var doc = win.document;
                    return {
                        x:doc.documentElement.scrollLeft || doc.body.scrollLeft || 0,
                        y:doc.documentElement.scrollTop || doc.body.scrollTop || 0
                    };
                }
            };
        var winHeight = getViewPaneSize().height, offset = winHeight * -1 + offsetTop;
        offset += (node.offsetHeight || 0);
        var elementPosition = domUtils.getXY(node);
        offset += elementPosition.y;
        var currentScroll = getScrollPosition(win).y;
        // offset += 50;
        if (offset > currentScroll || offset < currentScroll - winHeight) {
            win.scrollTo(0, offset + (offset < 0 ? -20 : 20));
        }
    },
    /**
     * 判断给定节点是否为br
     * @method isBr
     * @param { Node } node 需要判断的节点对象
     * @return { Boolean } 给定的节点是否是br节点
     */
    isBr:function (node) {
        return node.nodeType == 1 && node.tagName == 'BR';
    },
    /**
     * 判断给定的节点是否是一个“填充”节点
     * @private
     * @method isFillChar
     * @param { Node } node 需要判断的节点
     * @param { Boolean } isInStart 是否从节点内容的开始位置匹配
     * @returns { Boolean } 节点是否是填充节点
     */
    isFillChar:function (node,isInStart) {
        if(node.nodeType != 3)
            return false;
        var text = node.nodeValue;
        if(isInStart){
            return new RegExp('^' + domUtils.fillChar).test(text)
        }
        return !text.replace(new RegExp(domUtils.fillChar,'g'), '').length
    },
    isStartInblock:function (range) {
        var tmpRange = range.cloneRange(),
            flag = 0,
            start = tmpRange.startContainer,
            tmp;
        if(start.nodeType == 1 && start.childNodes[tmpRange.startOffset]){
            start = start.childNodes[tmpRange.startOffset];
            var pre = start.previousSibling;
            while(pre && domUtils.isFillChar(pre)){
                start = pre;
                pre = pre.previousSibling;
            }
        }
        if(this.isFillChar(start,true) && tmpRange.startOffset == 1){
            tmpRange.setStartBefore(start);
            start = tmpRange.startContainer;
        }

        while (start && domUtils.isFillChar(start)) {
            tmp = start;
            start = start.previousSibling
        }
        if (tmp) {
            tmpRange.setStartBefore(tmp);
            start = tmpRange.startContainer;
        }
        if (start.nodeType == 1 && domUtils.isEmptyNode(start) && tmpRange.startOffset == 1) {
            tmpRange.setStart(start, 0).collapse(true);
        }
        while (!tmpRange.startOffset) {
            start = tmpRange.startContainer;
            if (domUtils.isBlockElm(start) || domUtils.isBody(start)) {
                flag = 1;
                break;
            }
            var pre = tmpRange.startContainer.previousSibling,
                tmpNode;
            if (!pre) {
                tmpRange.setStartBefore(tmpRange.startContainer);
            } else {
                while (pre && domUtils.isFillChar(pre)) {
                    tmpNode = pre;
                    pre = pre.previousSibling;
                }
                if (tmpNode) {
                    tmpRange.setStartBefore(tmpNode);
                } else {
                    tmpRange.setStartBefore(tmpRange.startContainer);
                }
            }
        }
        return flag && !domUtils.isBody(tmpRange.startContainer) ? 1 : 0;
    },

    /**
     * 判断给定的元素是否是一个空元素
     * @method isEmptyBlock
     * @param { Element } node 需要判断的元素
     * @return { Boolean } 是否是空元素
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *     //output: true
     *     console.log( UE.dom.domUtils.isEmptyBlock( document.getElementById("test") ) );
     * </script>
     * ```
     */

    /**
     * 根据指定的判断规则判断给定的元素是否是一个空元素
     * @method isEmptyBlock
     * @param { Element } node 需要判断的元素
     * @param { RegExp } reg 对内容执行判断的正则表达式对象
     * @return { Boolean } 是否是空元素
     */
    isEmptyBlock:function (node,reg) {
        if(node.nodeType != 1)
            return 0;
        reg = reg || new RegExp('[ \xa0\t\r\n' + domUtils.fillChar + ']', 'g');

        if (node[browser.ie ? 'innerText' : 'textContent'].replace(reg, '').length > 0) {
            return 0;
        }
        for (var n in dtd.$isNotEmpty) {
            if (node.getElementsByTagName(n).length) {
                return 0;
            }
        }
        return 1;
    },

    /**
     * 移动元素使得该元素的位置移动指定的偏移量的距离
     * @method setViewportOffset
     * @param { Element } element 需要设置偏移量的元素
     * @param { Object } offset 偏移量， 形如{ left: 100, top: 50 }的一个键值对， 表示该元素将在
     *                                  现有的位置上向水平方向偏移offset.left的距离， 在竖直方向上偏移
     *                                  offset.top的距离
     * @example
     * ```html
     * <div id="test" style="top: 100px; left: 50px; position: absolute;"></div>
     *
     * <script>
     *
     *     var testNode = document.getElementById("test");
     *
     *     UE.dom.domUtils.setViewportOffset( testNode, {
     *         left: 200,
     *         top: 50
     *     } );
     *
     *     //output: top: 300px; left: 100px; position: absolute;
     *     console.log( testNode.style.cssText );
     *
     * </script>
     * ```
     */
    setViewportOffset:function (element, offset) {
        var left = parseInt(element.style.left) | 0;
        var top = parseInt(element.style.top) | 0;
        var rect = element.getBoundingClientRect();
        var offsetLeft = offset.left - rect.left;
        var offsetTop = offset.top - rect.top;
        if (offsetLeft) {
            element.style.left = left + offsetLeft + 'px';
        }
        if (offsetTop) {
            element.style.top = top + offsetTop + 'px';
        }
    },

    /**
     * 用“填充字符”填充节点
     * @method fillNode
     * @private
     * @param { DomDocument } doc 填充的节点所在的docment对象
     * @param { Node } node 需要填充的节点对象
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *     var testNode = document.getElementById("test");
     *
     *     //output: 0
     *     console.log( testNode.childNodes.length );
     *
     *     UE.dom.domUtils.fillNode( document, testNode );
     *
     *     //output: 1
     *     console.log( testNode.childNodes.length );
     *
     * </script>
     * ```
     */
    fillNode:function (doc, node) {
        var tmpNode = browser.ie ? doc.createTextNode(domUtils.fillChar) : doc.createElement('br');
        node.innerHTML = '';
        node.appendChild(tmpNode);
    },

    /**
     * 把节点src的所有子节点追加到另一个节点tag上去
     * @method moveChild
     * @param { Node } src 源节点， 该节点下的所有子节点将被移除
     * @param { Node } tag 目标节点， 从源节点移除的子节点将被追加到该节点下
     * @example
     * ```html
     * <div id="test1">
     *      <span></span>
     * </div>
     * <div id="test2">
     *     <div></div>
     * </div>
     *
     * <script>
     *
     *     var test1 = document.getElementById("test1"),
     *         test2 = document.getElementById("test2");
     *
     *     UE.dom.domUtils.moveChild( test1, test2 );
     *
     *     //output: ""（空字符串）
     *     console.log( test1.innerHTML );
     *
     *     //output: "<div></div><span></span>"
     *     console.log( test2.innerHTML );
     *
     * </script>
     * ```
     */

    /**
     * 把节点src的所有子节点移动到另一个节点tag上去, 可以通过dir参数控制附加的行为是“追加”还是“插入顶部”
     * @method moveChild
     * @param { Node } src 源节点， 该节点下的所有子节点将被移除
     * @param { Node } tag 目标节点， 从源节点移除的子节点将被附加到该节点下
     * @param { Boolean } dir 附加方式， 如果为true， 则附加进去的节点将被放到目标节点的顶部， 反之，则放到末尾
     * @example
     * ```html
     * <div id="test1">
     *      <span></span>
     * </div>
     * <div id="test2">
     *     <div></div>
     * </div>
     *
     * <script>
     *
     *     var test1 = document.getElementById("test1"),
     *         test2 = document.getElementById("test2");
     *
     *     UE.dom.domUtils.moveChild( test1, test2, true );
     *
     *     //output: ""（空字符串）
     *     console.log( test1.innerHTML );
     *
     *     //output: "<span></span><div></div>"
     *     console.log( test2.innerHTML );
     *
     * </script>
     * ```
     */
    moveChild:function (src, tag, dir) {
        while (src.firstChild) {
            if (dir && tag.firstChild) {
                tag.insertBefore(src.lastChild, tag.firstChild);
            } else {
                tag.appendChild(src.firstChild);
            }
        }
    },

    /**
     * 判断节点的标签上是否不存在任何属性
     * @method hasNoAttributes
     * @private
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 节点是否不包含任何属性
     * @example
     * ```html
     * <div id="test"><span>xxxx</span></div>
     *
     * <script>
     *
     *     //output: false
     *     console.log( UE.dom.domUtils.hasNoAttributes( document.getElementById("test") ) );
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.hasNoAttributes( document.getElementById("test").firstChild ) );
     *
     * </script>
     * ```
     */
    hasNoAttributes:function (node) {
        return browser.ie ? /^<\w+\s*?>/.test(node.outerHTML) : node.attributes.length == 0;
    },

    /**
     * 检测节点是否是UEditor所使用的辅助节点
     * @method isCustomeNode
     * @private
     * @param { Node } node 需要检测的节点
     * @remind 辅助节点是指编辑器要完成工作临时添加的节点， 在输出的时候将会从编辑器内移除， 不会影响最终的结果。
     * @return { Boolean } 给定的节点是否是一个辅助节点
     */
    isCustomeNode:function (node) {
        return node.nodeType == 1 && node.getAttribute('_ue_custom_node_');
    },

    /**
     * 检测节点的标签是否是给定的标签
     * @method isTagNode
     * @param { Node } node 需要检测的节点对象
     * @param { String } tagName 标签
     * @return { Boolean } 节点的标签是否是给定的标签
     * @example
     * ```html
     * <div id="test"></div>
     *
     * <script>
     *
     *     //output: true
     *     console.log( UE.dom.domUtils.isTagNode( document.getElementById("test"), "div" ) );
     *
     * </script>
     * ```
     */
    isTagNode:function (node, tagNames) {
        return node.nodeType == 1 && new RegExp('\\b' + node.tagName + '\\b','i').test(tagNames)
    },

    /**
     * 给定一个节点数组，在通过指定的过滤器过滤后， 获取其中满足过滤条件的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
     * @return { Node | NULL } 如果找到符合过滤条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: null
     * console.log( UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() !== 'div';
     * } ) );
     * ```
     */

    /**
     * 给定一个节点数组nodeList和一组标签名tagNames， 获取其中能够匹配标签名的节点集合中的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { String } tagNames 需要匹配的标签名， 多个标签名之间用空格分割
     * @return { Node | NULL } 如果找到标签名匹配的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: null
     * console.log( UE.dom.domUtils.filterNodeList( divNodes, 'a span' ) );
     * ```
     */

    /**
     * 给定一个节点数组，在通过指定的过滤器过滤后， 如果参数forAll为true， 则会返回所有满足过滤
     * 条件的节点集合， 否则， 返回满足条件的节点集合中的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
     * @param { Boolean } forAll 是否返回整个节点数组, 如果该参数为false， 则返回节点集合中的第一个节点
     * @return { Array | Node | NULL } 如果找到符合过滤条件的节点， 则根据参数forAll的值决定返回满足
     *                                      过滤条件的节点数组或第一个节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: 3（假定有3个div）
     * console.log( divNodes.length );
     *
     * var nodes = UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() === 'div';
     * }, true );
     *
     * //output: 3
     * console.log( nodes.length );
     *
     * var node = UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() === 'div';
     * }, false );
     *
     * //output: div
     * console.log( node.nodeName );
     * ```
     */
    filterNodeList : function(nodelist,filter,forAll){
        var results = [];
        if(!utils .isFunction(filter)){
            var str = filter;
            filter = function(n){
                return utils.indexOf(utils.isArray(str) ? str:str.split(' '), n.tagName.toLowerCase()) != -1
            };
        }
        utils.each(nodelist,function(n){
            filter(n) && results.push(n)
        });
        return results.length  == 0 ? null : results.length == 1 || !forAll ? results[0] : results
    },

    /**
     * 查询给定的range选区是否在给定的node节点内，且在该节点的最末尾
     * @method isInNodeEndBoundary
     * @param { UE.dom.Range } rng 需要判断的range对象， 该对象的startContainer不能为NULL
     * @param node 需要检测的节点对象
     * @return { Number } 如果给定的选取range对象是在node内部的最末端， 则返回1, 否则返回0
     */
    isInNodeEndBoundary : function (rng,node){
        var start = rng.startContainer;
        if(start.nodeType == 3 && rng.startOffset != start.nodeValue.length){
            return 0;
        }
        if(start.nodeType == 1 && rng.startOffset != start.childNodes.length){
            return 0;
        }
        while(start !== node){
            if(start.nextSibling){
                return 0
            };
            start = start.parentNode;
        }
        return 1;
    },
    isBoundaryNode : function (node,dir){
        var tmp;
        while(!domUtils.isBody(node)){
            tmp = node;
            node = node.parentNode;
            if(tmp !== node[dir]){
                return false;
            }
        }
        return true;
    },
    fillHtml :  browser.ie11below ? '&nbsp;' : '<br/>'
};
var fillCharReg = new RegExp(domUtils.fillChar, 'g');

// core/Range.js
/**
 * Range封装
 * @file
 * @module UE.dom
 * @class Range
 * @since 1.2.6.1
 */

/**
 * dom操作封装
 * @unfile
 * @module UE.dom
 */

/**
 * Range实现类，本类是UEditor底层核心类，封装不同浏览器之间的Range操作。
 * @unfile
 * @module UE.dom
 * @class Range
 */


(function () {
    var guid = 0,
        fillChar = domUtils.fillChar,
        fillData;

    /**
     * 更新range的collapse状态
     * @param  {Range}   range    range对象
     */
    function updateCollapse(range) {
        range.collapsed =
            range.startContainer && range.endContainer &&
                range.startContainer === range.endContainer &&
                range.startOffset == range.endOffset;
    }

    function selectOneNode(rng){
        return !rng.collapsed && rng.startContainer.nodeType == 1 && rng.startContainer === rng.endContainer && rng.endOffset - rng.startOffset == 1
    }
    function setEndPoint(toStart, node, offset, range) {
        //如果node是自闭合标签要处理
        if (node.nodeType == 1 && (dtd.$empty[node.tagName] || dtd.$nonChild[node.tagName])) {
            offset = domUtils.getNodeIndex(node) + (toStart ? 0 : 1);
            node = node.parentNode;
        }
        if (toStart) {
            range.startContainer = node;
            range.startOffset = offset;
            if (!range.endContainer) {
                range.collapse(true);
            }
        } else {
            range.endContainer = node;
            range.endOffset = offset;
            if (!range.startContainer) {
                range.collapse(false);
            }
        }
        updateCollapse(range);
        return range;
    }

    function execContentsAction(range, action) {
        //调整边界
        //range.includeBookmark();
        var start = range.startContainer,
            end = range.endContainer,
            startOffset = range.startOffset,
            endOffset = range.endOffset,
            doc = range.document,
            frag = doc.createDocumentFragment(),
            tmpStart, tmpEnd;
        if (start.nodeType == 1) {
            start = start.childNodes[startOffset] || (tmpStart = start.appendChild(doc.createTextNode('')));
        }
        if (end.nodeType == 1) {
            end = end.childNodes[endOffset] || (tmpEnd = end.appendChild(doc.createTextNode('')));
        }
        if (start === end && start.nodeType == 3) {
            frag.appendChild(doc.createTextNode(start.substringData(startOffset, endOffset - startOffset)));
            //is not clone
            if (action) {
                start.deleteData(startOffset, endOffset - startOffset);
                range.collapse(true);
            }
            return frag;
        }
        var current, currentLevel, clone = frag,
            startParents = domUtils.findParents(start, true), endParents = domUtils.findParents(end, true);
        for (var i = 0; startParents[i] == endParents[i];) {
            i++;
        }
        for (var j = i, si; si = startParents[j]; j++) {
            current = si.nextSibling;
            if (si == start) {
                if (!tmpStart) {
                    if (range.startContainer.nodeType == 3) {
                        clone.appendChild(doc.createTextNode(start.nodeValue.slice(startOffset)));
                        //is not clone
                        if (action) {
                            start.deleteData(startOffset, start.nodeValue.length - startOffset);
                        }
                    } else {
                        clone.appendChild(!action ? start.cloneNode(true) : start);
                    }
                }
            } else {
                currentLevel = si.cloneNode(false);
                clone.appendChild(currentLevel);
            }
            while (current) {
                if (current === end || current === endParents[j]) {
                    break;
                }
                si = current.nextSibling;
                clone.appendChild(!action ? current.cloneNode(true) : current);
                current = si;
            }
            clone = currentLevel;
        }
        clone = frag;
        if (!startParents[i]) {
            clone.appendChild(startParents[i - 1].cloneNode(false));
            clone = clone.firstChild;
        }
        for (var j = i, ei; ei = endParents[j]; j++) {
            current = ei.previousSibling;
            if (ei == end) {
                if (!tmpEnd && range.endContainer.nodeType == 3) {
                    clone.appendChild(doc.createTextNode(end.substringData(0, endOffset)));
                    //is not clone
                    if (action) {
                        end.deleteData(0, endOffset);
                    }
                }
            } else {
                currentLevel = ei.cloneNode(false);
                clone.appendChild(currentLevel);
            }
            //如果两端同级，右边第一次已经被开始做了
            if (j != i || !startParents[i]) {
                while (current) {
                    if (current === start) {
                        break;
                    }
                    ei = current.previousSibling;
                    clone.insertBefore(!action ? current.cloneNode(true) : current, clone.firstChild);
                    current = ei;
                }
            }
            clone = currentLevel;
        }
        if (action) {
            range.setStartBefore(!endParents[i] ? endParents[i - 1] : !startParents[i] ? startParents[i - 1] : endParents[i]).collapse(true);
        }
        tmpStart && domUtils.remove(tmpStart);
        tmpEnd && domUtils.remove(tmpEnd);
        return frag;
    }

    /**
     * 创建一个跟document绑定的空的Range实例
     * @constructor
     * @param { Document } document 新建的选区所属的文档对象
     */

    /**
     * @property { Node } startContainer 当前Range的开始边界的容器节点, 可以是一个元素节点或者是文本节点
     */

    /**
     * @property { Node } startOffset 当前Range的开始边界容器节点的偏移量, 如果是元素节点，
     *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
     */

    /**
     * @property { Node } endContainer 当前Range的结束边界的容器节点, 可以是一个元素节点或者是文本节点
     */

    /**
     * @property { Node } endOffset 当前Range的结束边界容器节点的偏移量, 如果是元素节点，
     *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
     */

    /**
     * @property { Boolean } collapsed 当前Range是否闭合
     * @default true
     * @remind Range是闭合的时候， startContainer === endContainer && startOffset === endOffset
     */

    /**
     * @property { Document } document 当前Range所属的Document对象
     * @remind 不同range的的document属性可以是不同的
     */
    var Range = dom.Range = function (document) {
        var me = this;
        me.startContainer =
            me.startOffset =
                me.endContainer =
                    me.endOffset = null;
        me.document = document;
        me.collapsed = true;
    };

    /**
     * 删除fillData
     * @param doc
     * @param excludeNode
     */
    function removeFillData(doc, excludeNode) {
        try {
            if (fillData && domUtils.inDoc(fillData, doc)) {
                if (!fillData.nodeValue.replace(fillCharReg, '').length) {
                    var tmpNode = fillData.parentNode;
                    domUtils.remove(fillData);
                    while (tmpNode && domUtils.isEmptyInlineElement(tmpNode) &&
                        //safari的contains有bug
                        (browser.safari ? !(domUtils.getPosition(tmpNode,excludeNode) & domUtils.POSITION_CONTAINS) : !tmpNode.contains(excludeNode))
                        ) {
                        fillData = tmpNode.parentNode;
                        domUtils.remove(tmpNode);
                        tmpNode = fillData;
                    }
                } else {
                    fillData.nodeValue = fillData.nodeValue.replace(fillCharReg, '');
                }
            }
        } catch (e) {
        }
    }

    /**
     * @param node
     * @param dir
     */
    function mergeSibling(node, dir) {
        var tmpNode;
        node = node[dir];
        while (node && domUtils.isFillChar(node)) {
            tmpNode = node[dir];
            domUtils.remove(node);
            node = tmpNode;
        }
    }

    Range.prototype = {

        /**
         * 克隆选区的内容到一个DocumentFragment里
         * @method cloneContents
         * @return { DocumentFragment | NULL } 如果选区是闭合的将返回null， 否则， 返回包含所clone内容的DocumentFragment元素
         * @example
         * ```html
         * <body>
         *      <!-- 中括号表示选区 -->
         *      <b>x<i>x[x</i>xx]x</b>
         *
         *      <script>
         *          //range是已选中的选区
         *          var fragment = range.cloneContents(),
         *              node = document.createElement("div");
         *
         *          node.appendChild( fragment );
         *
         *          //output: <i>x</i>xx
         *          console.log( node.innerHTML );
         *
         *      </script>
         * </body>
         * ```
         */
        cloneContents:function () {
            return this.collapsed ? null : execContentsAction(this, 0);
        },

        /**
         * 删除当前选区范围中的所有内容
         * @method deleteContents
         * @remind 执行完该操作后， 当前Range对象变成了闭合状态
         * @return { UE.dom.Range } 当前操作的Range对象
         * @example
         * ```html
         * <body>
         *      <!-- 中括号表示选区 -->
         *      <b>x<i>x[x</i>xx]x</b>
         *
         *      <script>
         *          //range是已选中的选区
         *          range.deleteContents();
         *
         *          //竖线表示闭合后的选区位置
         *          //output: <b>x<i>x</i>|x</b>
         *          console.log( document.body.innerHTML );
         *
         *          //此时， range的各项属性为
         *          //output: B
         *          console.log( range.startContainer.tagName );
         *          //output: 2
         *          console.log( range.startOffset );
         *          //output: B
         *          console.log( range.endContainer.tagName );
         *          //output: 2
         *          console.log( range.endOffset );
         *          //output: true
         *          console.log( range.collapsed );
         *
         *      </script>
         * </body>
         * ```
         */
        deleteContents:function () {
            var txt;
            if (!this.collapsed) {
                execContentsAction(this, 1);
            }
            if (browser.webkit) {
                txt = this.startContainer;
                if (txt.nodeType == 3 && !txt.nodeValue.length) {
                    this.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt);
                }
            }
            return this;
        },

        /**
         * 将当前选区的内容提取到一个DocumentFragment里
         * @method extractContents
         * @remind 执行该操作后， 选区将变成闭合状态
         * @warning 执行该操作后， 原来选区所选中的内容将从dom树上剥离出来
         * @return { DocumentFragment } 返回包含所提取内容的DocumentFragment对象
         * @example
         * ```html
         * <body>
         *      <!-- 中括号表示选区 -->
         *      <b>x<i>x[x</i>xx]x</b>
         *
         *      <script>
         *          //range是已选中的选区
         *          var fragment = range.extractContents(),
         *              node = document.createElement( "div" );
         *
         *          node.appendChild( fragment );
         *
         *          //竖线表示闭合后的选区位置
         *
         *          //output: <b>x<i>x</i>|x</b>
         *          console.log( document.body.innerHTML );
         *          //output: <i>x</i>xx
         *          console.log( node.innerHTML );
         *
         *          //此时， range的各项属性为
         *          //output: B
         *          console.log( range.startContainer.tagName );
         *          //output: 2
         *          console.log( range.startOffset );
         *          //output: B
         *          console.log( range.endContainer.tagName );
         *          //output: 2
         *          console.log( range.endOffset );
         *          //output: true
         *          console.log( range.collapsed );
         *
         *      </script>
         * </body>
         */
        extractContents:function () {
            return this.collapsed ? null : execContentsAction(this, 2);
        },

        /**
         * 设置Range的开始容器节点和偏移量
         * @method  setStart
         * @remind 如果给定的节点是元素节点，那么offset指的是其子元素中索引为offset的元素，
         *          如果是文本节点，那么offset指的是其文本内容的第offset个字符
         * @remind 如果提供的容器节点是一个不能包含子元素的节点， 则该选区的开始容器将被设置
         *          为该节点的父节点， 此时， 其距离开始容器的偏移量也变成了该节点在其父节点
         *          中的索引
         * @param { Node } node 将被设为当前选区开始边界容器的节点对象
         * @param { int } offset 选区的开始位置偏移量
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区 -->
         * <b>xxx<i>x<span>xx</span>xx<em>xx</em>xxx</i>[xxx]</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStart( document.getElementsByTagName("i")[0], 1 );
         *
         *     //此时， 选区变成了
         *     //<b>xxx<i>x[<span>xx</span>xx<em>xx</em>xxx</i>xxx]</b>
         *
         * </script>
         * ```
         * @example
         * ```html
         * <!-- 选区 -->
         * <b>xxx<img>[xx]x</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStart( document.getElementsByTagName("img")[0], 3 );
         *
         *     //此时， 选区变成了
         *     //<b>xxx[<img>xx]x</b>
         *
         * </script>
         * ```
         */
        setStart:function (node, offset) {
            return setEndPoint(true, node, offset, this);
        },

        /**
         * 设置Range的结束容器和偏移量
         * @method  setEnd
         * @param { Node } node 作为当前选区结束边界容器的节点对象
         * @param { int } offset 结束边界的偏移量
         * @see UE.dom.Range:setStart(Node,int)
         * @return { UE.dom.Range } 当前range对象
         */
        setEnd:function (node, offset) {
            return setEndPoint(false, node, offset, this);
        },

        /**
         * 将Range开始位置设置到node节点之后
         * @method  setStartAfter
         * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引+1
         * @param { Node } node 选区的开始边界将紧接着该节点之后
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>xx[x</span>xxx]</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStartAfter( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx<i>xxx</i>[<span>xxx</span>xxx]</b>
         *
         * </script>
         * ```
         */
        setStartAfter:function (node) {
            return this.setStart(node.parentNode, domUtils.getNodeIndex(node) + 1);
        },

        /**
         * 将Range开始位置设置到node节点之前
         * @method  setStartBefore
         * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引
         * @param { Node } node 新的选区开始位置在该节点之前
         * @see UE.dom.Range:setStartAfter(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setStartBefore:function (node) {
            return this.setStart(node.parentNode, domUtils.getNodeIndex(node));
        },

        /**
         * 将Range结束位置设置到node节点之后
         * @method  setEndAfter
         * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引+1
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setStartAfter(Node)
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>[xx<i>xxx</i><span>xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStartAfter( document.getElementsByTagName("span")[0] );
         *
         *     //结果选区
         *     //<b>[xx<i>xxx</i><span>xxx</span>]xxx</b>
         *
         * </script>
         * ```
         */
        setEndAfter:function (node) {
            return this.setEnd(node.parentNode, domUtils.getNodeIndex(node) + 1);
        },

        /**
         * 将Range结束位置设置到node节点之前
         * @method  setEndBefore
         * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setEndAfter(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setEndBefore:function (node) {
            return this.setEnd(node.parentNode, domUtils.getNodeIndex(node));
        },

        /**
         * 设置Range的开始位置到node节点内的第一个子节点之前
         * @method  setStartAtFirst
         * @remind 选区的开始容器将变成给定的节点， 且偏移量为0
         * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setStartBefore(Node)
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.setStartAtFirst( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx<i>[xxx</i><span>xx]x</span>xxx</b>
         *
         * </script>
         * ```
         */
        setStartAtFirst:function (node) {
            return this.setStart(node, 0);
        },

        /**
         * 设置Range的开始位置到node节点内的最后一个节点之后
         * @method setStartAtLast
         * @remind 选区的开始容器将变成给定的节点， 且偏移量为该节点的子节点数
         * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
         * @param { Node } node 目标节点
         * @see UE.dom.Range:setStartAtFirst(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setStartAtLast:function (node) {
            return this.setStart(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
        },

        /**
         * 设置Range的结束位置到node节点内的第一个节点之前
         * @method  setEndAtFirst
         * @param { Node } node 目标节点
         * @remind 选区的结束容器将变成给定的节点， 且偏移量为0
         * @remind node必须是一个元素节点， 且必须是允许包含子节点的元素。
         * @see UE.dom.Range:setStartAtFirst(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setEndAtFirst:function (node) {
            return this.setEnd(node, 0);
        },

        /**
         * 设置Range的结束位置到node节点内的最后一个节点之后
         * @method  setEndAtLast
         * @param { Node } node 目标节点
         * @remind 选区的结束容器将变成给定的节点， 且偏移量为该节点的子节点数量
         * @remind node必须是一个元素节点， 且必须是允许包含子节点的元素。
         * @see UE.dom.Range:setStartAtFirst(Node)
         * @return { UE.dom.Range } 当前range对象
         */
        setEndAtLast:function (node) {
            return this.setEnd(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
        },

        /**
         * 选中给定节点
         * @method  selectNode
         * @remind 此时， 选区的开始容器和结束容器都是该节点的父节点， 其startOffset是该节点在父节点中的位置索引，
         *          而endOffset为startOffset+1
         * @param { Node } node 需要选中的节点
         * @return { UE.dom.Range } 当前range对象，此时的range仅包含当前给定的节点对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.selectNode( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx[<i>xxx</i>]<span>xxx</span>xxx</b>
         *
         * </script>
         * ```
         */
        selectNode:function (node) {
            return this.setStartBefore(node).setEndAfter(node);
        },

        /**
         * 选中给定节点内部的所有节点
         * @method  selectNodeContents
         * @remind 此时， 选区的开始容器和结束容器都是该节点， 其startOffset为0，
         *          而endOffset是该节点的子节点数。
         * @param { Node } node 目标节点， 当前range将包含该节点内的所有节点
         * @return { UE.dom.Range } 当前range对象， 此时range仅包含给定节点的所有子节点
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.selectNode( document.getElementsByTagName("b")[0] );
         *
         *     //结果选区
         *     //<b>[xx<i>xxx</i><span>xxx</span>xxx]</b>
         *
         * </script>
         * ```
         */
        selectNodeContents:function (node) {
            return this.setStart(node, 0).setEndAtLast(node);
        },

        /**
         * clone当前Range对象
         * @method  cloneRange
         * @remind 返回的range是一个全新的range对象， 其内部所有属性与当前被clone的range相同。
         * @return { UE.dom.Range } 当前range对象的一个副本
         */
        cloneRange:function () {
            var me = this;
            return new Range(me.document).setStart(me.startContainer, me.startOffset).setEnd(me.endContainer, me.endOffset);

        },

        /**
         * 向当前选区的结束处闭合选区
         * @method  collapse
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.collapse();
         *
         *     //结果选区
         *     //“|”表示选区已闭合
         *     //<b>xx<i>xxx</i><span>xx|x</span>xxx</b>
         *
         * </script>
         * ```
         */

        /**
         * 闭合当前选区，根据给定的toStart参数项决定是向当前选区开始处闭合还是向结束处闭合，
         * 如果toStart的值为true，则向开始位置闭合， 反之，向结束位置闭合。
         * @method  collapse
         * @param { Boolean } toStart 是否向选区开始处闭合
         * @return { UE.dom.Range } 当前range对象，此时range对象处于闭合状态
         * @see UE.dom.Range:collapse()
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.collapse( true );
         *
         *     //结果选区
         *     //“|”表示选区已闭合
         *     //<b>xx<i>xxx</i><span>|xxx</span>xxx</b>
         *
         * </script>
         * ```
         */
        collapse:function (toStart) {
            var me = this;
            if (toStart) {
                me.endContainer = me.startContainer;
                me.endOffset = me.startOffset;
            } else {
                me.startContainer = me.endContainer;
                me.startOffset = me.endOffset;
            }
            me.collapsed = true;
            return me;
        },

        /**
         * 调整range的开始位置和结束位置，使其"收缩"到最小的位置
         * @method  shrinkBoundary
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         * <span>xx<b>xx[</b>xxxxx]</span> => <span>xx<b>xx</b>[xxxxx]</span>
         * ```
         *
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>x[xx</b><i>]xxx</i>
         *
         * <script>
         *
         *     //执行收缩
         *     range.shrinkBoundary();
         *
         *     //结果选区
         *     //<b>x[xx]</b><i>xxx</i>
         * </script>
         * ```
         *
         * @example
         * ```html
         * [<b><i>xxxx</i>xxxxxxx</b>] => <b><i>[xxxx</i>xxxxxxx]</b>
         * ```
         */

        /**
         * 调整range的开始位置和结束位置，使其"收缩"到最小的位置，
         * 如果ignoreEnd的值为true，则忽略对结束位置的调整
         * @method  shrinkBoundary
         * @param { Boolean } ignoreEnd 是否忽略对结束位置的调整
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.domUtils.Range:shrinkBoundary()
         */
        shrinkBoundary:function (ignoreEnd) {
            var me = this, child,
                collapsed = me.collapsed;
            function check(node){
                return node.nodeType == 1 && !domUtils.isBookmarkNode(node) && !dtd.$empty[node.tagName] && !dtd.$nonChild[node.tagName]
            }
            while (me.startContainer.nodeType == 1 //是element
                && (child = me.startContainer.childNodes[me.startOffset]) //子节点也是element
                && check(child)) {
                me.setStart(child, 0);
            }
            if (collapsed) {
                return me.collapse(true);
            }
            if (!ignoreEnd) {
                while (me.endContainer.nodeType == 1//是element
                    && me.endOffset > 0 //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
                    && (child = me.endContainer.childNodes[me.endOffset - 1]) //子节点也是element
                    && check(child)) {
                    me.setEnd(child, child.childNodes.length);
                }
            }
            return me;
        },

        /**
         * 获取离当前选区内包含的所有节点最近的公共祖先节点，
         * @method  getCommonAncestor
         * @remind 返回的公共祖先节点一定不是range自身的容器节点， 但有可能是一个文本节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         * @example
         * ```html
         * //选区示例
         * <span>xxx<b>x[x<em>xx]x</em>xxx</b>xx</span>
         * <script>
         *
         *     var node = range.getCommonAncestor();
         *
         *     //公共祖先节点是： b节点
         *     //输出： B
         *     console.log(node.tagName);
         *
         * </script>
         * ```
         */

        /**
         * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
         * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
         * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点
         * @method  getCommonAncestor
         * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         * @see UE.dom.Range:getCommonAncestor()
         * @example
         * ```html
         * <body>
         *
         *     <!-- 选区示例 -->
         *     <b>xxx<i>xxxx<span>xx[x</span>xx]x</i>xxxxxxx</b>
         *
         *     <script>
         *
         *         var node = range.getCommonAncestor( false );
         *
         *         //这里的公共祖先节点是B而不是I， 是因为参数限制了获取到的节点不能是容器节点
         *         //output: B
         *         console.log( node.tagName );
         *
         *     </script>
         *
         * </body>
         * ```
         */

        /**
         * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
         * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
         * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点； 同时可以根据
         * ignoreTextNode 参数的取值决定是否忽略类型为文本节点的祖先节点。
         * @method  getCommonAncestor
         * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
         * @param { Boolean } ignoreTextNode 获取祖先节点的过程中是否忽略类型为文本节点的祖先节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         * @see UE.dom.Range:getCommonAncestor()
         * @see UE.dom.Range:getCommonAncestor(Boolean)
         * @example
         * ```html
         * <body>
         *
         *     <!-- 选区示例 -->
         *     <b>xxx<i>xxxx<span>x[x]x</span>xxx</i>xxxxxxx</b>
         *
         *     <script>
         *
         *         var node = range.getCommonAncestor( true, false );
         *
         *         //output: SPAN
         *         console.log( node.tagName );
         *
         *     </script>
         *
         * </body>
         * ```
         */
        getCommonAncestor:function (includeSelf, ignoreTextNode) {
            var me = this,
                start = me.startContainer,
                end = me.endContainer;
            if (start === end) {
                if (includeSelf && selectOneNode(this)) {
                    start = start.childNodes[me.startOffset];
                    if(start.nodeType == 1)
                        return start;
                }
                //只有在上来就相等的情况下才会出现是文本的情况
                return ignoreTextNode && start.nodeType == 3 ? start.parentNode : start;
            }
            return domUtils.getCommonAncestor(start, end);
        },

        /**
         * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上
         * @method trimBoundary
         * @remind 该操作有可能会引起文本节点被切开
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         *
         * //选区示例
         * <b>xxx<i>[xxxxx]</i>xxx</b>
         *
         * <script>
         *     //未调整前， 选区的开始容器和结束都是文本节点
         *     //执行调整
         *     range.trimBoundary();
         *
         *     //调整之后， 容器节点变成了i节点
         *     //<b>xxx[<i>xxxxx</i>]xxx</b>
         * </script>
         * ```
         */

        /**
         * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上，
         * 可以根据 ignoreEnd 参数的值决定是否调整对结束边界的调整
         * @method trimBoundary
         * @param { Boolean } ignoreEnd 是否忽略对结束边界的调整
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         *
         * //选区示例
         * <b>xxx<i>[xxxxx]</i>xxx</b>
         *
         * <script>
         *     //未调整前， 选区的开始容器和结束都是文本节点
         *     //执行调整
         *     range.trimBoundary( true );
         *
         *     //调整之后， 开始容器节点变成了i节点
         *     //但是， 结束容器没有发生变化
         *     //<b>xxx[<i>xxxxx]</i>xxx</b>
         * </script>
         * ```
         */
        trimBoundary:function (ignoreEnd) {
            this.txtToElmBoundary();
            var start = this.startContainer,
                offset = this.startOffset,
                collapsed = this.collapsed,
                end = this.endContainer;
            if (start.nodeType == 3) {
                if (offset == 0) {
                    this.setStartBefore(start);
                } else {
                    if (offset >= start.nodeValue.length) {
                        this.setStartAfter(start);
                    } else {
                        var textNode = domUtils.split(start, offset);
                        //跟新结束边界
                        if (start === end) {
                            this.setEnd(textNode, this.endOffset - offset);
                        } else if (start.parentNode === end) {
                            this.endOffset += 1;
                        }
                        this.setStartBefore(textNode);
                    }
                }
                if (collapsed) {
                    return this.collapse(true);
                }
            }
            if (!ignoreEnd) {
                offset = this.endOffset;
                end = this.endContainer;
                if (end.nodeType == 3) {
                    if (offset == 0) {
                        this.setEndBefore(end);
                    } else {
                        offset < end.nodeValue.length && domUtils.split(end, offset);
                        this.setEndAfter(end);
                    }
                }
            }
            return this;
        },

        /**
         * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则什么也不做
         * @method txtToElmBoundary
         * @remind 该操作不会修改dom节点
         * @return { UE.dom.Range } 当前range对象
         */

        /**
         * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则根据参数项
         * ignoreCollapsed 的值决定是否执行该调整
         * @method txtToElmBoundary
         * @param { Boolean } ignoreCollapsed 是否忽略选区的闭合状态， 如果该参数取值为true， 则
         *                      不论选区是否闭合， 都会执行该操作， 反之， 则不会对闭合的选区执行该操作
         * @return { UE.dom.Range } 当前range对象
         */
        txtToElmBoundary:function (ignoreCollapsed) {
            function adjust(r, c) {
                var container = r[c + 'Container'],
                    offset = r[c + 'Offset'];
                if (container.nodeType == 3) {
                    if (!offset) {
                        r['set' + c.replace(/(\w)/, function (a) {
                            return a.toUpperCase();
                        }) + 'Before'](container);
                    } else if (offset >= container.nodeValue.length) {
                        r['set' + c.replace(/(\w)/, function (a) {
                            return a.toUpperCase();
                        }) + 'After' ](container);
                    }
                }
            }

            if (ignoreCollapsed || !this.collapsed) {
                adjust(this, 'start');
                adjust(this, 'end');
            }
            return this;
        },

        /**
         * 在当前选区的开始位置前插入节点，新插入的节点会被该range包含
         * @method  insertNode
         * @param { Node } node 需要插入的节点
         * @remind 插入的节点可以是一个DocumentFragment依次插入多个节点
         * @return { UE.dom.Range } 当前range对象
         */
        insertNode:function (node) {
            var first = node, length = 1;
            if (node.nodeType == 11) {
                first = node.firstChild;
                length = node.childNodes.length;
            }
            this.trimBoundary(true);
            var start = this.startContainer,
                offset = this.startOffset;
            var nextNode = start.childNodes[ offset ];
            if (nextNode) {
                start.insertBefore(node, nextNode);
            } else {
                start.appendChild(node);
            }
            if (first.parentNode === this.endContainer) {
                this.endOffset = this.endOffset + length;
            }
            return this.setStartBefore(first);
        },

        /**
         * 闭合选区到当前选区的开始位置， 并且定位光标到闭合后的位置
         * @method  setCursor
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:collapse()
         */

        /**
         * 闭合选区，可以根据参数toEnd的值控制选区是向前闭合还是向后闭合， 并且定位光标到闭合后的位置。
         * @method  setCursor
         * @param { Boolean } toEnd 是否向后闭合， 如果为true， 则闭合选区时， 将向结束容器方向闭合，
         *                      反之，则向开始容器方向闭合
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:collapse(Boolean)
         */
        setCursor:function (toEnd, noFillData) {
            return this.collapse(!toEnd).select(noFillData);
        },

        /**
         * 创建当前range的一个书签，记录下当前range的位置，方便当dom树改变时，还能找回原来的选区位置
         * @method createBookmark
         * @param { Boolean } serialize 控制返回的标记位置是对当前位置的引用还是ID，如果该值为true，则
         *                              返回标记位置的ID， 反之则返回标记位置节点的引用
         * @return { Object } 返回一个书签记录键值对， 其包含的key有： start => 开始标记的ID或者引用，
         *                          end => 结束标记的ID或引用， id => 当前标记的类型， 如果为true，则表示
         *                          返回的记录的类型为ID， 反之则为引用
         */
        createBookmark:function (serialize, same) {
            var endNode,
                startNode = this.document.createElement('span');
            startNode.style.cssText = 'display:none;line-height:0px;';
            startNode.appendChild(this.document.createTextNode('\u200D'));
            startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

            if (!this.collapsed) {
                endNode = startNode.cloneNode(true);
                endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
            }
            this.insertNode(startNode);
            if (endNode) {
                this.collapse().insertNode(endNode).setEndBefore(endNode);
            }
            this.setStartAfter(startNode);
            return {
                start:serialize ? startNode.id : startNode,
                end:endNode ? serialize ? endNode.id : endNode : null,
                id:serialize
            }
        },

        /**
         *  调整当前range的边界到书签位置，并删除该书签对象所标记的位置内的节点
         *  @method  moveToBookmark
         *  @param { BookMark } bookmark createBookmark所创建的标签对象
         *  @return { UE.dom.Range } 当前range对象
         *  @see UE.dom.Range:createBookmark(Boolean)
         */
        moveToBookmark:function (bookmark) {
            var start = bookmark.id ? this.document.getElementById(bookmark.start) : bookmark.start,
                end = bookmark.end && bookmark.id ? this.document.getElementById(bookmark.end) : bookmark.end;
            this.setStartBefore(start);
            domUtils.remove(start);
            if (end) {
                this.setEndBefore(end);
                domUtils.remove(end);
            } else {
                this.collapse(true);
            }
            return this;
        },

        /**
         * 调整range的边界，使其"放大"到最近的父节点
         * @method  enlarge
         * @remind 会引起选区的变化
         * @return { UE.dom.Range } 当前range对象
         */

        /**
         * 调整range的边界，使其"放大"到最近的父节点，根据参数 toBlock 的取值， 可以
         * 要求扩大之后的父节点是block节点
         * @method  enlarge
         * @param { Boolean } toBlock 是否要求扩大之后的父节点必须是block节点
         * @return { UE.dom.Range } 当前range对象
         */
        enlarge:function (toBlock, stopFn) {
            var isBody = domUtils.isBody,
                pre, node, tmp = this.document.createTextNode('');
            if (toBlock) {
                node = this.startContainer;
                if (node.nodeType == 1) {
                    if (node.childNodes[this.startOffset]) {
                        pre = node = node.childNodes[this.startOffset]
                    } else {
                        node.appendChild(tmp);
                        pre = node = tmp;
                    }
                } else {
                    pre = node;
                }
                while (1) {
                    if (domUtils.isBlockElm(node)) {
                        node = pre;
                        while ((pre = node.previousSibling) && !domUtils.isBlockElm(pre)) {
                            node = pre;
                        }
                        this.setStartBefore(node);
                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                node = this.endContainer;
                if (node.nodeType == 1) {
                    if (pre = node.childNodes[this.endOffset]) {
                        node.insertBefore(tmp, pre);
                    } else {
                        node.appendChild(tmp);
                    }
                    pre = node = tmp;
                } else {
                    pre = node;
                }
                while (1) {
                    if (domUtils.isBlockElm(node)) {
                        node = pre;
                        while ((pre = node.nextSibling) && !domUtils.isBlockElm(pre)) {
                            node = pre;
                        }
                        this.setEndAfter(node);
                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                if (tmp.parentNode === this.endContainer) {
                    this.endOffset--;
                }
                domUtils.remove(tmp);
            }

            // 扩展边界到最大
            if (!this.collapsed) {
                while (this.startOffset == 0) {
                    if (stopFn && stopFn(this.startContainer)) {
                        break;
                    }
                    if (isBody(this.startContainer)) {
                        break;
                    }
                    this.setStartBefore(this.startContainer);
                }
                while (this.endOffset == (this.endContainer.nodeType == 1 ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length)) {
                    if (stopFn && stopFn(this.endContainer)) {
                        break;
                    }
                    if (isBody(this.endContainer)) {
                        break;
                    }
                    this.setEndAfter(this.endContainer);
                }
            }
            return this;
        },
        enlargeToBlockElm:function(ignoreEnd){
            while(!domUtils.isBlockElm(this.startContainer)){
                this.setStartBefore(this.startContainer);
            }
            if(!ignoreEnd){
                while(!domUtils.isBlockElm(this.endContainer)){
                    this.setEndAfter(this.endContainer);
                }
            }
            return this;
        },
        /**
         * 调整Range的边界，使其"缩小"到最合适的位置
         * @method adjustmentBoundary
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:shrinkBoundary()
         */
        adjustmentBoundary:function () {
            if (!this.collapsed) {
                while (!domUtils.isBody(this.startContainer) &&
                    this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length &&
                    this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                    ) {

                    this.setStartAfter(this.startContainer);
                }
                while (!domUtils.isBody(this.endContainer) && !this.endOffset &&
                    this.endContainer[this.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                    ) {
                    this.setEndBefore(this.endContainer);
                }
            }
            return this;
        },

        /**
         * 给range选区中的内容添加给定的inline标签
         * @method applyInlineStyle
         * @param { String } tagName 需要添加的标签名
         * @example
         * ```html
         * <p>xxxx[xxxx]x</p>  ==>  range.applyInlineStyle("strong")  ==>  <p>xxxx[<strong>xxxx</strong>]x</p>
         * ```
         */

        /**
         * 给range选区中的内容添加给定的inline标签， 并且为标签附加上一些初始化属性。
         * @method applyInlineStyle
         * @param { String } tagName 需要添加的标签名
         * @param { Object } attrs 跟随新添加的标签的属性
         * @return { UE.dom.Range } 当前选区
         * @example
         * ```html
         * <p>xxxx[xxxx]x</p>
         *
         * ==>
         *
         * <!-- 执行操作 -->
         * range.applyInlineStyle("strong",{"style":"font-size:12px"})
         *
         * ==>
         *
         * <p>xxxx[<strong style="font-size:12px">xxxx</strong>]x</p>
         * ```
         */
        applyInlineStyle:function (tagName, attrs, list) {
            if (this.collapsed)return this;
            this.trimBoundary().enlarge(false,
                function (node) {
                    return node.nodeType == 1 && domUtils.isBlockElm(node)
                }).adjustmentBoundary();
            var bookmark = this.createBookmark(),
                end = bookmark.end,
                filterFn = function (node) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace(node);
                },
                current = domUtils.getNextDomNode(bookmark.start, false, filterFn),
                node,
                pre,
                range = this.cloneRange();
            while (current && (domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING)) {
                if (current.nodeType == 3 || dtd[tagName][current.tagName]) {
                    range.setStartBefore(current);
                    node = current;
                    while (node && (node.nodeType == 3 || dtd[tagName][node.tagName]) && node !== end) {
                        pre = node;
                        node = domUtils.getNextDomNode(node, node.nodeType == 1, null, function (parent) {
                            return dtd[tagName][parent.tagName];
                        });
                    }
                    var frag = range.setEndAfter(pre).extractContents(), elm;
                    if (list && list.length > 0) {
                        var level, top;
                        top = level = list[0].cloneNode(false);
                        for (var i = 1, ci; ci = list[i++];) {
                            level.appendChild(ci.cloneNode(false));
                            level = level.firstChild;
                        }
                        elm = level;
                    } else {
                        elm = range.document.createElement(tagName);
                    }
                    if (attrs) {
                        domUtils.setAttributes(elm, attrs);
                    }
                    elm.appendChild(frag);
                    range.insertNode(list ? top : elm);
                    //处理下滑线在a上的情况
                    var aNode;
                    if (tagName == 'span' && attrs.style && /text\-decoration/.test(attrs.style) && (aNode = domUtils.findParentByTagName(elm, 'a', true))) {
                        domUtils.setAttributes(aNode, attrs);
                        domUtils.remove(elm, true);
                        elm = aNode;
                    } else {
                        domUtils.mergeSibling(elm);
                        domUtils.clearEmptySibling(elm);
                    }
                    //去除子节点相同的
                    domUtils.mergeChild(elm, attrs);
                    current = domUtils.getNextDomNode(elm, false, filterFn);
                    domUtils.mergeToParent(elm);
                    if (node === end) {
                        break;
                    }
                } else {
                    current = domUtils.getNextDomNode(current, true, filterFn);
                }
            }
            return this.moveToBookmark(bookmark);
        },

        /**
         * 移除当前选区内指定的inline标签，但保留其中的内容
         * @method removeInlineStyle
         * @param { String } tagName 需要移除的标签名
         * @return { UE.dom.Range } 当前的range对象
         * @example
         * ```html
         * xx[x<span>xxx<em>yyy</em>zz]z</span>  => range.removeInlineStyle(["em"])  => xx[x<span>xxxyyyzz]z</span>
         * ```
         */

        /**
         * 移除当前选区内指定的一组inline标签，但保留其中的内容
         * @method removeInlineStyle
         * @param { Array } tagNameArr 需要移除的标签名的数组
         * @return { UE.dom.Range } 当前的range对象
         * @see UE.dom.Range:removeInlineStyle(String)
         */
        removeInlineStyle:function (tagNames) {
            if (this.collapsed)return this;
            tagNames = utils.isArray(tagNames) ? tagNames : [tagNames];
            this.shrinkBoundary().adjustmentBoundary();
            var start = this.startContainer, end = this.endContainer;
            while (1) {
                if (start.nodeType == 1) {
                    if (utils.indexOf(tagNames, start.tagName.toLowerCase()) > -1) {
                        break;
                    }
                    if (start.tagName.toLowerCase() == 'body') {
                        start = null;
                        break;
                    }
                }
                start = start.parentNode;
            }
            while (1) {
                if (end.nodeType == 1) {
                    if (utils.indexOf(tagNames, end.tagName.toLowerCase()) > -1) {
                        break;
                    }
                    if (end.tagName.toLowerCase() == 'body') {
                        end = null;
                        break;
                    }
                }
                end = end.parentNode;
            }
            var bookmark = this.createBookmark(),
                frag,
                tmpRange;
            if (start) {
                tmpRange = this.cloneRange().setEndBefore(bookmark.start).setStartBefore(start);
                frag = tmpRange.extractContents();
                tmpRange.insertNode(frag);
                domUtils.clearEmptySibling(start, true);
                start.parentNode.insertBefore(bookmark.start, start);
            }
            if (end) {
                tmpRange = this.cloneRange().setStartAfter(bookmark.end).setEndAfter(end);
                frag = tmpRange.extractContents();
                tmpRange.insertNode(frag);
                domUtils.clearEmptySibling(end, false, true);
                end.parentNode.insertBefore(bookmark.end, end.nextSibling);
            }
            var current = domUtils.getNextDomNode(bookmark.start, false, function (node) {
                return node.nodeType == 1;
            }), next;
            while (current && current !== bookmark.end) {
                next = domUtils.getNextDomNode(current, true, function (node) {
                    return node.nodeType == 1;
                });
                if (utils.indexOf(tagNames, current.tagName.toLowerCase()) > -1) {
                    domUtils.remove(current, true);
                }
                current = next;
            }
            return this.moveToBookmark(bookmark);
        },

        /**
         * 获取当前选中的自闭合的节点
         * @method  getClosedNode
         * @return { Node | NULL } 如果当前选中的是自闭合节点， 则返回该节点， 否则返回NULL
         */
        getClosedNode:function () {
            var node;
            if (!this.collapsed) {
                var range = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                if (selectOneNode(range)) {
                    var child = range.startContainer.childNodes[range.startOffset];
                    if (child && child.nodeType == 1 && (dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName])) {
                        node = child;
                    }
                }
            }
            return node;
        },

        /**
         * 在页面上高亮range所表示的选区
         * @method select
         * @return { UE.dom.Range } 返回当前Range对象
         */
            //这里不区分ie9以上，trace:3824
        select:browser.ie ? function (noFillData, textRange) {
            var nativeRange;
            if (!this.collapsed)
                this.shrinkBoundary();
            var node = this.getClosedNode();
            if (node && !textRange) {
                try {
                    nativeRange = this.document.body.createControlRange();
                    nativeRange.addElement(node);
                    nativeRange.select();
                } catch (e) {}
                return this;
            }
            var bookmark = this.createBookmark(),
                start = bookmark.start,
                end;
            nativeRange = this.document.body.createTextRange();
            nativeRange.moveToElementText(start);
            nativeRange.moveStart('character', 1);
            if (!this.collapsed) {
                var nativeRangeEnd = this.document.body.createTextRange();
                end = bookmark.end;
                nativeRangeEnd.moveToElementText(end);
                nativeRange.setEndPoint('EndToEnd', nativeRangeEnd);
            } else {
                if (!noFillData && this.startContainer.nodeType != 3) {
                    //使用<span>|x<span>固定住光标
                    var tmpText = this.document.createTextNode(fillChar),
                        tmp = this.document.createElement('span');
                    tmp.appendChild(this.document.createTextNode(fillChar));
                    start.parentNode.insertBefore(tmp, start);
                    start.parentNode.insertBefore(tmpText, start);
                    //当点b,i,u时，不能清除i上边的b
                    removeFillData(this.document, tmpText);
                    fillData = tmpText;
                    mergeSibling(tmp, 'previousSibling');
                    mergeSibling(start, 'nextSibling');
                    nativeRange.moveStart('character', -1);
                    nativeRange.collapse(true);
                }
            }
            this.moveToBookmark(bookmark);
            tmp && domUtils.remove(tmp);
            //IE在隐藏状态下不支持range操作，catch一下
            try {
                nativeRange.select();
            } catch (e) {
            }
            return this;
        } : function (notInsertFillData) {
            function checkOffset(rng){

                function check(node,offset,dir){
                    if(node.nodeType == 3 && node.nodeValue.length < offset){
                        rng[dir + 'Offset'] = node.nodeValue.length
                    }
                }
                check(rng.startContainer,rng.startOffset,'start');
                check(rng.endContainer,rng.endOffset,'end');
            }
            var win = domUtils.getWindow(this.document),
                sel = win.getSelection(),
                txtNode;
            //FF下关闭自动长高时滚动条在关闭dialog时会跳
            //ff下如果不body.focus将不能定位闭合光标到编辑器内
            browser.gecko ? this.document.body.focus() : win.focus();
            if (sel) {
                sel.removeAllRanges();
                // trace:870 chrome/safari后边是br对于闭合得range不能定位 所以去掉了判断
                // this.startContainer.nodeType != 3 &&! ((child = this.startContainer.childNodes[this.startOffset]) && child.nodeType == 1 && child.tagName == 'BR'
                if (this.collapsed && !notInsertFillData) {
//                    //opear如果没有节点接着，原生的不能够定位,不能在body的第一级插入空白节点
//                    if (notInsertFillData && browser.opera && !domUtils.isBody(this.startContainer) && this.startContainer.nodeType == 1) {
//                        var tmp = this.document.createTextNode('');
//                        this.insertNode(tmp).setStart(tmp, 0).collapse(true);
//                    }
//
                    //处理光标落在文本节点的情况
                    //处理以下的情况
                    //<b>|xxxx</b>
                    //<b>xxxx</b>|xxxx
                    //xxxx<b>|</b>
                    var start = this.startContainer,child = start;
                    if(start.nodeType == 1){
                        child = start.childNodes[this.startOffset];

                    }
                    if( !(start.nodeType == 3 && this.startOffset)  &&
                        (child ?
                            (!child.previousSibling || child.previousSibling.nodeType != 3)
                            :
                            (!start.lastChild || start.lastChild.nodeType != 3)
                        )
                    ){
                        txtNode = this.document.createTextNode(fillChar);
                        //跟着前边走
                        this.insertNode(txtNode);
                        removeFillData(this.document, txtNode);
                        mergeSibling(txtNode, 'previousSibling');
                        mergeSibling(txtNode, 'nextSibling');
                        fillData = txtNode;
                        this.setStart(txtNode, browser.webkit ? 1 : 0).collapse(true);
                    }
                }
                var nativeRange = this.document.createRange();
                if(this.collapsed && browser.opera && this.startContainer.nodeType == 1){
                    var child = this.startContainer.childNodes[this.startOffset];
                    if(!child){
                        //往前靠拢
                        child = this.startContainer.lastChild;
                        if( child && domUtils.isBr(child)){
                            this.setStartBefore(child).collapse(true);
                        }
                    }else{
                        //向后靠拢
                        while(child && domUtils.isBlockElm(child)){
                            if(child.nodeType == 1 && child.childNodes[0]){
                                child = child.childNodes[0]
                            }else{
                                break;
                            }
                        }
                        child && this.setStartBefore(child).collapse(true)
                    }

                }
                //是createAddress最后一位算的不准，现在这里进行微调
                checkOffset(this);
                nativeRange.setStart(this.startContainer, this.startOffset);
                nativeRange.setEnd(this.endContainer, this.endOffset);
                sel.addRange(nativeRange);
            }
            return this;
        },

        /**
         * 滚动到当前range开始的位置
         * @method scrollToView
         * @param { Window } win 当前range对象所属的window对象
         * @return { UE.dom.Range } 当前Range对象
         */

        /**
         * 滚动到距离当前range开始位置 offset 的位置处
         * @method scrollToView
         * @param { Window } win 当前range对象所属的window对象
         * @param { Number } offset 距离range开始位置处的偏移量， 如果为正数， 则向下偏移， 反之， 则向上偏移
         * @return { UE.dom.Range } 当前Range对象
         */
        scrollToView:function (win, offset) {
            win = win ? window : domUtils.getWindow(this.document);
            var me = this,
                span = me.document.createElement('span');
            //trace:717
            span.innerHTML = '&nbsp;';
            me.cloneRange().insertNode(span);
            domUtils.scrollToView(span, win, offset);
            domUtils.remove(span);
            return me;
        },

        /**
         * 判断当前选区内容是否占位符
         * @private
         * @method inFillChar
         * @return { Boolean } 如果是占位符返回true，否则返回false
         */
        inFillChar : function(){
            var start = this.startContainer;
            if(this.collapsed && start.nodeType == 3
                && start.nodeValue.replace(new RegExp('^' + domUtils.fillChar),'').length + 1 == start.nodeValue.length
                ){
                return true;
            }
            return false;
        },

        /**
         * 保存
         * @method createAddress
         * @private
         * @return { Boolean } 返回开始和结束的位置
         * @example
         * ```html
         * <body>
         *     <p>
         *         aaaa
         *         <em>
         *             <!-- 选区开始 -->
         *             bbbb
         *             <!-- 选区结束 -->
         *         </em>
         *     </p>
         *
         *     <script>
         *         //output: {startAddress:[0,1,0,0],endAddress:[0,1,0,4]}
         *         console.log( range.createAddress() );
         *     </script>
         * </body>
         * ```
         */
        createAddress : function(ignoreEnd,ignoreTxt){
            var addr = {},me = this;

            function getAddress(isStart){
                var node = isStart ? me.startContainer : me.endContainer;
                var parents = domUtils.findParents(node,true,function(node){return !domUtils.isBody(node)}),
                    addrs = [];
                for(var i = 0,ci;ci = parents[i++];){
                    addrs.push(domUtils.getNodeIndex(ci,ignoreTxt));
                }
                var firstIndex = 0;

                if(ignoreTxt){
                    if(node.nodeType == 3){
                        var tmpNode = node.previousSibling;
                        while(tmpNode && tmpNode.nodeType == 3){
                            firstIndex += tmpNode.nodeValue.replace(fillCharReg,'').length;
                            tmpNode = tmpNode.previousSibling;
                        }
                        firstIndex +=  (isStart ? me.startOffset : me.endOffset)// - (fillCharReg.test(node.nodeValue) ? 1 : 0 )
                    }else{
                        node =  node.childNodes[ isStart ? me.startOffset : me.endOffset];
                        if(node){
                            firstIndex = domUtils.getNodeIndex(node,ignoreTxt);
                        }else{
                            node = isStart ? me.startContainer : me.endContainer;
                            var first = node.firstChild;
                            while(first){
                                if(domUtils.isFillChar(first)){
                                    first = first.nextSibling;
                                    continue;
                                }
                                firstIndex++;
                                if(first.nodeType == 3){
                                    while( first && first.nodeType == 3){
                                        first = first.nextSibling;
                                    }
                                }else{
                                    first = first.nextSibling;
                                }
                            }
                        }
                    }

                }else{
                    firstIndex = isStart ? domUtils.isFillChar(node) ? 0 : me.startOffset  : me.endOffset
                }
                if(firstIndex < 0){
                    firstIndex = 0;
                }
                addrs.push(firstIndex);
                return addrs;
            }
            addr.startAddress = getAddress(true);
            if(!ignoreEnd){
                addr.endAddress = me.collapsed ? [].concat(addr.startAddress) : getAddress();
            }
            return addr;
        },

        /**
         * 保存
         * @method createAddress
         * @private
         * @return { Boolean } 返回开始和结束的位置
         * @example
         * ```html
         * <body>
         *     <p>
         *         aaaa
         *         <em>
         *             <!-- 选区开始 -->
         *             bbbb
         *             <!-- 选区结束 -->
         *         </em>
         *     </p>
         *
         *     <script>
         *         var range = editor.selection.getRange();
         *         range.moveToAddress({startAddress:[0,1,0,0],endAddress:[0,1,0,4]});
         *         range.select();
         *         //output: 'bbbb'
         *         console.log(editor.selection.getText());
         *     </script>
         * </body>
         * ```
         */
        moveToAddress : function(addr,ignoreEnd){
            var me = this;
            function getNode(address,isStart){
                var tmpNode = me.document.body,
                    parentNode,offset;
                for(var i= 0,ci,l=address.length;i<l;i++){
                    ci = address[i];
                    parentNode = tmpNode;
                    tmpNode = tmpNode.childNodes[ci];
                    if(!tmpNode){
                        offset = ci;
                        break;
                    }
                }
                if(isStart){
                    if(tmpNode){
                        me.setStartBefore(tmpNode)
                    }else{
                        me.setStart(parentNode,offset)
                    }
                }else{
                    if(tmpNode){
                        me.setEndBefore(tmpNode)
                    }else{
                        me.setEnd(parentNode,offset)
                    }
                }
            }
            getNode(addr.startAddress,true);
            !ignoreEnd && addr.endAddress &&  getNode(addr.endAddress);
            return me;
        },

        /**
         * 判断给定的Range对象是否和当前Range对象表示的是同一个选区
         * @method equals
         * @param { UE.dom.Range } 需要判断的Range对象
         * @return { Boolean } 如果给定的Range对象与当前Range对象表示的是同一个选区， 则返回true， 否则返回false
         */
        equals : function(rng){
            for(var p in this){
                if(this.hasOwnProperty(p)){
                    if(this[p] !== rng[p])
                        return false
                }
            }
            return true;

        },

        /**
         * 遍历range内的节点。每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
         * 作为其参数。
         * @method traversal
         * @param { Function }  doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
         * @return { UE.dom.Range } 当前range对象
         * @example
         * ```html
         *
         * <body>
         *
         *     <!-- 选区开始 -->
         *     <span></span>
         *     <a></a>
         *     <!-- 选区结束 -->
         * </body>
         *
         * <script>
         *
         *     //output: <span></span><a></a>
         *     console.log( range.cloneContents() );
         *
         *     range.traversal( function ( node ) {
         *
         *         if ( node.nodeType === 1 ) {
         *             node.className = "test";
         *         }
         *
         *     } );
         *
         *     //output: <span class="test"></span><a class="test"></a>
         *     console.log( range.cloneContents() );
         *
         * </script>
         * ```
         */

        /**
         * 遍历range内的节点。
         * 每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
         * 作为其参数。
         * 可以通过参数项 filterFn 来指定一个过滤器， 只有符合该过滤器过滤规则的节点才会触
         * 发doFn函数的执行
         * @method traversal
         * @param { Function } doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
         * @param { Function } filterFn 过滤器， 该函数接受当前遍历的节点作为参数， 如果该节点满足过滤
         *                      规则， 请返回true， 该节点会触发doFn， 否则， 请返回false， 则该节点不
         *                      会触发doFn。
         * @return { UE.dom.Range } 当前range对象
         * @see UE.dom.Range:traversal(Function)
         * @example
         * ```html
         *
         * <body>
         *
         *     <!-- 选区开始 -->
         *     <span></span>
         *     <a></a>
         *     <!-- 选区结束 -->
         * </body>
         *
         * <script>
         *
         *     //output: <span></span><a></a>
         *     console.log( range.cloneContents() );
         *
         *     range.traversal( function ( node ) {
         *
         *         node.className = "test";
         *
         *     }, function ( node ) {
         *          return node.nodeType === 1;
         *     } );
         *
         *     //output: <span class="test"></span><a class="test"></a>
         *     console.log( range.cloneContents() );
         *
         * </script>
         * ```
         */
        traversal:function(doFn,filterFn){
            if (this.collapsed)
                return this;
            var bookmark = this.createBookmark(),
                end = bookmark.end,
                current = domUtils.getNextDomNode(bookmark.start, false, filterFn);
            while (current && current !== end && (domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING)) {
                var tmpNode = domUtils.getNextDomNode(current,false,filterFn);
                doFn(current);
                current = tmpNode;
            }
            return this.moveToBookmark(bookmark);
        }
    };
})();

// core/Selection.js
/**
 * 选集
 * @file
 * @module UE.dom
 * @class Selection
 * @since 1.2.6.1
 */

/**
 * 选区集合
 * @unfile
 * @module UE.dom
 * @class Selection
 */
(function () {

    function getBoundaryInformation( range, start ) {
        var getIndex = domUtils.getNodeIndex;
        range = range.duplicate();
        range.collapse( start );
        var parent = range.parentElement();
        //如果节点里没有子节点，直接退出
        if ( !parent.hasChildNodes() ) {
            return  {container:parent, offset:0};
        }
        var siblings = parent.children,
            child,
            testRange = range.duplicate(),
            startIndex = 0, endIndex = siblings.length - 1, index = -1,
            distance;
        while ( startIndex <= endIndex ) {
            index = Math.floor( (startIndex + endIndex) / 2 );
            child = siblings[index];
            testRange.moveToElementText( child );
            var position = testRange.compareEndPoints( 'StartToStart', range );
            if ( position > 0 ) {
                endIndex = index - 1;
            } else if ( position < 0 ) {
                startIndex = index + 1;
            } else {
                //trace:1043
                return  {container:parent, offset:getIndex( child )};
            }
        }
        if ( index == -1 ) {
            testRange.moveToElementText( parent );
            testRange.setEndPoint( 'StartToStart', range );
            distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
            siblings = parent.childNodes;
            if ( !distance ) {
                child = siblings[siblings.length - 1];
                return  {container:child, offset:child.nodeValue.length};
            }

            var i = siblings.length;
            while ( distance > 0 ){
                distance -= siblings[ --i ].nodeValue.length;
            }
            return {container:siblings[i], offset:-distance};
        }
        testRange.collapse( position > 0 );
        testRange.setEndPoint( position > 0 ? 'StartToStart' : 'EndToStart', range );
        distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
        if ( !distance ) {
            return  dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName] ?
            {container:parent, offset:getIndex( child ) + (position > 0 ? 0 : 1)} :
            {container:child, offset:position > 0 ? 0 : child.childNodes.length}
        }
        while ( distance > 0 ) {
            try {
                var pre = child;
                child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
                distance -= child.nodeValue.length;
            } catch ( e ) {
                return {container:parent, offset:getIndex( pre )};
            }
        }
        return  {container:child, offset:position > 0 ? -distance : child.nodeValue.length + distance}
    }

    /**
     * 将ieRange转换为Range对象
     * @param {Range}   ieRange    ieRange对象
     * @param {Range}   range      Range对象
     * @return  {Range}  range       返回转换后的Range对象
     */
    function transformIERangeToRange( ieRange, range ) {
        if ( ieRange.item ) {
            range.selectNode( ieRange.item( 0 ) );
        } else {
            var bi = getBoundaryInformation( ieRange, true );
            range.setStart( bi.container, bi.offset );
            if ( ieRange.compareEndPoints( 'StartToEnd', ieRange ) != 0 ) {
                bi = getBoundaryInformation( ieRange, false );
                range.setEnd( bi.container, bi.offset );
            }
        }
        return range;
    }

    /**
     * 获得ieRange
     * @param {Selection} sel    Selection对象
     * @return {ieRange}    得到ieRange
     */
    function _getIERange( sel ) {
        var ieRange;
        //ie下有可能报错
        try {
            ieRange = sel.getNative().createRange();
        } catch ( e ) {
            return null;
        }
        var el = ieRange.item ? ieRange.item( 0 ) : ieRange.parentElement();
        if ( ( el.ownerDocument || el ) === sel.document ) {
            return ieRange;
        }
        return null;
    }

    var Selection = dom.Selection = function ( doc ) {
        var me = this, iframe;
        me.document = doc;
        if ( browser.ie9below ) {
            iframe = domUtils.getWindow( doc ).frameElement;
            domUtils.on( iframe, 'beforedeactivate', function () {
                me._bakIERange = me.getIERange();
            } );
            domUtils.on( iframe, 'activate', function () {
                try {
                    if ( !_getIERange( me ) && me._bakIERange ) {
                        me._bakIERange.select();
                    }
                } catch ( ex ) {
                }
                me._bakIERange = null;
            } );
        }
        iframe = doc = null;
    };

    Selection.prototype = {

        rangeInBody : function(rng,txtRange){
            var node = browser.ie9below || txtRange ? rng.item ? rng.item() : rng.parentElement() : rng.startContainer;

            return node === this.document.body || domUtils.inDoc(node,this.document);
        },

        /**
         * 获取原生seleciton对象
         * @method getNative
         * @return { Object } 获得selection对象
         * @example
         * ```javascript
         * editor.selection.getNative();
         * ```
         */
        getNative:function () {
            var doc = this.document;
            try {
                return !doc ? null : browser.ie9below ? doc.selection : domUtils.getWindow( doc ).getSelection();
            } catch ( e ) {
                return null;
            }
        },

        /**
         * 获得ieRange
         * @method getIERange
         * @return { Object } 返回ie原生的Range
         * @example
         * ```javascript
         * editor.selection.getIERange();
         * ```
         */
        getIERange:function () {
            var ieRange = _getIERange( this );
            if ( !ieRange ) {
                if ( this._bakIERange ) {
                    return this._bakIERange;
                }
            }
            return ieRange;
        },

        /**
         * 缓存当前选区的range和选区的开始节点
         * @method cache
         */
        cache:function () {
            this.clear();
            this._cachedRange = this.getRange();
            this._cachedStartElement = this.getStart();
            this._cachedStartElementPath = this.getStartElementPath();
        },

        /**
         * 获取选区开始位置的父节点到body
         * @method getStartElementPath
         * @return { Array } 返回父节点集合
         * @example
         * ```javascript
         * editor.selection.getStartElementPath();
         * ```
         */
        getStartElementPath:function () {
            if ( this._cachedStartElementPath ) {
                return this._cachedStartElementPath;
            }
            var start = this.getStart();
            if ( start ) {
                return domUtils.findParents( start, true, null, true )
            }
            return [];
        },

        /**
         * 清空缓存
         * @method clear
         */
        clear:function () {
            this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
        },

        /**
         * 编辑器是否得到了选区
         * @method isFocus
         */
        isFocus:function () {
            try {
                if(browser.ie9below){

                    var nativeRange = _getIERange(this);
                    return !!(nativeRange && this.rangeInBody(nativeRange));
                }else{
                    return !!this.getNative().rangeCount;
                }
            } catch ( e ) {
                return false;
            }

        },

        /**
         * 获取选区对应的Range
         * @method getRange
         * @return { Object } 得到Range对象
         * @example
         * ```javascript
         * editor.selection.getRange();
         * ```
         */
        getRange:function () {
            var me = this;
            function optimze( range ) {
                var child = me.document.body.firstChild,
                    collapsed = range.collapsed;
                while ( child && child.firstChild ) {
                    range.setStart( child, 0 );
                    child = child.firstChild;
                }
                if ( !range.startContainer ) {
                    range.setStart( me.document.body, 0 )
                }
                if ( collapsed ) {
                    range.collapse( true );
                }
            }

            if ( me._cachedRange != null ) {
                return this._cachedRange;
            }
            var range = new baidu.editor.dom.Range( me.document );

            if ( browser.ie9below ) {
                var nativeRange = me.getIERange();
                if ( nativeRange ) {
                    //备份的_bakIERange可能已经实效了，dom树发生了变化比如从源码模式切回来，所以try一下，实效就放到body开始位置
                    try{
                        transformIERangeToRange( nativeRange, range );
                    }catch(e){
                        optimze( range );
                    }

                } else {
                    optimze( range );
                }
            } else {
                var sel = me.getNative();
                if ( sel && sel.rangeCount ) {
                    var firstRange = sel.getRangeAt( 0 );
                    var lastRange = sel.getRangeAt( sel.rangeCount - 1 );
                    range.setStart( firstRange.startContainer, firstRange.startOffset ).setEnd( lastRange.endContainer, lastRange.endOffset );
                    if ( range.collapsed && domUtils.isBody( range.startContainer ) && !range.startOffset ) {
                        optimze( range );
                    }
                } else {
                    //trace:1734 有可能已经不在dom树上了，标识的节点
                    if ( this._bakRange && domUtils.inDoc( this._bakRange.startContainer, this.document ) ){
                        return this._bakRange;
                    }
                    optimze( range );
                }
            }
            return this._bakRange = range;
        },

        /**
         * 获取开始元素，用于状态反射
         * @method getStart
         * @return { Element } 获得开始元素
         * @example
         * ```javascript
         * editor.selection.getStart();
         * ```
         */
        getStart:function () {
            if ( this._cachedStartElement ) {
                return this._cachedStartElement;
            }
            var range = browser.ie9below ? this.getIERange() : this.getRange(),
                tmpRange,
                start, tmp, parent;
            if ( browser.ie9below ) {
                if ( !range ) {
                    //todo 给第一个值可能会有问题
                    return this.document.body.firstChild;
                }
                //control元素
                if ( range.item ){
                    return range.item( 0 );
                }
                tmpRange = range.duplicate();
                //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
                tmpRange.text.length > 0 && tmpRange.moveStart( 'character', 1 );
                tmpRange.collapse( 1 );
                start = tmpRange.parentElement();
                parent = tmp = range.parentElement();
                while ( tmp = tmp.parentNode ) {
                    if ( tmp == start ) {
                        start = parent;
                        break;
                    }
                }
            } else {
                range.shrinkBoundary();
                start = range.startContainer;
                if ( start.nodeType == 1 && start.hasChildNodes() ){
                    start = start.childNodes[Math.min( start.childNodes.length - 1, range.startOffset )];
                }
                if ( start.nodeType == 3 ){
                    return start.parentNode;
                }
            }
            return start;
        },

        /**
         * 得到选区中的文本
         * @method getText
         * @return { String } 选区中包含的文本
         * @example
         * ```javascript
         * editor.selection.getText();
         * ```
         */
        getText:function () {
            var nativeSel, nativeRange;
            if ( this.isFocus() && (nativeSel = this.getNative()) ) {
                nativeRange = browser.ie9below ? nativeSel.createRange() : nativeSel.getRangeAt( 0 );
                return browser.ie9below ? nativeRange.text : nativeRange.toString();
            }
            return '';
        },

        /**
         * 清除选区
         * @method clearRange
         * @example
         * ```javascript
         * editor.selection.clearRange();
         * ```
         */
        clearRange : function(){
            this.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges']();
        }
    };
})();

// core/Editor.js
/**
 * 编辑器主类，包含编辑器提供的大部分公用接口
 * @file
 * @module UE
 * @class Editor
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

/**
 * UEditor的核心类，为用户提供与编辑器交互的接口。
 * @unfile
 * @module UE
 * @class Editor
 */

(function () {
    var uid = 0, _selectionChangeTimer;

    /**
     * 获取编辑器的html内容，赋值到编辑器所在表单的textarea文本域里面
     * @private
     * @method setValue
     * @param { UE.Editor } editor 编辑器事例
     */
    function setValue(form, editor) {
        var textarea;
        if (editor.textarea) {
            if (utils.isString(editor.textarea)) {
                for (var i = 0, ti, tis = domUtils.getElementsByTagName(form, 'textarea'); ti = tis[i++];) {
                    if (ti.id == 'ueditor_textarea_' + editor.options.textarea) {
                        textarea = ti;
                        break;
                    }
                }
            } else {
                textarea = editor.textarea;
            }
        }
        if (!textarea) {
            form.appendChild(textarea = domUtils.createElement(document, 'textarea', {
                'name': editor.options.textarea,
                'id': 'ueditor_textarea_' + editor.options.textarea,
                'style': "display:none"
            }));
            //不要产生多个textarea
            editor.textarea = textarea;
        }
        !textarea.getAttribute('name') && textarea.setAttribute('name', editor.options.textarea );
        textarea.value = editor.hasContents() ?
            (editor.options.allHtmlEnabled ? editor.getAllHtml() : editor.getContent(null, null, true)) :
            ''
    }
    function loadPlugins(me){
        //初始化插件
        for (var pi in UE.plugins) {
            UE.plugins[pi].call(me);
        }

    }
    function checkCurLang(I18N){
        for(var lang in I18N){
            return lang
        }
    }

    function langReadied(me){
        me.langIsReady = true;

        me.fireEvent("langReady");
    }

    /**
     * 编辑器准备就绪后会触发该事件
     * @module UE
     * @class Editor
     * @event ready
     * @remind render方法执行完成之后,会触发该事件
     * @remind
     * @example
     * ```javascript
     * editor.addListener( 'ready', function( editor ) {
     *     editor.execCommand( 'focus' ); //编辑器家在完成后，让编辑器拿到焦点
     * } );
     * ```
     */
    /**
     * 执行destroy方法,会触发该事件
     * @module UE
     * @class Editor
     * @event destroy
     * @see UE.Editor:destroy()
     */
    /**
     * 执行reset方法,会触发该事件
     * @module UE
     * @class Editor
     * @event reset
     * @see UE.Editor:reset()
     */
    /**
     * 执行focus方法,会触发该事件
     * @module UE
     * @class Editor
     * @event focus
     * @see UE.Editor:focus(Boolean)
     */
    /**
     * 语言加载完成会触发该事件
     * @module UE
     * @class Editor
     * @event langReady
     */
    /**
     * 运行命令之后会触发该命令
     * @module UE
     * @class Editor
     * @event beforeExecCommand
     */
    /**
     * 运行命令之后会触发该命令
     * @module UE
     * @class Editor
     * @event afterExecCommand
     */
    /**
     * 运行命令之前会触发该命令
     * @module UE
     * @class Editor
     * @event firstBeforeExecCommand
     */
    /**
     * 在getContent方法执行之前会触发该事件
     * @module UE
     * @class Editor
     * @event beforeGetContent
     * @see UE.Editor:getContent()
     */
    /**
     * 在getContent方法执行之后会触发该事件
     * @module UE
     * @class Editor
     * @event afterGetContent
     * @see UE.Editor:getContent()
     */
    /**
     * 在getAllHtml方法执行时会触发该事件
     * @module UE
     * @class Editor
     * @event getAllHtml
     * @see UE.Editor:getAllHtml()
     */
    /**
     * 在setContent方法执行之前会触发该事件
     * @module UE
     * @class Editor
     * @event beforeSetContent
     * @see UE.Editor:setContent(String)
     */
    /**
     * 在setContent方法执行之后会触发该事件
     * @module UE
     * @class Editor
     * @event afterSetContent
     * @see UE.Editor:setContent(String)
     */
    /**
     * 每当编辑器内部选区发生改变时，将触发该事件
     * @event selectionchange
     * @warning 该事件的触发非常频繁，不建议在该事件的处理过程中做重量级的处理
     * @example
     * ```javascript
     * editor.addListener( 'selectionchange', function( editor ) {
     *     console.log('选区发生改变');
     * }
     */
    /**
     * 在所有selectionchange的监听函数执行之前，会触发该事件
     * @module UE
     * @class Editor
     * @event beforeSelectionChange
     * @see UE.Editor:selectionchange
     */
    /**
     * 在所有selectionchange的监听函数执行完之后，会触发该事件
     * @module UE
     * @class Editor
     * @event afterSelectionChange
     * @see UE.Editor:selectionchange
     */
    /**
     * 编辑器内容发生改变时会触发该事件
     * @module UE
     * @class Editor
     * @event contentChange
     */


    /**
     * 以默认参数构建一个编辑器实例
     * @constructor
     * @remind 通过 改构造方法实例化的编辑器,不带ui层.需要render到一个容器,编辑器实例才能正常渲染到页面
     * @example
     * ```javascript
     * var editor = new UE.Editor();
     * editor.execCommand('blod');
     * ```
     * @see UE.Config
     */

    /**
     * 以给定的参数集合创建一个编辑器实例，对于未指定的参数，将应用默认参数。
     * @constructor
     * @remind 通过 改构造方法实例化的编辑器,不带ui层.需要render到一个容器,编辑器实例才能正常渲染到页面
     * @param { Object } setting 创建编辑器的参数
     * @example
     * ```javascript
     * var editor = new UE.Editor();
     * editor.execCommand('blod');
     * ```
     * @see UE.Config
     */
    var Editor = UE.Editor = function (options) {
        var me = this;
        me.uid = uid++;
        EventBase.call(me);
        me.commands = {};
        m