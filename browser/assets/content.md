layout: true
class: center, middle, master
---
# 客户端 javaScript

.footnote[
       created with [remark](http://github.com/gnab/remark)
]

---
layout: false

从这期开始来说一说客户端（浏览器）的那些事儿，咱们准备走起。

先来看张图：

<img src="images/img1.png" height="300">

这张图中展示了浏览器的各种对象以及相互关系，我们知道浏览器有BOM、DOM，它们是浏览器面向对象的基础。像核心js的作用域链、原型链一般灰长重要。

个人感觉呢，客户端编程有几块重点：
窗口、文档、元素、样式、事件、网络请求、数据存储。
有些是比较基础的，咱们就简单复习一下；某些是高级点的，大家踊跃讨论 :)

---

#一、窗口

第一节先说窗口，来看看最上面的那个window。在浏览器编程中，Window对象是所有客户端js特性和API的主要接入点，它表示web浏览器的一个打开的窗口或窗体，该对象为文档（咱们的页面）提供了一个显示的容器。

当浏览器载入目标文档时，即浏览器创建Window对象的实例，js可以通过window引用该实例，从而进行诸如获取窗口信息、设置浏览器窗口状态或者新建浏览器窗口等操作。同时，window对象提供一些方法产生图形用户界面。

来深入探讨一下窗口的概念：一个web浏览器窗口可能在桌面上包含多个标签页，每个标签页都是独立的“浏览上下文”，每一个上下文都有独立的window对象，而且相互之间互不干扰。每个标签页中运行的js脚本通常并不知道其他窗口页面的存在。

但是窗口并不总是和其他窗口完全没关系 :p

一个窗口中的脚本可以打开新的窗口，当一个脚本这样做时，这样多个窗口就可以互相操作。

HTML文档也可以使用iframe来嵌套多个文档页面，由iframe所创建的嵌套浏览上下文环境是用它自己的window对象所表示的。

对于客户端js来说，窗口、iframe或老的框架frame都是浏览上下文，他们都是window对象。这些嵌套的上下文window对象并不是相互独立的。来具体说说：


---

window对象有一个open方法，可以打开一个新的窗口或标签页。

这个方法有几个参数，第一个是打开新窗口的URL，如果省略那么打开空页面；第二个参数是新打开窗口的名字，如果是程序已知的名字那么就跳转到那个窗口；如果省略会使用”_blank“打开一个新的、未命名的窗口。

iframe元素有个name属性，表示该iframe的window对象会用它作为name属性的初始值。window对象的name属性，也就是他保存的名字是可写的，js可以随意设置它。

其他的参数用于设置窗口的大小、位置、功能菜单等，咱们用的少具体参考文档吧。

.small[
```javascript
	var w = window.open();
	w.alert("新建窗口 调用它的alert");
	w.location = "http://instapay.co.id/";

```
]

在由window.open()方法创建的窗口中，有个opener属性，引用的是打开它的js脚本的window对象。

.small[
```javascript
	w.open().opener === w;
```
]

和open()方法对应的有个close()方法，关闭窗口。即使一个窗口关闭了，代表它的window对象仍然存在。已关闭的窗口会有个值为true的closed属性，它的document会是null，它的方法通常也不会再工作。

---

下面是干货，大家集中注意力：

任何窗口的js代码都可以将自己的窗口引用为window或self。

窗口可以用parent属性引用包含它的窗口window对象。如果一个窗口是顶级的，那么其parent属性引用的就是这个窗口本身即parent==self。如果一个窗口包含在另一个窗口中，而后者又包含在其他窗口中，那么可以使用parent.parent来引用顶级窗口。

top属性是一个通用的快捷方式，它总是引用顶级的窗口。

咱们总结一下：<br/>
  window  自身窗口的上下文环境<br/>
  self 同上 （window.self也是引用同一对象）<br/>
  parent  上一级包含窗口的上下文环境 （parent.parent可以续连）<br/>
  top 多级关系上的顶层属性

iframe元素有个contentWindow属性，表示被嵌入窗口的window对象的引用。相反，window.frameElement表示当前的iframe元素。尽管如此，通常不使用contentWindow属性来获取window对象的引用。

