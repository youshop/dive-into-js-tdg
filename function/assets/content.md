layout: true
class: center, middle, master
---
# javaScript 函数 

.footnote[
       created with [remark](http://github.com/gnab/remark)
]

---
layout: false

"函数"通俗的来说，实现某一功能的、可重复使用的代码块。

在js中，给函数一些自己定制的参数，然后拿想要的返回结果 :p 

轻松加愉快...

.small[
```javascript

	//印尼金额定制，给个数返回当地金额的表示方法。
	
	function getMoney(num) {
		if(num>0) {
			return Math.floor(parseFloat(num)).format(0, 3, '.');
		}
		else {
			return false;
		}
	}
	
	getMoney(123456789); //返回123.456.789	
```
]

看似简单的js函数，其实藏了不少东西。

可以说js最闪光的一点就是其对函数的实现。

让我们拿起小铲子挖一挖再说...

---

#一、函数的定义

函数使用function关键字来定义，它通常用在函数定义表达式或者函数声明语句里。

.small[
```javascript
	//函数声明语句
	function getMoney(num) { /* ...... */ } 
		
	//函数定义表达式
	var getMoney = function (num) { /* ...... */ } 
```
]

函数的名称是函数声明语句必须的部分，它的用途就像变量的名字，新定义的函数会保存这个变量。对于函数定义表达式来说，这个名字是可选的，如果存在，该名字只存在于函数体中，并不指代函数本身。（拿chrome看个例子：getMoney.name）

挖深一点，以表达式定义的函数时，虽然函数名称是可选的，但函数的递归时使用函数名称会很方便。
.small[
```javascript
	var f ＝ function factorial(num) {
		if(num <= 1) {
			return 1; 
		}
		else {
    		return num*factorial(num-1);
		}
	}
	f(4);
```
]

---

其实，arguments的callee属性也可以用来引用当前正在执行的函数。函数的递归和arguments我们后面再挖，这里还是先就说函数定义。

js没有块级作用域，所以在定义函数中的所有变量，无论是在哪里声明的，在整个函数中它们都是有定义的。最俗的例子：
.small[
```javascript
	function alert_v() {
		alert(scope);  // undefined
    	var scope="local";  
    	alert(scope);  // local   
	}
```
]

函数声明语句和定义变量一样，所以可以被在它定义之前出现的代码所调用。表达式所定义的函数。虽然引用的变量声明提前了，但给变量赋值是不会提前的，所以在定义之前无法调用。
.small[
```javascript
	function alert_v() {
		scope1(); //正常调用
		scope2(); //调用失败 scope2＝undefined
    	function scope1() { alert("scope1") }
		var scope2 = function () { alert("scope1") }
    	scope1(); //正常调用
		scope2(); //正常调用
	}
```
]

---

函数中的return语句导致函数停止执行，并返回它的表达式值给调用者。如果没有return语句或没有一个与之相关的表达式，则函数返回undefined。

.small[
```javascript
	function (data) {
		if ('score' in data) {
			return false;  
		}
        return true;  //尽量明确的给出return的返回值
	}
```
]

#二、函数的参数

再来说说js函数的参数，在定义中js并未指定参数类型，函数调用时甚至也不会检查传入参数的个数。当实参比形参个数要少时，剩下的形参都将设置为undefined。

当调用函数时传入的实参个数超过形参个数时，可以通过标识符arguments获取实参对象的引用，实参对象是一个类数组对象，0为第一个实参，length属性表示实参的个数。只有函数被调用时，arguments对象才会创建，未调用时其值为null。

.small[
```javascript
	function f(a, b, c) {
    	alert(arguments.length);   // 实际参数的个数
    	a = 100;
    	alert(arguments[0]);       // "100"
    	alert(c);                  // "undefined"
	}
	f(1, 2);
```
]

---

实参对象还定义了callee和caller属性，在非严格模式下callee属性指当前正在执行的函数，通过caller属性可以访问调用栈，即函数的调用者。

.small[
```javascript
	var f ＝ function (num) {
		if(num <= 1) {
			return 1; 
		}
		else {
    		return num*arguments.callee(num-1); 
		}
	}
	f(4);
```
]

在一个函数调用另一个函数时，被调用函数会自动生成一个caller属性，指向调用它的函数对象。如果该函数当前未被调用，或并非被其他函数调用，则caller为null。

.small[
```javascript
	function caller1() {  
    	caller2();  //调用另一个函数  
		//......
	} 
	function caller2() {  
		var myCaller = caller2.caller;  //被调用函数的caller
		//......
	}  
```
]

在ECMAscript 5严格模式中，限制了arguments对象。例如：不允许对arguments赋值、不再追踪参数的变化、禁用了arguments.callee等，这里就不深挖了。

---

#三、函数的调用

构成函数主体的js代码在定义之时并不会执行，只有调用该函数时，它们才会执行。有4种方式来调用js函数：

a、作为函数

b、作为方法

c、作为构造函数

d、通过原型的call()、apply()、bind()方法间接调用

.small[
```javascript
	f ( );
	
	o.f ( );
	
	new F ( );
	
	f.apply ( o );
```
]

先来说说函数调用和方法调用，它们有一个重要的区别，即调用上下文。在对象的方法调用表达式里，函数体可以使用关键字this引用该调用它的对象。在函数中调用，函数中的this值不是全局对象就是undefined。

---

挖一下函数的this :）  , 一个函数调用时，除了引用函数定义时的参数外，还有arguments对象，其实还有一个额外的隐藏参数，就是函数所属的对象，高逼格的讲，“调用上下文”。如果没有所特指，则为global（如window）对象，在函数内你可用this关键字访问它。

有趣的是，这个this是一个关键字，不是变量，也不是属性，js不允许给this赋值。

.small[
```javascript
	function f () { alert(this.name); }   /*全局下调用 this表示浏览器window对象*/
	o.f＝ function () { alert(this.name); }   /*在o上调用f，this表示对象o*/
```
]

需要注意的一点，this没有作用域的限制，嵌套的函数不会从调用它的函数中继承this，每个函数都有自己的this嘛。如果想访问外部函数的this值，需要提前将this值保存在一个变量里，当然，这个变量要在可访问的作用域内。

.small[
```javascript
	Index.prototype = 
	{
		init: function () {
            var that = this;
			//......
			$("#button").on("click",function(){
                that.renderUI();  //this表示click的对象
            });            
        },
		renderUI: function () { /*......*/ },
		//...... 其他内容
	}
```
]

---

如果函数或方法调用之前带有关键字new，他就构成构造函数调用。构造函数调用和普通函数、对象方法调用在实参处理、调用上下文、返回值方面都有所区别。

.small[
```javascript
	var Index = function () {
		//初始化一些内容......
	};
	Index.prototype = { 
		//在原型上定义一些公用内容......
	}
	var index = new Index();
```
]

构造函数调用创建一个新的空对象，这个对象继承自构造函数的prototype属性。

构造函数试图初始化这个新创建的对象，并将这个对象用作其调用上下文，因此构造函数可以使用this关键字来引用这个新创建的对象。

构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，他会显式返回。

.small[
```javascript
	function (n) {
		var that = {};  //模拟操作
		that.prototype = Index.prototype;  //模拟操作
		that.name = n;
		//......
		return that;  //模拟操作		
	};
```
]

---

刚刚提到了几种函数的调用，以及隐藏的调用上下文，在函数中可以通过this访问这个对象。不同的调用方式，上下文对象也不一样，js一个较为有趣的行为是，可以间接改变调用的上下文。

.small[
```javascript
	var name = 'global';
	var o = {
    	name: 'gufeng',
	};
	function getInfo(job) {
		alert(this.name+" is "+job);
	}
	getInfo("h5");  //直接调用,上下文是window
	getInfo.call(o,"h5");  //间接调用,上下文是第一个参数对象o
	getInfo.apply(o, ["h5"]);  //同上，参数以数组包装，适合多参数
	getInfo.bind(o)("h5");  //间接调用,先绑定对象，再执行方法。
```
]

这几个方法都允许显式指定调用所需的this值，也就是说，函数可以作为任何的对象方法调用。

bind方法返回的仍然是一个函数，因此后面还需要()来进行调用才可以。

---

#四、作为值的函数

函数可以定义，可以调用，这是函数最基本的特性，然而在js中，函数不仅是一种语法，也是值。函数是一种特殊的对象，可以有自己的属性和方法。

.small[
```javascript
	var f = new Function("a","b","return 'a + b = '+ (a+b)");
	alert( f(1,2) );  //a + b = 3
	
	alert( f.length );  //函数的length属性返回形参数量 
	
	alert( f.apply(window,[1,3]) ); //函数的apply方法，修改调用的上下文，返回a + b = 4
	
	alert( f.prototype) ); //函数的prototype属性,返回函数的原型链对象，到对象的时候再挖 
```
]

可以将函数赋值给变量，存储在对象的属性或数组的元素中，作为参数传入给另外一个函数，或被其他函数return返回等。

.small[
```javascript
	var o = {}, a = [];
	
	o.f = new Function("a","b","return 'a + b = '+ (a+b)");  //存储在对象的属性中
	
	a[0] = o.f;  //存储在数组中，调用格式：a[0](1,3)
	
	var f1 = function (callback,a,b) { return callback(a,b) }  //作为参数，格式：f1(a[0],2,4)
	
	var f2 = function () { return a[0] }  //作为返回值，格式：f2()(2,4)
```
]

---

在上面的介绍中，函数是通过Function构造函数来定义的。在例子中，Function构造函数定义与函数声明、直接量表达式定义目的是一样的。使用Function构造函数也是为了说明函数是一种特殊的对象而已。

Function构造函数这里就不深挖了，不建议使用。有几点需要注意下：
.small[
```javascript
	var f = new Function("a","b","return 'a + b = '+ (a+b)");  
```
]

a、Function构造函数允许js在运行时动态创建并编译函数；

b、每次调用Function构造函数都会解析函数体并创建新的函数对象，这点不同于其他定义方式，一次定义多处调用（切记循环中调用）;

c、正如和其他方式不同，Function构造函数创建的函数并不预编译调用，它所创建的函数也不使用词法作用域，相反，函数体的代码编译总是会在顶层函数执行。可以将Function构造函数认为是在全局作用域中执行的eval()。

.small[
```javascript
	var scope = "global";
	function f () {
		var scope = "local";
		return new Function(" return scope ");
	}
	alert( f()() );  //global 无法捕获局部作用域变量
```
]


---

#五、函数与作用域

js函数除了执行操作外，也是数据类型，这极大的提高了js的灵活性。更有趣的是在这基础上js函数还划分了程序的作用域:)

