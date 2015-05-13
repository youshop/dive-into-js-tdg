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
]

JavaScript中的一些保留字构成原始表达式：

.small[
```javascript
true         // 布尔值：真 
false        // 布尔值：假 
null         // 空
this         // “当前”对象
]

第三种原始表达式是变量：

.small[
```javascript
urls      //  返回urls的值
undefined   // undefined是全局变量，和null不同它不是一个关键字
]

JavaScript会将标识符当做变量去查找它的值。如果变量名不存在，表达式运算结果为undefined。在ES5严格模式'use strict'中，对不存在的变量求值会抛出引用错误异常(ReferenceError)。

