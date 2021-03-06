layout: true
class: center, middle, master
---
#对象

.footnote[
created with [remark](http://github.com/gnab/remark)
]

---
layout: false
###对象
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
###创建对象
可以通过对象直接量、关键字new和Object.create()（ES5中的）函数来创建对象。
#### 对象直接量
创建对象最简单的方式是在JS中使用对象直接量。属性名可以是JS标识符也可以是字符串直接量（包括空字符串）。属性值可以是任意JS表达式的值（原始值或对象值）。
.small[
```javascript
var conf = {
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
var exports = {
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
}
```]
---
###通过new创建对象
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
###原型
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
---
###Object.create()
ES5定义了名为Object.create()的方法，它创建一个新的对象。第一个参数是对象原型，第二个可选参数。将需要继承的对象（实际上是要继承对象中的属性）传入这个方法即可：
.small[
```javascript
var conf = Object.create({
  "env": "daily",
  "repository": {
     "type": "svn",
     "url": "http://svn.geili.cn/geili_web/uss_server/ushop/branches/H5BuildTest"
  }
});
```]

conf**继承了**属性env和repository。注意与对象直接量定义的区别，可以通过hasOwnProperty方法来区分：
.small[
```javascript
Object.prototype.hasOwnProperty.call(conf, 'env');
```]
---
如果想创建一个普通的空对象（也就是创建如{}和new Object()一样对象），传入空对象的原型Object.prototype：
.small[
```javascript
var o = Object.create(Object.prototype);
```]
在ES3中可以通过如下代码来模拟：
.small[
```javascript
function inherit(p) {
    if (p == null) throw TypeError();         // p是一个对象，不能是null
    if (Object.create)                        // 如果Object.create()存在
        return Object.create(p);              // 直接使用它
    var t = typeof p;                         // 否则进一步检查
    if ( t !== "object" && t !== "function") throw TypeError();
    function f() {};                          // 定义一个空构造函数
    f.prototype = p;                          // 将它的原型设置为p
    return new f();                           // 使用f()创建p的继承对象
}
```]
---
###属性查询和设置
可以通过点（.）和方括号（[]）运算符来获取属性的值。运算符左侧是一个表达式，它返回一个对象。对于（.）来说，右侧必须是一个属性名称命名的**标识符**。对于方括号（[]）来说，方括号内必须是一个计算结果为字符串的表达式，这个字符串就是属性名字：
.small[
```javascript
  this.data.multiLang[key];        // data和multiLang都为**标识符**, key的计算结果是**字符串**
```]
通过点和方括号也可以创建属性或给属性赋值：
.small[
```javascript
  this.dom = {};
  //属性名"password"为表示符可以用点（.）创建属性
  this.dom.password = $("#password");   
  //属性名"tele-number"中含有非法表示符"-"，所以属性名只能作为字符串并用方括号（[]）设置属性
  this.dom.["tele-number"] = $('#telenumber'); 
```]
---
###作为关联数组的对象
由于可以使用方括号（[]）方式对象的属性。在JS中的对象也被成为关联数组。使用方括号（[]）访问对象更为灵活，属性的名称可以在程序中动态运算得到，而点（.）方式只能使用表示符，它是静态的，必须写在程序中。
.small[
```javascript
  hackJSLang: function (key) {
      var that = this;
      return that.data.multiLang[key];
  },
```]
---
###继承
在对象本身定义的属性称作“自有属性”（own property），也有一些属性是从原型对象继承而来的。假设要查询对象o的属性x，如果o中不存在x ，那么将会继续在o的原型对象中查询属性x。如果原型对象中也没有x，则继续在这个原型对象的原型上执行查询，直到找到x或者查找到一个原型是null的对象为止。JS中就是通过这个“链”实现属性的继承。
.small[
```javascript
var o = {}              // o 从Object.prototype继承对象的方法
o.x = 1;                // 给o定义一个属性x
var p = inherit(0);     // p继承o的Object.prototype
p.y = 2;                // 给p定义一个属性y
var q = inherit(p);     // q继承p、o和Object.prototype
q.z = 3;                // 给q定义一个属性z
var s = q.toString();   // toString继承自Object.prototype
q.x + q.y               // => 3:  x和y分别继承自o和p
```]
如果对o的属性做赋值操作，它总是在原始对象上创建属性和对已有属性赋值，而**不会**去修改原型链。在JS中，继承的特征只有在属性访问时才发生，而设置属性时没有这一特征。
.small[
```javascript
var unitcircle = { r: 1}; 
var c = inherit(unitcircle);       // c继承属性r
c.x = 1; c.y = 1;                  // c定义两个属性
c.r = 2;                           // c覆盖继承来的属性r
unitcircle.r;                      // => 1, 原来的对象没有修改
```]
---
###属性访问错误
查询一个不存在的属性并不会报错（返回undefined）。如果访问不存在的对象的属性会报错（不存在的对象为undefined或者是null，而它们都没有属性），例如：
.small[
```javascript
that.data.pendingPrice;   // 如果that.data返回为undefined，则再继续访问pendingPrice会报错TypeError
```]
避免这样的错误可以判断that及data是否存在，
.small[
```javascript
if(that) {
   if(that.data) {
     price = that.data.pendingPrice;
   }
}

price = that && that.data && that.data.pendingPrice;   // 更简洁的操作，利用&&短路特征
```]
---
###删除属性
delete运算符可以删除对象的属性。delete只能删除自有属性，不能删除继承属性（要删除继承属性，要从原型上删除，会影响所有继承自这个原型的对象）。delete删除成功或delete后不是属性访问表达式，delete返回true;
.small[
```javascript
delete data.result.note;
delete data.result.offline_pay_info;
delete o.toString;
delete 1;                                  
```]
删除通过变量声明和函数声明创建的全局对象的属性，删除不可配置属性（后续章节讲解）会返回false,
.small[
```javascript
delete Object.prototype;
var x = 1;
delete this.x;
function f(){};
delete this.f;
```]
---
###检测属性
JS对象可以看做属性集合，可以通过in运算符，hasOwnProperty()和propertyIsEnumberable()方法检测集合中成员所属关系。
hasOwnProperty()方法用来检测给定属性是否是对象自有属性。对继承属性它返回false：
.small[
```javascript
var o = {x: 1};
o.hasOwnProperty("x");
var o2 = inherit(o);                // o2 继承 o的属性
o2.hasOwnProperty("x");             // false, "x"是继承与o的属性
o2.hasOwnProperty("toString");      // false, "toString"是继承自Object.prototype的属性
```]
---
###枚举属性
可以使用for/in遍历对象的属性。它可以变量所有可枚举的属性包括自有属性和**继承**的属性。对象继承的内置方法不可枚举。比如：
.small[
```javascript
var o = {x: 1, y:2, z:3};
for(p in o)                                 //遍历会输出x, y, 和z但是不回输出不可枚举属性如toString，
    o.propertyIsEnumerable("toString");     //=>false, 不可枚举列举一些有用的工具函数，这些函数都用到了for/in循环。
```]
.small[
```javascript
function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}
```]
.small[
```javascript
function merge(o, p) {
    for (prop in p) {
        if(o.hasOwnProperty[prop]) continue;
        o[prop] = p[prop];
    }
    return o;
}
```]
---
.small[
```javascript
function restrict(o, p) {
    for (prop in o) {
        if(! (prop in p) ) 
            delete o[prop];
    }
    return o;
}
```]
.small[
```javascript
function subtract(o, p) {
    for (prop in p) {
        delete o[prop];
    }
    return o;
}
```]
.small[
```javascript
function union(o, p) {
    return extend(extend({}, o), p); }
}
```]
除了for/in循环之外，ES5定义了两个可以枚举属性名称的函数。一个是Object.keys()，发返回一个数组，包含所有**可枚举的**自有属性。另一个是Object.getOwnPropertyNames(),它返回对象的所有自有属性名称，而不仅仅是可枚举的属性。
---
###属性getter和setter
传统getter和setter方法：
.small[
```javascript
function Field(val) {
    this.value = val;
    this.getValue = function(){
        return this.value;
    }
    this.setValue = function(val) {
        this.value = val;
    }
}

var field = new Field('new value');
field.getValue();                           //=> "new value"

field.setValue('update value'); 

field.getValue();                          //=> "update value

field.value = "not actually wanted";

field.getValue();                          //=> "not actually wanted"
```]
---
.small[
```javascript
function Field(val) {
    var value = val;

    this.getValue = function(){
        return value;
    };

    this.setValue = function(val) {
        value = val;
    };
}

var field = new Field('new value');

field.getValue();                           //=> "new value"

field.setValue('update value'); 

field.getValue();                          //=> "update value

field.value = "not actually wanted";

field.getValue();                          //=> "update value"
```]
JS中是否能使用设置器和访问器操作属性，例如，
.small[
```javascript
field.value;                                //=> "new value"
field.value = 'update value';      
```]
---
在ES5中，由get和set定义的属性称作“存取器属性”。如果一个属性自由get修饰，那么它是只读属性，如果只有set修饰那么它是只写属性。
.small[
```javascript
Field = {
     val : 'new value',

     get value(){
        return this.val;
     },

     set value(val) {
        this.val = val;
     }
};
Field.value;                                   //=> "new value"

Field.value = 'update value'; 

Field.value;                                  //=> "update value

Field.value = "This is we wanted";

Field.value;                                 //=> "This is we wanted"
```]
---
.small[
```javascript
var circle = {
  r: 1.0,
  get radius() {
      return this.r;
  },
  set radius(r) {
      this.r = r;
  }
  // area是只读属性，没有setter，只有getter
  get area() {
     return 3.1415 * this.r * this.r;
  } }
```]

.small[
```javascript
var serialnum = {
    $n: 0,
    get next() { return this.$n++; },

    set next(n) {
        if( n >= this.$n) this.$n = n;
        else throw '序列号不能比当前值小';
    }
}
```]
---
###属性的特征
除了包含名字和值之外，属性还包含标识它们可写，可枚举和可配置的特性。在ES3中无法设置这些特性，所有创建的属性都是可写，可枚举和可配置的，而无法对这些特性做修改。在ES5中可以查询和设置这些特性。数据属性的4个特性是值（value），可写性（writable），可枚举性（enumerable），可配置性（configurable）。存取器有读取（get），写入（set），可枚举和可配置。通过Object.getOwnPropertyDescriptor()可以获取某个对象特定属性的属性描述符：
.small[
```javascript
//返回{value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({x: 1}, "x");

//返回{ configurable: true,  enumerable: true, get: /*func*/, set: /*func*/
Object.getOwnPropertyDescriptor(serialnum, "next"); 

// 对于继承属性和不存在的属性，返回undefined
Object.getOwnPropertyDescriptor({}, "x");     // undefined,
Object.getOwnPropertyDescriptor({}, "toString") // undefined
```]
---
要设置属性的特性，需要调用Object.defineProperty(),传入要修改的对象，要创建或者修改的属性名和属性描述符对象：
.small[
```javascript
var o = {};
//添加不可枚举的数据属性x，并赋值为1
Object.defineProperty(o, "x", { value: 1,
        writable: true,
        enumerable: false,
        configurable: true});
o.x;                    //=> 1
Object.keys(o);         // =>[]

Object.defineProperty(o, "x",  {writable: false}); 
o.x = 2;                // 操作失败但不报错，严格模式类型异常
o.x;                    //=> 1
Object.defineProperty(o, "x", { value: 2});
o.x;                    //=> 2
Object.defineProperty(o, "x", {get: function() { return 0;} });
o.x;                    //=> 0
```]
要修改或创建多个属性，需要使用Object.defineProperties()，
.small[
```javascript
var serialnum = Object.defineProperties({}, {
   $n: {value: 0, writable: true, enumerable: true, configurable: true},
   next: { get: function() {return this.$n++; },
   set: function(n) {
    if( n >= this.$n) this.$n = n;
    else throw '序列号不能比当前值小';
    }
   }
});
```]
---
###原型属性
原型是用来继承其中的属性的，它在实例对象创建之初就设置好了。通过对象直接量创建的对象使用Object.prototype作为它们的原型。通过new创建的对象使用构造函数的prototype属性作为他们的原型。通过Object.create()创建的对象使用第一个参数（也可以是null）作为它的原型。
在ES5中可以通过Object.getPrototypeOf()查询它的原型。要检测一个对象是否是另一个对象的原型（或处于原型链中），可以使用isPrototypeOf()方法。
.small[
```javascript
var p = {x: 1};
var o = Object.create(p)
Object.getPrototypeOf(p);                 //=> Object.prototype
Object.getPrototypeOf(o);                 //=> {x: 1}
p.isPrototypeOf(o);                       //=> true, o继承自p
Object.prototype.isPrototypeOf(o);        // => true; o继承自Object.prototype
```]
Firefox, Chrome等浏览器（除了IE和Opera外）对外暴露了__proto__属性，用来查询/设置对象的原型。
---
###类属性
对象的类属性（class attribute）是一个字符串，表示对象的类信息。可以用Object.prototype的toString()方法返回这个字符串格式，一个类属性的实现，
.small[
```javascript
function classof(o) {
   if( o === null) return "Null";
   if( o === undefined) return "Undefined";
      return Object.prototype.toString.call(o).slice(8, -1);
}

classof(null);          // => "Null"
classof(1);             // => "Number"
classof(window);        // => "Window"
function f() {};
classof(new f());       // => "Object"
classof(f);             // => "Function"
```]
---
###序列化对象
对象序列化（serialization）是指将对象的状态转换为字符串，也可以将字符串还原为对象。ES5提供内置函数JSON.stringify()和JSON.parse()用来序列化和还原JS对象。这些方法都使用**JSON**作为数据交换格式。JSON不能表示JavaScript里的所有值。JSON.stringify()只能序列化对象可枚举的自有属性。对不能序列化的属性来说，序列化后的字符串将这个属性省略掉。
.small[
```javascript
var param = "param=" + JSON.stringify(data);   //作为参数时序列化为字符串
var data = JSON.parse(data);                   //字符串转换为JavaScript对象
```]
.small[
```javascript
var param = {
   password: that.dom.password.val(),
   telephone: that.dom.telenumber.val(),
   client_type: "H5"
}
var param = JSON.stringify(param);
param.type = "5";

Wlib.SendRequest(Wlib.config().loginPort + "/seller/login?" + param, function (data) {});
```]
---
###对象方法
toString()方法返回这个方法对象的字符串。在需要将对象转换为字符串的时候，JavaScript都会调用这个方法.
.small[
```javascript
(new Date).toString();  // "Thu Jun 11 2015 18:23:58 GMT+0800 (CST)"
({}).toString();                  // "[object Object]"
(true).toString();              // "true"
```]
Array.toString(), Date.toString()和Funcion.toString()都有自己对toString()方法的重写方式。
toLocaleString()方法返回对象本地化字符串。Object.toLocaleString()方法仅是调用toString()方法。Date和Number类对toLocaleString()做了定制，
.small[
```javascript
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
console.log(date.toLocaleString('en-US'));
// "12/19/2012, 7:00:00 PM"
console.log(date.toLocaleString(['ban', 'id']));
// "20/12/2012 11.00.00"
```]
.small[
```javascript
var number = 123456.789;
console.log(number.toLocaleString('zh-Hans-CN-u-nu-hanidec'));
//  一二三,四五六.七八九
console.log(number.toLocaleString(['ban', 'id']));
// 123.456,789
```]
---
valueOf()方法和toString() 方法类似，JS在将对象转换为某种原始值而非字符串的时候会调用它，**尤其是转换为数字的时候**。如果在需要使用原始值的上下文中使用了对象，JS会自动调用这个方法。
.small[
```javascript
o = new Object();
myVar = o.valueOf();      // [object Object]

var x = new String('Hello world');
console.log(x.valueOf()); // Displays 'Hello world'

var x = new Date(56, 6, 17);
var myVar = x.valueOf();      // assigns -424713600000 to myVar
```]