简单说说作用域，作用域就是变量的可访问范围，即作用域控制着变量的可见性和生命周期。js的函数在调用中，需要变量来进行操作。

在js中，作用域有两种：全局作用域和局部作用域，局部作用域是按照函数来区分的。每次调用一个函数的时候，就会进入一个函数内的作用域，当从函数返回以后，就返回调用前的作用域。值得注意的是：**js中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里**。

说多了，有点复杂，写个代码平静平静：

.small[
```javascript
	var scope = "global";  //全局作用域下定义scope
	function f1 () {
		var scope = "local1";  //在函数内部定义变量，即f1的作用域下定义scope
		function f2 () {
			var scope = "local2";  //同上，f2的作用域下定义scope
			return scope;
		}
		return f2 ();
	}
	alert( f1() );  //local2
```
]

---

上面的代码中，执行函数f1；f1调用了内部定义的函数f2，向全局返回f2执行的结果；f2调用后返回变量scope的值。变量scope在三个作用域中都有定义，所以f2返回的结果是最内层定义的结果local2。

如果f2中没有定义scope，f2调用时会从上层获取scope，如果上层的f1有定义scope则返回，如果没有继续向上获取scope，直到顶层获取全局变量scope，如果还没有定义则程序报错。

.small[
```javascript
	var scope = "global";  //只有这里定义scope
	function f1 () {
		function f2 () {
			return scope;
		}
		return f2 ();
	}
	alert( f1() );  //global
```
]

