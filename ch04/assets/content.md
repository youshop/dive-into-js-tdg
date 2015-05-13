class: center, middle, inverse

# 表达式和运算符 

.footnote[
       created with [remark](http://github.com/gnab/remark)
]

---
# 原始表达式
JavaScript中原始表达式包含常量、直接量、关键字和变量。
直接量是直接在程序中出现的常数值。

.small[
```javascript
       0xff    // 十六进制数值直接量
       100     // 十进制数值直接量
       "2014.8.8" //字符串直接量
       /[\?\$]/gi //正则表达式直接量
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
    urls      //  返回urls的值
    undefined   // undefined是全局变量，和null不同它不是一个关键字
```
]

JavaScript会将标识符当做变量去查找它的值。如果变量名不存在，表达式运算结果为undefined。在ES5严格模式'use strict'中，对不存在的变量求值会抛出引用错误异常(ReferenceError)。
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

对象初始化表达式的值可以是任意JavaScript表达式。对象直接量中的属性名称可以是字符串而不是标识符（如果要使用JavaScript中的保留字或含有非法标识符做为属性名时就可以用字符串）:

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
JavaScript代码段（函数体），
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
 function tempCheck(data) {
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