每个window对象都有一个frames属性，它引用自身窗口包含的子窗口。frames属性是一个类数组对象，可以通过数字或名称（name属性）进行索引。

好吧，有了parent 、top 、frames等，咱们可以挖一下js的窗口交互了，也就是各窗口的window对象和它们的属性。

---

设想一个web页面有两个iframe元素，分别引用A、B两个页面，并且这两个页面包含在同一服务器。那么窗体A的脚本定义一个全局变量i，在窗体A中可以用window.i来引用该变量。由于窗口B可以引用窗口A的window对象，因此它也可以引用那个变量i。

<img src="images/img2.png" height="300">

同理，如果窗口A中声明了一个函数f，这个函数在窗口A的window对象的f属性来引用，也可以将这个函数赋值给窗口B中的变量，这样就可以经常在窗口B中调用了。有一点需要注意就是函数的作用域，因为函数是在B中定义声明所以函数的作用域链仍然是B中的。

构造函数也是函数，所以可以在窗口中初始化和使用其他窗口的对象。但内置的类（String、Date等）都会在所有的窗口中自动预定义，不能修改、添加它们。

---

大家都知道，Window对象也称全局对象，这意味着Window对象处于作用域链的顶部，它的属性和方法实际上是全局变量和全局函数。但从技术上讲，并不是这样。web浏览器每次向窗口载入新内容时，他都会开始一个新的js执行上下文，也就是包含一个新创建的全局对象。但是当多个窗口使用时，有一个重要的概念：尽管窗口载入了新的文档，但是引用窗口的window对象还仍然是一个有效的引用。

<img src="images/img3.png" height="260">

事实上，全局对象会在窗口载入新内容时被替换，我们称呼的”Window对象“实际上不是全局对象，而是全局对象的一个代理。每当查询或设置Window对象的属性时，就会在窗口的当前全局对象上查询或设置相同的属性。由于它的代理行为，除了有更长的生命周期之外，代理对象表现得像真正的全局对象。如果可以比较两个对象，那么区分他们会很困难。但是事实上，没有办法可以引用到真正的客户端全局对象。全局对象处于作用域链的顶端，但是window、self、top、parent等全部返回代理对象，window.open()方法也返回代理对象，甚至顶级函数里的this关键的值也都是代理对象，而不是真正的全局对象。

---

说完了窗口以及窗口之间的联系，我们再来看下某个窗口当中的细节，也就是window下面那些有用的对象：

#1、浏览历史

Window对象的history属性引用的是该窗口的History对象。History对象是用来把窗口的浏览历史用文档和文档状态列表的形式表示。

History对象有length属性，表示浏览器历史列表中的元素数量，出于安全原因，js不能访问已经保存的URL。History对象的方法可以对URL列表进行导航：

history.back()    后退

history.forward()    前进

history.go(-2)    后退2步

如果窗口包含了多个子窗口，子窗口的浏览历史会按时间顺序穿插在主窗口的历史中。这意味着在主窗口调用history.back() 可能会导致其中一个子窗口往回跳转到前一个显示文档，但主窗口保留当前状态不变。

---

#2、定位和导航

Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档URL，并定义了方法来使窗口载入文档。

location.href    完整的URL <br/>
location.protocol    当前URL的协议<br/>
location.hostname    当前URL的主机名<br/>
location.port    当前URL的端口号<br/>
location.pathname    当前URL的路径部分<br/>
location.search    当前URL查询参数<br/>
location.hash    当前URL片段标识符

location.assign() 方法可以使窗口载入并显示指定的URL文档，location.replace() 方法类似，但它在载入新文档之前会从浏览器历史中把当前文档删除。

location.reload() 方法可以让浏览器重新载入当前文档。

使浏览器跳转新页面的一种更传统的方法是直接把新URL赋值给location属性：

.small[
```javascript
	location = "http://ssl-h5-test.instarekber.com/";
	location = "../../pages/index/index.html";
	location = "#top";
```
]


---

#3、浏览器厂商和版本信息

Window对象的navigator属性引用的是浏览器厂商和版本信息的Navigator对象。