总结一下：

js的作用域是通过函数来定义的，在一个函数中定义的变量只对这个函数内部可见，我们称为局部作用域。在函数中引用一个变量时，js会先搜索当前的局部作用域，如果没有找到则搜索其上层局部作用域，一直到全局作用域。在函数体内部，局部变量的优先级比同名的外层变量或全局变量高。

---

在js中，只有函数可以限定一个变量的作用范围，函数中声明的所有变量，无论是在哪里声明的，在整个函数中它们都是有定义的。

.small[
```javascript
	var n = 100;
	function f (num) {
		alert(n);
		//......
		if(num>5) {
			var n = num*2; 
		}
		//......
		alert(n);
	}
	f(2);  //undefined, undefined
	f(12);  //undefined, 24
```
]

if、for等语句中的大括号 { } 不能限定作用域范围。

函数内部定义的变量，即使在定义之前输出也不会报错（可能没有赋值），**所以说声明的变量在整个函数中都是起作用的**。

---

再来深挖一下函数的作用域 :p ，函数的调用离不开需要的变量，这些变量可能是函数的参数、函数内自己定义的变量、或者函数外层定义的变量，它们被限制在自己的作用域里。js是如何编译这些变量呢？

ECMAScript规范中强制规定，全局变量是全局对象的属性！那么函数中的局部变量呢，是局部对象的属性么？还是函数自身的属性？浏览器实现了这一功能，把局部变量当作跟函数调用相关的某个对象的属性。ECMA3称其为“调用对象”，ECMA5改称为“声明上下文对象”，都是高逼格的称呼。

