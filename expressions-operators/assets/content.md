layout: true
class: center, middle, master
---
# 表达式和运算符 

.footnote[
       created with [remark](http://github.com/gnab/remark)
]

---
layout: false
# 原始表达式
JavaScript中原始表达式包含常量、直接量、关键字和变量。
直接量是直接在程序中出现的常数值。
.small[
```javascript
       0xff            // 十六进制数值直接量
       100             // 十进制数值直接量
       "2014.8.8"      //字符串直接量
       /[\?\$]/gi      //正则表达式直接量
```
]

JavaScript中的一些保留字构成原始表达式：
.small[
```javascript
       true         // 布尔值：真 
       false        // 布尔值：假 
       null         // 空
       this         // “当前”对象
       ```
]

第三种原始表达式是变量：
.small[
```javascript
    lang            // 返回lang的值
    urls            // 返回urls的值
    undefined       // undefined是全局变量, 和null不同它不是一个关键字
```
]

JavaScript会将标识符当做变量去查找它的值。如果变量名不存在，表达式运算结果为[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)。在ES5严格模式'use strict'中，对不存在的变量求值会抛出引用错误异常(ReferenceError)。
---

# 对象和数组的初始化表达式
对象和数组初始化表达式实际上是一个新创建的对象和数组。有时称做“对象直接量”和“数组直接量”。
数组初始化表达式通过一对方括号和其内有逗号隔开的列表构成。初始化的结果是一个新创建的数组。元素是逗号分隔的表达式的值：


.small[
```javascript
    []          //  一个空数组； 
    ["left", ""]   //  拥有两个元素的数组 
```
]

数组初始化表达式的元素也可以是数组初始化表达式，既表达式可以嵌套：

.small[
```javascript
    ['proxy', ['youshop', 'instarekber']] 
    ```
]

数组直接量中的列表逗号之间的元素可以省略，省略的空位会填充值undefined。下面数组包含5个元素，其中三个元素是undefined:
.small[
```javascript
   [1,,,,5]
```
]

对象初始化表达式与数组表达式类似，只是方括号被花括号代替，每个自表达式都包含属性名和一个冒号作为前缀：

.small[
```javascript
    {}          //一个空对象
    {isUshop: function(){}, baseUrl: function(){}} // 拥有两个属性成员的对象
```
]

---

对象初始化表达式的值可以是任意JavaScript表达式。对象直接量中的属性名称可以是字符串而不是标识符（如果要使用JavaScript中的**保留字**或含有**非法标识符**做为属性名时就可以用字符串）:

.small[
```javascript
{
    "H5_YOUR_TELE_NO": "手机号",
    "H5_TIPS_SAME_TELE_20905_PAY": "您不能向自己发起安全付款"
}
```
]

.small[
```javascript
{
    init: init,
          setItem: function (key, value, callback) {
              sendToFrame('set', key, value, callback);
    },

    getItem: function (key, callback) {
             sendToFrame('get', key, null, callback);
    },

    removeItem: function (key, callback) {
                sendToFrame('remove', key, null, callback);
    },

    key: function (index, callback) {
         sendToFrame('key', index, null, callback);
    },

    clear: function (callback) {
           sendToFrame('clear',null, null, callback);
    }
};
```
]

---
# 函数定义表达式
函数定义表达式定义一个JavaScript函数。表达式的值是这个新定义点函数。函数定义表达式包含关键字function，其后是一对圆括号，括号内是一个以逗号分割的标识符列表（参数名），然后再跟随一个由花括号包裹的JavaScript代码段（函数体），
.small[
```javascript
 U.getRndStr = function (length) {
             var rnd = [];
             var len = RND.length, r;
             for (var i = 0; i < length; ++i) {
                 r = RND.charAt(Math.floor(Math.random() * len));
                 rnd.push(r);
             }

             return rnd.join('');
 };
```
]
函数表达式可以包含函数名。函数也可以通过函数语句来定义，而不是函数表达式。
.small[
```javascript
 var tempCheck = function tempCheck(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].val().trim() == "") {
            return false;
         }
        //...
    }
    return true;
 }
```
]

---
#属性访问表达式
属性访问表达式得到一个对象属性或者一个数组元素的值。属性访问定义了两种语法：
expression . identifer
expression [ expression ]
第一种写法表达式制定对象，标识符指定需要访问的属性名。第二种写法方括号里是另外一个表达式指定要要访问的属性名或者数组元素的索引。
.small[
```javascript
  for (var i = 0; i < data.length; i++) {
     if (data[i].val().trim() == "") {
        return false;
     }
  }

  that.data.multiLang[key];

  that.dom = {
        loading: $("#loading"),
         wrapper: $("body"),
         tpl: $("#tpl")
  };

  that.dom.loading;

```
]

不管使用哪种形式的属性访问表达式，“，”和“［”前的表达式总是首先计算。如果结果是null或者undefined，表达式会抛出类型错误异常（TypeError）。虽然.identifier的写法更简单，但是这种方式只适用于要访问的属性名称是合法的标识符。如果属性名是保留字或者包含空格和标点符号，或是一个数字（对数组来说），则必须使用方括号写法。当属性名是通过运算得出的值而不是固定值的时候，也必须使用方括号。

---
# 调用表达式
JavaScript中调用表达式来调用（执行）函数。函数名后跟随圆括号，括号内是逗号分隔的参数列表，参数可以有0个或多个。jjjo
.small[
```javascript
   Wlib.baseUrl()       // Wlib.baseUrl是函数，它没有参数
   Wlib.tips(that.hackJSLang("H5_CODE_ERR_OVER_TIMES"));
```
]

如果函数使用return语句给出返回值，这个返回值就是整个调用表达式的值。否则，调用表达式的值就是undefined。
如果是按属性访问函数，那这个调用称做“方法调用”，执行函数体的时候，做为属性访问方法的对象和数组就是方法体内this的指向。
.small[
```javascript
    init: function () {
        var that = this;
        that.cacheDom();
    },
    cacheDom: function () {
        var that = this;
        that.dom = {
            loading: $("#loading"),
        };
    }
```
]

非方法调用的调用表达式使用全局对象this作为this关键字的值。但在ES5严格模式中定义的函数使用undefined作为全局对象的值，this不会指向全局对象。

---
# 对象创建表达式
对象创建表达式创建对象并调用构造函数初始化新对象的属性。与函数调用表达式类似，只是之前多了关键字new：
.small[
```javascript
    new lib("local", "");
```]
如果对象创建表达式不需要任何参数给构造函数，圆括号可以省略：

.small[
```javascript
    new Date 
```]
当创建对象表达式的值时，首先创建新的空对象，将这个新对象当做this的值调用构造函数，它 用this来初始化新创建对象的属性。构造函数不会返回值，这个新创建并初始化后的对象就是整个对象创建表达式的值。如果构造函数显式返回一个值，它就做为对象创建表达式的值，而新创建的对象则被丢弃。

---
#运算符概述

JavaScript中的运算符包括算术运算符，关系运算符，逻辑运算符，赋值运算符和其他运算符。由它们组成其相应的表达式。
大多数运算符是由标点符号表示，比如“＋”和“＝”。而另一些运算符是由关键字表示，它们是：

.small[
```javascript
delete              //删除属性
typeof              //检测操作数类型
void                //返回undefined值
instanceof          //测试对象类
in                  //检测属性是否存在
```
]

.small[
```javascript
delete callbackList[data.c]
typeof exp === 'undefined' 
'localStorage' in window
```]

---
#算数表达式

基本但算数运算符是*（乘法）、/（除法）、% （求余）、（+）加法和（-）减法。那些无法转换为数字的操作数都转化为NaN值。如果操作数是（或者转换结果是）NaN值，算数运算结果也是NaN。
在JavaScript 中，所有数字都是浮点型的，除法运算的结果也是浮点型， 
.small[
```javascript
    5/2     //结构是2.5
    2/0     //正无穷大
    0/0     //NaN
    5%2     //1
    -5%2    //-1
    6.5%2.1 //0.2
```]
二元加法运算符“＋”可以对两个数字做加法，也可以做字符串连接操作,行为表现为：
* 如果一个操作数是对象，将对象转换为原始类值：日期对象通过toString()方法执行转换，其他对象通过valueOf()方法转换。由于多数对象都不具备valueOf()方法，因此会通过toString()方法来执行转换。

* 进行对象到原始值转换后，如果其中一个操作数是字符串的话，另一个操作数也转换为字符串然后进行字符串连接。

* 否则，两个操作数都转换为数字（或者NaN），然后进行加法操作。
---
.small[
```javascript
    1 + 2           // => 3: 加法
    2 + "="         // => 2=: 字符串连接
    1 + {}          // => "1[object Object]": 对象转换为字符串后做字符串连接
    true + true     // => 2: 布尔值转换为数字后做加法
    2 + null        // => 2: null转换为0后做加法
    2 + undefined   // => NaN: undefined转换为NaN做加法运算 
    1 + 2 + " proxies"  // => "3 proxies" 加法运算从由左至右结合
```]

一元加法（+）运算符把数字转换为数字（或者NaN），并返回这个转换后的数字。如果操作数本身就是数字，则直接返回这个数字。
.small[
```javascript
+new Date       // 生成时间戳时常用 
```]

一元减法（-）运算符把操作数转换为数字，然后改变运算结果的符号。

---
# 关系表达式

* 严格相等运算符“===”首先计算操作数的值，然后比较两个值，比较过程没有任何类型转换：

* 如果两个值类型不相同，则他们不相等

* 如果两个值都是null或者都是undefined，则它们不相等

* 如果两个值都是布尔值true或者是false，则他们相等

* 如果其中一个值是NaN，或者两个值都是NaN，则它们不相等。NaN和其他任何值都是不相等的，包括它本身。

* 如果一个值为0，另一个值为-0，它们同样相等

* 如果两个字符串,且对应的16位数完全相同，则它们相等。如果长度或者内容不同，则它们不等（JavaScript使用Unicode字符集，仅支持UTF-16编码）。可以使用String.localeCompare()比较字符串

* 如果两个引用值指向同一个对象、数组或函数，则它们相等。如果指向不同的对象，则它们不等，尽管两个对象具有完全一样的属性

---
* 相等运算符“==”和恒等运算符相似，但是如果两个操作数不是同一类型，那么相等运算符惠尝试进行一些类型转换：

* 如果一个值是null，另一个是undefined，则它们相等

* 如果一个值是数字，另一个是字符串，先将字符串转换为数字，然后使用转换后的值比较

* 如果一个值是true，将其转换为1再进行比较。如果其中一个值是false，则将其转换为0再进行比较

* 如果一个值是对象，另一个值是数字或字符串，则将对象转换为原始值，再进行比较。对象通过toString()方法或者valueOf()方法转换为原始值。内置类首先尝试使用valueOf()，再尝试使用toString()，除了日期类，日期类只使用toString() 转换。非语言核心对象，通过各自的实现定义但方法转换为原始值

* 其他不同类型之间比较均不相等 
.small[
```javascript
var obj = {
    toString: function() { 
        return 123;
    },
    valueOf: function() {
        return 456;
    }
};
```]

---
in运算符左测是一个字符串或者可以转换为字符串的操作数，右侧是一个对象。如果右侧拥有左侧操作数的属性名，那么返回true：
.small[
```javascript
'localStorage' in window
```]

注意和hasOwnProperty()方法的关系。

instanceof运算符左侧是一个对象，右侧操作数是标示对象的类。所有对象都是Object的实例，通过instanceof判断一个对象是否为一个类的实例的时候，这个判断也会包含对“父类”(Object)的检测。

注意和isPrototypeOf()方法的关系。

---
逻辑表达式

逻辑运算符“&&”、“||”和“!”是对操作数进行布尔算数运算，经常和关系运算符一起使用。

逻辑与（&&）除了参与逻辑运算外，还有“短路”行为，经常用在代码中有条件的执行代码。如：
.small[
```javascript
 callback && callback();        //只有callback转换后为true才执行callback
 if(callback) {
    callback();                 //作用同上
 }

 item && res.push(item);        //item值为真时执行res.push(item)

 error && error(err);           //error值为真时执行error(err)
 ```]

 逻辑或（||）的“短路”行为，在代码中更多做为有条件的赋值：
 .small[
 ```javascript
     uri = uri || window.location.href;     //如果uri的值转换后不为false，将uri的值赋值给uri，否则将window.location.href的值赋值给uri

     if(uri) {
        uri = uri;
     } else {
        uri = window.location.href;         //作用同上
     }

    wduss = this.getRequestParam("uss") || this.localStorage.getItem("U_trackWduss") || "";
 ```]
---
# 赋值表达式
除了常规的赋值运算“=”之外，赋值运算符还可以和其他运算符连接起来，如“+=”，“-=”，“*”，“/”等。

---
# 表达式计算
JavaScript可以解释运行由JavaScript源代码组成的字符串，并产生一个值。JavaScript通过全局函数eval()来完成这个工作：
.small[
```javascript
    eval("function f() { return x + 1; }");
```]
jQuery源代码中使用eval()函数的示例：
.small[
```javascript
    globalEval: function( data ) {
        if ( data && jQuery.trim( data ) ) {
            // We use execScript on Internet Explorer
            // We use an anonymous function so that context is window
            // rather than jQuery in Firefox
            ( window.execScript || function( data ) {
              window[ "eval" ].call( window, data );
              } )( data );
        }
    },
```]

---
#其他运算符
typeof是一元运算符，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。

.small[
```javascript
 typeof undefined      // "undefined"
 typeof null           // "object"
 typeof []             // "object"
 typeof new Date        // "object"
 typeof NaN             // "number"
```
]
如果要详细区分出类型如Array, Data, Object等，可使用Object.prototype.toString.call()。

delete是一元操作符，用来删除对象属性或者数组元素。
.small[
```javascript
    delete callbackList[data.c];        //删除callbackList对象中data.c属性
    var x = 1;
    var o = {x : 1, y: 2};
    delete o.x;                         //删除属性x，返回true
    delete x;                           //删除一个普通变量，在严格模式下抛出异常，非严格模式下返回true
```]

void是一元运算符，操作数可以是任意类型，忽略计算结果返回undefined。经常用在客户端URL中-javascript:URL，
void可以让浏览器不必显示表达式计算结果如：
.small[
```html
    <a href="javascript:void window.open();">Open</a>
```]

