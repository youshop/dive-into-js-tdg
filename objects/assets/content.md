layout: true
class: center, middle, master
---
#对象

.footnote[
created with [remark](http://github.com/gnab/remark)
]

---
layout: false
#对象
JavaScript中的对象是属性的无序集合，每个属性都是名/值对。除了字符串，数字，true，false，null和undefined之外，JavaScript的值都是对象。JavaScript对象是引用数据类型，如果变量x是指向一个对象的引用，那么执行代码var y = x；变量y也是指向同一个对象的引用，而非这个对象的副本。通过变量y修改这个对象也会对变量x造成影响。
---
.small[
```javascript
function foo(param) {
    param.key = "update value from foo";
    param.key2 = "new value set from foo";
}

function bar(param) {
    param = 512;
    param.key = "force add"; 
}

function main() {
    var obj = {
key: "origin value"
    };

    console.log("Obj before foo invoked:" + JSON.stringify(obj));

    foo(obj);

    console.log("Obj after foo invoked:" + JSON.stringify(obj));

    var num = 1024;

    console.info("num before bar invoked:" + num);

    bar(num);

    console.info("num after bar invoked:" + num);
}

main();
```]
---
##创建对象
可以通过对象直接量、关键字new和Object.create()（ES5中的）函数来创建对象。
### 对象直接量
创建对象最简单的方式是在JS中使用对象直接量。属性名可以是JS标识符也可以是字符串直接量（包括空字符串）。属性值可以是任意JS表达式的值（原始值或对象值）。
.small[
```javascript
{
    "env": "daily",
    "repository": {
        "type": "svn",
        "url": "http://svn.geili.cn/geili_web/uss_server/ushop/branches/H5BuildTest"
    }
}
```]
---
对象直接量每次运算都创建并初始化一个新的对象。如果在一个重复的过程中（循环或者重复调用的函数），它讲创建很多**新对象**，并且每次创建的对象的属性值也可能不同。
.small[
```javascript
 server: {
    options: {
    protocal: 'http',
    port: '80',
    middleware: function(connect, options) {
        var middlewares = [];
        middlewares.push(rewriteRulesSnippet);
       if(!Array.isArray(options.base)) {
                options.base = [options.base];
       }
       var directory = options.directory || options.base[options.base.length - 1];
       options.base.forEach(function (base) {
                    middlewares.push(connect.static(base));
       });
       middlewares.push(connect.directory(directory));
       return middlewares;
       },
       base: 'src'
   }
 }
```]
---
##通过new创建对象
new运算符创建并初始化一个新对象。关键字new后跟随一个函数调用。这里的函数称做构造函数（constructor），构造函数用以初始化一个新创建的对象。JS中原始类型都包含构造函数。
.small[
```javascript
var o = new Object();  // 创建空对象，和{}一样
var a = new Array();  // 创建空数组，和[]一样
var d = new Date();  // 创建表示当前时间的Date对象
var r = new RegExp(); // 创建正则表达式RegExp对象
```]
除了这些内置的构造函数，还可以用自定义构造函数来初始化新对象。
.small[
```javascript
var index = new Index();  //自定义构造函数Index
var list = new List();        // 创建List对象
var login = new Login();   //  创建Login对象
```]
---
##原型
JS中，每个对象（null除外）都有一个原型对象相关联。每一个对象都从原型继承属性。所有对象直接量都具有同一个原型，它是Object.prototype。通过关键字new和构造函数调用创建的对象的原型就是构造函数的prototype属性值。所以通过{}和new Object()创建的对象都继承自Object.prototype。new Array()和new Date()创建的对象的原型分别是Array.prototype和Date.prototype。

原型本身也是对象，因此它也应该有原型。例如Date.prototype继承自Object.prototype，因此new Date()创建的对象的属性继承自Date.prototype和Object.prototype。这一系列链接的原型对象就是所谓的“原型链”（prototype chain)。

这一原型链的顶端对象终止于Object.prototype，而它不继承任何原型（原型为null）。
.small[
```javascript
var d = new Date();
d.__proto__;
d.__proto__.__proto__
d.__proto__.__proto__.__proto__
```]