其实这只是一个普通的对象，它保存了函数定义时所在作用域的变量，这个对象是一种不可见的浏览器内部实现而已。通过对象保存定义的变量，也说明了js词法作用域的有趣之处：无论在函数哪里定义变量，声明都被提前了，因为只有在函数调用时才解析保存作用域变量的对象，好吧太拗口了，叫他声明上下文对象吧，也挺拗口的。

.small[
```javascript
	function f (num) {
		var a = 3,b = 4;
		return num ? a*b*num : false;
	}
	f(2);
	
	//声明上下文对象
	{ 
		a : 3, 
		b : 4,
		num : 
	}  
```
]

---

声明上下文对象实现了js的词法作用域，所谓词法作用域是说，其作用域是在定义时，或者说词法解析时，就确定下来的，而并非在执行时确定。

如果真将一个局部变量看作是声明上下文对象属性的话，那么换个角度再挖一下变量作用域。

函数的调用除了使用自身定义的变量，还可以访问外层的变量、全局的变量，这些变量都封装到了各自的声明上下文对象属性中。

.small[
```javascript
	var x = 1;
	function f1 (num) {
		var f1_x = 2;
		function f2 (num) {
			var f2_x = 3;
			return f2_x*num;
		}
		return f2 (num);
	}
	f1(2);
	
	//f1声明上下文对象
	{ f1_x : 2, num : }
	//f2声明上下文对象
	{ f2_x : 3, num : }
```
]

f2在调用时可以访问变量 f2_x、num、f1_x、x，他们分属于不同的声明上下文对象中，这些变量是在函数定义时就准备好了。

---

也就是说函数不仅保存了自己的声明上下文对象，还保存了外层一直到全局的声明上下文对象。这些对象按层级构成了一条链表，被亲切的成为“作用域链”。

作用域链由声明上下文对象构成，由于是函数划分作用域，作用域链也体现出了函数的嵌套层级。链上的每一个对象都保存了函数调用时可使用的变量。

.small[
```javascript
	var x = 0;
	function f1 (num) {
		var x = 1;
		function f2 (num) {
			var x = 2; 
			function f3 (num) { 
				var x = 3; 
			}
		}
	}
```
]
	