Navigator对象常见的属性有：<br/>
navigator.appName  浏览器名称 <br/>
navigator.appVersion  浏览器版本  <br/>
navigator.appCodeName  浏览器的代码名称 <br/>
navigator.platform  操作系统

其中比较重要的有：<br/>
language    语言设定  
userAgent    浏览器客户端信息  
onLine    浏览器是否连接到网络

.small[
```javascript
	Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5
	Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53
	Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4
```
]

.small[
```javascript
	Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
	Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
	Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
	Mozilla/5.0 (Linux; Android 4.4.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Version/1.5 Chrome/28.0.1500.94 Mobile Safari/537.36
```
]

---

#4、窗口大小颜色

Window对象的screen属性引用的是该窗口的Screen对象。它提供有关窗口的大小和可用的颜色数量的信息。

screen.width  获取屏幕的垂直分辨率 

screen.height  获取屏幕的垂直分辨率

screen.availWidth  屏幕宽度（不包含任务栏）

screen.availHeight  屏幕高度（不包含任务栏）

screen.screenLeft  浏览器相对于屏幕的X坐标

screen.screenTop  浏览器相对于屏幕的Y坐标

screen.colorDepth  屏幕色深

<br/><br/>

Screen对象感觉没啥说的，大家有补充么 :p

---

#5、错误处理

Window对象的onerror属性是一个事件处理程序，当未捕获的异常传播到调用栈上时就会调用它，并把错误消息输出到浏览器的js控制台上。如果给这个属性赋一个函数，那么发生了错误就会调用它。

onerror处理程序是早期js的遗物，那时语言核心不包含try/catch异常处理语句，现在的代码很少使用它。

.small[
```javascript
	try {
    	if(ver > 8.2) { 
			event.preventDefault(); 
		}
		else if(ver <= 8.2 && ver > 8) { 
			""; 
		}
		else { 
			event.preventDefault(); 
		}
        window.location.href = that.opt.deepUrl;
    } 
	catch (e) {
    	if(that.opt.isAutoAPP) { 
			that.goAPPStroe(); 
		}
    }
```
]

---

由于Javascript是弱类型的语言，所以在catch部分只能catch一次（因浏览器而定），不能像C#这样的语言可以写多个catch，catch不同类型的exception。但是可以用 instanceof ErrorType的方式实现类似的功能。

.small[
```javascript
try { 
	throw new Error("An error occured."); 
} 
catch(error) { 
	if(error instanceof SyntaxError) { alert("解析代码发生语法错误"); } 
	else if(error instanceof EvalError) { alert("eval函数没有被正确执行发生错误"); } 
	else if(error instanceof RangeError) { alert("值超出有效范围发生错误"); } 
	else if(error instanceof ReferenceError) { alert("引用一个不存在的变量发生错误"); } 
	else if(error instanceof TypeError) { alert("变量或参数不是预期类型发生错误"); } 
	else if(error instanceof Error) { alert("用户代码发生错误"); } 
	alert(error.message); 
}
```
]

浏览器不会抛出Error类型的exception异常，所以如果捕获到Error类型的异常，可以确定这个异常是用户代码抛出的，不是浏览器抛出的。

异常捕获肯定有系统开销的。但是不能一概而论，当你的程序没有出现错误，没有执行到catch块的时候，效率的损失可以忽略不计，当执行到异常捕获，当然会很明显的影响。

---

#5、文档

Window对象的document属性引用的是文档对象Document，它表示显示在当前窗口中的文档。Document对象、Element对象十分重要，一会咱们细细展开，这里先做个引子：

在客户端js中，Window对象是以全局对象的代理形式存在于作用域链的最上层，有趣儿的一点是在HTML文档中使用的id属性命名可以成为被脚本访问的全局变量。如果文档包含一个button元素,它的id属性为"okey"，可以通过全局变量okey来引用此元素（window.okey）。

.small[
```javascript
	<button id="okey">按钮</button>
	
	var btn = window.okey;
```
]

需要注意的是，如果Window对象已经具有此名字的属性，比如：history、location或navigator等元素，就不会以全局变量的形式出现，因为这些默认已经占用了。同理，程序里显示声明的变量会隐藏的阻止元素获得window的属性。