js在做变量解析时，好吧说普通话，函数调用需要查找变量x时，先从作用域链的第一个对象开始找起，也就是自己定义那个声明上下文对象，如果找到了x就使用它，如果没找到，继续沿着作用域链查找外层函数的声明上下文对象，以此类推，可以一直到作用域链的另一端全局对象，如果找不到则抛出一个未定义的错误。

.small[
```javascript
	f3.x ---> f2.x ---> f1.x ---> x
```
]

总结一下：当定义了一个函数后，当前的作用域链就会被保存下来，并且成为函数内部状态的一部分，用作函数调用时使用。这个是很重要的一个概念！

---

#六、函数与闭包

函数的东西有点多，挖的有点累了... 不过还有一个高大上的东西没挖 -- “闭包”。

闭包是一个比较高深、模糊的名称，有各种解释，都比较抽象。再加上各种应用，闭包一下子就让人醉了。

<img src="images/bibao.png" height="300">

先调侃一下，网上说如果你不能让一个6岁的孩子知道什么是闭包，那么说明你也不理解闭包，压力山大...

---

挖闭包前，还是先说说js的函数，函数是实现某种功能的语法、一种特殊的对象，引用数据类型、提供词法作用域、调用时，解析了作用域链上的对象属性...

6岁的孩子知道函数的那些事儿么？太扯了，好吧至少我知道，开始挖闭包。

“闭包”，可以这么理解，一个封闭的包装体。哈哈，简单粗暴 :)

<img src="images/bibao.jpg" height="300">

... ...

**这个包装体，包含了函数自身、还有函数调用时需要的作用域链！他们作为一个整体被封装。**外面是什么呢，作用域！谁知道哪个作用域。是函数定义时的作用域最好，oh，no，基本都不是...

---

闭包 -- **函数和它的作用域链构成的封闭整体包装** ，不知道解释清楚没。我觉着6岁的孩子应该能听懂。

说点听不懂的，在计算机科学中，闭包是词法闭包的简称，是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为闭包是由函数和与其相关的引用环境组合而成的实体。

js权威指南是这样解释的：函数对象可以通过作用域链相互关联起来，函数体内部的变量可以保存在函数作用域内，这种特性在计算机科学文献中称为“闭包”。

懂没？别解释了，还是看个图吧：

<img src="images/bibao2.jpg" height="160">

从外界来看，闭包其实是一个函数，这个函数可能很特别，因为和函数封装在一起的作用域链可能和当前的作用域有出入。比如一个函数把它的执行结果返回给另一个函数当作参数，而这个参数本身又是一个函数。no，又有点乱了...

---

写个代码，平静一下：嗯，函数还有它声明时的作用域链

.small[
```javascript
	var x = "global";
	function f( ) {
        var x = "f";
		function b(callback) {
			var x = "b";
			return callback();
		}
		function c() {
			//var x = "c";
			return x;
		}
		return b(c);
    }
	alert(f());
```
]

先在全局环境声明一个函数f，还有一个全局变量x，发现没，全局变量基本就是在打酱油。最后调用了函数f。

f中也定义了x，函数中自己的局部变量。f执行返回了函数b的结果，b中也有局部变量x，嗯，b用到了参数，实际调用时参数是一个函数c。

f中调用函数b时传递了参数函数c，在b内部又执行了函数c，函数c返回变量x，这里面先注释掉了函数c中定义的x。

先不讨论执行结果，函数c要返回x，x怎么获取？ c的作用域链找呗... 不知道6岁的孩子能不能明白...

---

来找一下函数c的作用域链，c在f中声明，f在全局声明，ok：

c的作用域链 ＝ c的声明上下文对象 + f的声明上下文对象 + 全局对象；

x在哪里？c中我注释掉了，那么在f里。什么？没b什么事么？对，不信你看下图：

<img src="images/bibao.png" height="300">

c和b同级，都是在f里声明定义的。所以他们的声明上下文对象不一样，作用域链自然就不一样了。