window下还有很多属性和方法，咱们大家互动总结一下:

---

<br/><br/>
上半场休息...

---


#二、文档、文档元素

来详细说说DOM，DOM是文档对象模型，它把文档中的内容对象化，是操作HTML文档内容的基础API。

可以把DOM理解为一棵树，树中的每一个节点都代表一个Node对象。来看看图：

<img src="images/img4.png" height="350">

树形的根部是Document节点，代表整个文档；HTML元素的节点是Element节点，文本的节点是Text节点，它们都继承自Node对象。咱们逐层展开：

---

#1、文档中的元素

大多数客户端js程序运行时总是在操作一个或多个文档元素。当程序启动时，可以使用全局变量document来引用Document对象。但是，为了操作文档中的元素，必须通过某种方式获得引用文档元素的Element对象。查询元素有很多方法：

根据id属性 <br/>
根据name属性 <br/>
根据标签名字 <br/>
根据标签集合 <br/>
根据css类 <br/>
根据css选择器 <br/>


<br/>一旦从文档中选取了一个元素，有时需要查找文档中与之在结构上相关的部分：

父元素：parentNode <br/>
兄弟元素：nextSibling、previoursSibling <br/>
子元素：childNodes、firstChild、lastChild

除此之外，文档元素还有nodeType、nodeValue、nodeName属性。

---

#2、元素的属性

属性用于对元素进行一些特殊设置。常用的操作属性API有：

获取属性值： getAttribute()

设置属性值： setAttribute()

判断属性是否存在：hasAttribute()

删除属性：removeAttribute()

H5还在Element对象上定义了dataset属性，该属性指代一个对象，它的各个属性对应于去掉前缀的“data-”属性。
.small[
```javascript
	var typeData = myForm.dataset.type; 
	 
	//<label data-type="coffee"></label>
```
]

<br/>
Node类型定义了attributes属性，它代表元素的所有属性，可以用数字索引访问。当索引attributes对象时得到的值是Attr对象，Attr对象是一类特殊的node，它的name和value属性返回该属性的名字和值。

---

#3、元素的内容

元素的内容可以是指元素标签的HTML字符串、也可以指标签中的纯文本、还可以形容为一个Text节点对象。

可以通过元素的innerHTML属性来返回它的内容。Web浏览器很擅长解析HTML，通常设置innerHTML效率非常高，甚至在指定的值需要解析时效率也是相当不错。但注意，对该属性用“+＝”操作重复追加一小段文本通常效率比较低，因为它既要序列化又要解析。

HTML5还标准化了outerHTML属性，当查询该属性时返回HTML的字符串包含被查询元素的开通和结尾标签。

有时需要查询纯文本形式的元素内容，或者在文档中插入纯文本，标准的方法是用Node的textContent属性来实现



.small[
```javascript
	var para ＝ document.getElementsByTagName("p")[0];
	var text = para.textContent;
	para.textContent = "hello aj";
```
]

textContent和innerText属性非常相似，通常可以互相替换。innerText不返回script元素的内容，它忽略多余的空白。

---

内联的script元素有一个text属性用来获取它的文本，同innerHTML、textContent。浏览器不现实script元素的内容，并且解析器忽略脚本中的尖括号和星号。这使得script元素成为应用程序用来嵌入任意文本内容的一个理想地方。

简单地将元素的type属性设置为某些值（咱们是type="text/template”），就标明了脚本为不可执行的js代码，如果这样，解析器将会忽略该脚本，但该元素将仍然存在于文档树中，它的text属性将返回数据给你。

.small[
```javascript
	<script id="tpl-item" type="text/template">
	......
	...... //具体的代码
	......
	</script>
```
]

.small[
```javascript
	var html = that.dom.tplItem.html();
    that.dom.itemWrapper.html(juicer(html, that.data));
```
]

---

#4、操作文档元素

总结完文档元素、元素的属性和内容，咱们来说下文档对于节点元素的操作，Document类型定义了创建Element和Text对象的方法；Node类型定义了在节点树中插入、删除、替换的方法。

document创建新的Element节点： <br/>
createElement() <br/>
createTextNode()<br/>
createComment() <br/>
createDocumentFragment() <br/>