即使把c放到b中去执行，c也是作为一个封闭的整体进去的，再说一遍，函数c和它的作用域链是一个整体，而且这个作用域链是c声明时就计算好的。

---

话说刚才那图看着有点眼熟呢，对了，闭包自己的装逼图嘛：

<img src="images/bibao.jpg" height="300" style="margin-bottom:20px">

不管闭包怎么装，它就是一个整体，作用域链封闭了它，从外界不能拆散它们，函数和自己的作用域链永远都是一个整体。

所以，在js中，可以很负责人的说，函数调用时，就是一个闭包的体现。

不管外界如何，函数的作用域链永远封闭包装着它。说了这么多，理解闭包其实不难。

---

理解闭包不难，但应用闭包可不容易。来看会一同学提供的例子：

.small[
```javascript
	function init() {     
		var pAry = document.getElementsByTagName("p");     
    	for( var i=0; i<pAry.length; i++ ) {     
			pAry[i].onclick = function() {     
         		alert(i);     
			}     
		}     
	}     
```
]

上面的函数查询了文档中所有的p元素，然后循环给每个p元素绑定了一个事件，当触发事件时绑定了一个匿名函数：
.small[
```javascript
	function() {     
    	alert(i);     
	}     
```
]

这个函数显示变量 i，有点无趣，是想显示p元素的位置么？

看下这个函数的作用域链，i 没有在这个函数中声明，再向上，在上一层中被定义，也就是init函数的声明上下文对象中保存。

init声明上下文对象为 { i:5 }，为什么i的值是5呢？变量i在init函数的for循环中被定义，它在整个init函数中都是可见的。当执行事件函数时，init函数已经执行结束，作用域链保存了i最后的结果。

---

如何正确的显示p元素的位置呢？也就是说如何在事件函数中获取变量i在for循环中的每一个值呢？其实方法有很多，可以把变量i的中间值保存在很多地方，例如（触发事件的对象）p的属性里、事件函数的属性里，当然还有事件函数作用域链里。

这里说下如何保存在作用域链里，简单的应用闭包。如果想把i的中间值保存在作用域链里，init声明上下文对象和外层都不行，因为for循环在init里，为了拿到中间的i值，必须在for循环内添加声明上下文对象到作用域链，也就是说在for循环内、事件函数外添加声明上下文对象，即在for循环内、事件函数外定义函数创建作用域。

.small[
```javascript
		for( var i=0; i<pAry.length; i++ ) {     
			( function () { pAry[i].onclick = function(){alert(i);} } )();     
		}      
```
]

函数创建好了，怎么传递i呢，可以通过参数、或者内部定义的变量让事件函数访问。

.small[
```javascript
		    
			(function (parameter) {
				pAry[i].onclick = function() { alert(parameter); }
			})(i);     
		     
```
]

.small[
```javascript
		
			(function () {
				var temp = i;
				pAry[i].onclick = function() { alert(temp); }
			})();     
		      
```
]

---

刚才的例子可能有点生涩，代码一下就风骚了起来。其实闭包的应用无处不在，一会咱们再挖一挖函数的应用，那些应用或多或少都用到了闭包。

js是一门灵活的脚本语言，函数的实现则起到了决定性作用。理解函数的数据类型、函数的声明、函数划分的作用域、函数内部的上下文环境、函数的参数与返回值、函数调用时的声明上下文对象、声明上下文对象组成的作用域链、以及函数与作用域链作为整体的封闭包装，别乱、是有点多，好吧就这些，是一个合格js程序员必备的素质。

...

...

...

# 累了么 还继续么 :) 

---

























---

#一、即时函数

即时函数是一种可以支持在定义函数后立即执行该函数的语法：

.small[
```javascript
	( function( ){ /* 这里是函数的代码 */ } )();
```
]

这种方式本质上只是一个函数表达式，通常都是匿名的。它为初始化代码提供了一个干净的命名空间。看下咱们自己的代码：

.small[
```javascript
	(function ($) {
    	var List = function () { };
		List.prototype = {
			/* 各种代码...... */
		};
    	var list = new List();
    	list.init();
	})($);
```
]