另一种创建节点的方法是复制已经存在的节点： <br/>
cloneNode() <br/>
importNode() <br/>

一旦有了一个新节点，就可以用Node的方法将他们插入到文档中： <br/>
appendChild() <br/>
insertBefore() <br/>

如果调用这两个方法将已经存在文档中的一个节点再次插入，那个节点将会自动从当前的位置删除并在新的位置重新插入，没有必要显示的删除节点。

除了插入节点还可以删除或替换一个节点： <br/>
removeChild() <br/>
replaceChild() <br/>

---

DocumentFragment是一种特殊的Node，它作为其他节点的一个临时容器。

DocumentFragment是独立的，而不是任何其他文档的一部分。它的parentNode总是为null，但类似Element，它可以有任意多的子节点，可以用appendChild()等方法来操作它们：

.small[
```javascript
	var n = document.getElementById("wapper");
	var f = document.createDocumentFragment();  //创建临时容器
	while(n.lastChild) {
		f.appendChild(n.lastChild);  //注意n中的节点会被自动删除
	}
	n.appendChild(f);
```
]

<br/>来聊一个比较有趣的方法，insertAdjacentHTML()，它由IE引入，将在HTML5中标准化。这个方法可以将任意的HTML标记字符串插入到指定的元素相邻的位置。

<img src="images/img5.png" >

要插入的HTML标记是该方法的第二个参数；相邻的含义依赖于第一个参数的值，可以有以下值之一的字符串：beforebegin、afterbegin、beforeend、afterend。


.small[
```javascript
document.body.insertAdjacentHTML("afterend","<p>this is insertAdjacentHTML</p>");
```
]

---

#5、表单元素

表单以及表单里面的元素比较特殊，这里单独拿出来总结一下：

<br/>如果要明确地选取一个表单元素，除了标准的选取元素的方法外，还可以索引表单对象的elements属性：
.small[
```javascript
	document.forms.address.elements[0];
	document.forms.address.elements.street;
```
]

<br/>input是表单最常见的元素，value属性表示用户输入的文本，通过设置该属性可以显式指定该输入元素的值。
.small[
```javascript
	document.forms.address.elements.street.value = “表单输入域的值”;
```
]

<br/>Textarea元素类似文本输入元素，它允许多行输入，也可以使用value属性。

<br/>表单上传元素的value属性是只读的，以便防止恶意的js程序欺骗用户上传本意不想共享的文件。

---

<br/>单选和复选框都定义了checked属性，一个可读写的布尔值，它指定了元素当前是否选中。表单元素的defaultChecked 属性可返回 checked 属性的默认值。

<br/>Select元素表示用户可以做出选择的一组选项（下拉框），它定义了options属性，是一个包含了多个Option元素的类数组对象。当下拉框被设置为单选时，它的属性selectedIndex指定了哪个选项当前被选中；当下拉框被设置为多选时，要必须遍历options[]数组中的元素，并检测每个Option对象的selected属性值。

除了selected属性，每个Option对象有一个text属性，它指定了在Select元素中的选项所显示的文本字符串；value属性指定了在提交表单时发送到Web服务器的文本字符串，它是可读写的。

---


#6、其他文档特性

Document对象的属性有body、documentElement、forms、images、links等这些特殊的文档元素，此外还定义了一些其他有趣的属性：

cookie属性允许js程序读、写http cookie的特殊属性，具体在后面的数据存储分享。

domain属性允许当Web页面之间交互时，相同域名下互相信任的Web服务器之间写作放宽同源策略安全限制。

lastModified属性表示文档的最后修改时间。

location属性与window的location属性引用同一个Location对象。

referrer属性如果存在值，表示浏览器导航导当前链接的上一个文档，该属性值和HTTP的Referer头信息相同。

title属性表示文档标签title的内容

URL表示当前文档的URL，该属性值与location.href的初始值相同，只是不会变化。

Document对象中还有很多强大的API，咱们期待云萍后续的H5新API分享:)

---

<br/><br/>
下一次 我再给大家分享总结一下 "层叠样式表" 以及 "脚本化文档样式" 

就到这里吧 