即时函数可以帮助包装许多要执行的工作，且不会在后台留下任何全局变量。定义的所有变量是即时函数的局部变量，并且不用担心全局空间被临时变量所污染。

.small[
```javascript
	{ 
		init : function(){ /* 初始化代码要调用的内容 */ } 
		/* 其他内容 */
	}.init();
```
]

---

#二、回调函数

函数都是对象，这表示它们可以作为参数传递给其他函数。

.small[
```javascript
	var f1 = function (params) { /* 函数f1的内容... */}
	var f2 = function (callback,params) { 
		/* 函数f2的内容... */
		if(typeof callback === "function") { callback(params); } 
	}
	f2(f1,{a:"a" ,b:"b"})  //f1作f2的参数，在f2中进行回调
```
]

回调函数的应用十分广泛，例如绑定事件、超时处理、自定义库等。

保持函数的通用性、复用性是一个非常好的思想，有时候我们的函数需要处理大数据并返回给外界，其他函数解析这个大数据再进行其他操作（大循环），为了提升效率我们可以在处理大数据时进行回调，这就避免了再次解析的过程，回调也使代码变得简洁、优雅、风骚...

.small[
```javascript
	var findTag = function () {  /* 获取DOM元素，过程很复杂... */ }
	var myStyle = { /* 给对象添加一些样式控制属性 */ };
	myStyle.color = "yellow";
	myStyle.prototype.setColor = function (tag) {
		tag.style.color = this.color;
	}
	findTag(myStyle.setColor);
```
]

---

来挖一下回调函数的作用域。刚才的回调写法其实是有问题的，不能预期运行：
.small[
```javascript
	findTag(myStyle.setColor); 
```
]

这种场景很常见，回调并不仅是一次性的匿名函数或者全局函数，而是维护某一事情对象的方法。如果回调中使用this来引用那个对象的其他属性，那么它在调用时this很可能引用了其他的上下文对象。

所以我们在调用函数时，除了回调的方法外，还会把那个上下文对象传过去，在那个上下文对象的基础上调用方法。

.small[
```javascript
	findTag(myStyle.setColor, myStyle);
```
]

这样的写法不够优雅，换一种方式：

.small[
```javascript
	var findTag = function (callback_obj,callback) {  
		/* 很多操作，别忘了对callback进行一些检测... */
		callback_obj[callback]();  //callback.bind(callback_obj)();
	}
	var myStyle = { };
	myStyle.color = "yellow";
	myStyle.prototype.setColor = function (tag) {
		tag.style.color = this.color;
	}
	findTag(myStyle， "setColor");
```
]

---

#三、返回函数

函数可以作为参数进行回调，也可以作为结果，返回另一个更专门的函数、按需要创建自己的函数等。

.small[
```javascript
	var setup = function () {
		var counts = 0;
		return function() {
			return counts++;
		}
	}
	var next = setup();  //返回函数引用给next
	next();  //执行这个返回的函数
```
]

值得注意的是，返回的函数通常都被其他作用域的变量引用了，这样返回函数的作用域链和外界就变得非常微妙了，其实就是闭包的一个特性。

刚才的例子中，我们每执行一次next函数，setup函数内部的counts都会累加，而next函数所在的作用域是访问不到counts的，因为counts在setup函数内部定义，在setup函数作用域链的最边上，这样就有效保护了counts不被外界干扰。

这样的闭包特性十分适合存储一些私有数据，而这些数据又可以被返回函数访问、返回给外界。

---

再来挖一下返回函数，除了存储私有数据，返回函数还经常执行部分应用。比较洋气的讲，"Curry化"。

有一种场景，我们在频繁的调用一个函数，后来发现这个函数的参数都长得差不多：

.small[
```javascript
	var f = function (x,y,z) { /* 比较复杂的操作 */}
	f(10,11,31);
	f(10,15,33);
	f(10,18);
```
]

如果函数f在调用时极为复杂、特别消耗资源,函数调用时第一个参数基本都不会改变，有没有想过把考虑把第一个参数提取出来？或者把内部某一计算结果缓存起来？

.small[
```javascript
	var f1 = function (x) { 
		/* 只操作某一过程 */
		return function(y,z) {
			/* 剩下的操作放在返回函数里 */
		}
	}
	f = f1(10);
	f(11,31);
	f(15,33);
	f(18);
```
]

如果有可能，只计算函数的某一过程，把剩下的部分返回给其他函数执行，部分应用的例子很多，例如bind的应用，介于篇幅有限这里就不过多深挖了。

---

#四、备忘函数

刚刚提到，我们可以部分应用，将函数的一些重复过程保存下来返回给外界，那能不能将函数的返回结果直接保存下来呢？如果有些函数的开销很大，又经常会调用得到相同的结果，那么考虑缓存是非常有必要的。

除了把结果返回给外界，也可以保存在函数本身上，毕竟函数是对象，可以自定义属性嘛。函数在调用时，先检查有没有缓存结果，如果有就不重新计算了。

.small[
```javascript
	var f = function (params) { 
		if(!f.cache[params]) {
			var rs = {}; 
			/* 很大的开销操作,把结果给rs... */
			arguments.callee.cache[params] = rs; //把结果保存下来，以后使用。
		}
		return arguments.callee.cache[params];
	}
	f.cache = {};
```
]

值得注意的是，如果函数的参数比较复杂，可以自定义一个规则序列化缓存的属性名。这样再次调用函数时，就有可能不做潜在的繁复计算了。缓存了结果的函数被亲切的称为备忘函数。

---

#五、初始化函数

函数可以设置备忘录，缓存自己的执行结果，已被后续使用。函数除了记忆功能，能不能忘记一些事情呢？不会感觉有点天马星空吧...

函数有些时候是可以忘记自己的功能的。当函数有一些初始化工作要做，并且仅需要执行一次，那么适当的忘记一些东西就不是坏事。因为并没有任何理由去执行本可以避免的重复工作是不？

.small[
```javascript
	var f = function (params) { 
		/* 初始化一些操作，我这个函数真够累的... */
		f = function(params) {
			/* 剩下的一些操作，之后都要做的 ... */		
		}
	}
	f();  //调用，执行初始化工作
	f();  //被覆盖了，做我喜欢做的事情，任性。
```
]

函数可以被动态定义，如果创建了一个新函数，并且将其分配给保存了另外函数的同一个变量，那么就以一个新函数覆盖了旧函数。在某种程度上，回收了旧函数指针以指向一个新函数。而这一切发生在旧函数内部，在这种情况下，该函数以一个新的实现覆盖并重新定义了自身。

是挺扯的，函数变身了...值得注意的是如果想变身的函数也被其他地方引用了，那还是老实呆着吧。

---

刚才的初始化函数挖的有点不着调，还是正经的说说初始化吧。当知道某个条件在整个程序生命周期内都不会发生改变的时候，仅对该条件测试一次是有意义的。看下代码：

.small[
```javascript
	var events = {
		addListener : function () {
			if(type window.addEventListener === "function") { /* ...... */ }
			else if (typeof document.attachEvent === "function") { /* ...... */ }
			else { /* ...... */ }
		}
		removeListener : function() { /* ... 几乎一样 ... */ }
		/* ... 其他 ... */
	}
```
]

这个代码效率十分底下，每次调用方法时，都会重复执行相同的检查。当初始化的时候，可以在整个页面生命周期内重定义函数运行方式：

.small[
```javascript
	var events = {
		addListener : null,
		removeListener : null,
		init : function() {
			if(type window.addEventListener === "function") {
				this.addListener = function() { /* ... 代码太多了 ... */ }
				this.removeListener = function() { /* ... 代码太多了 ... */ }
			}
		}
		/* ... 代码太多 没地儿了 就这样吧 ... */
	}
```
]

---

#先这样吧 说到函数的应用还有很多 等分享完对象，在客户端浏览器里在继续...