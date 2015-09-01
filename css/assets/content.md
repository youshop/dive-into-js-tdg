layout: true
class: center, middle, master
---
# 脚本化 css

.footnote[
       created with [remark](http://github.com/gnab/remark)
]

---
layout: false

今天给大家说说脚本化css：

有时候js程序对css会非常感兴趣，例如创建一个可以伸缩的列表，在里面用户自己控制显示的信息。脚本化css启用了这一视觉效果，通常，通过css定义不同的效果，用js程序去控制效果的显示流程。

在谈脚本化之前，咱们先总结一下css有用的属性，以便后期改变它们：
<br/><br/><br/>

在之前的分享时，我曾提到在DOM获取指定元素时，可以通过css选择器，例如：

.small[
```javascript
	element = document.querySelector('#selectors');
	elements = document.querySelectorAll('div.foo');
	elements = document.querySelectorAll('#page div:first-of-type');
```
]

css的一个核心特性就是能向文档中的一组元素类应用某些规则，利用css可以创建易于修改和编辑的规则，并且能很容易地将其应用到你定义的所有元素。

首先，来总结一下css选择器，使用css选择器获取元素时，元素表达什么样的样式、有哪些可能要改变，一目了然。

---

#一、css选择器

1、第一类，常用选择器：
<br/>E,F  { ... }
<br/>E F  { ... }
<br/>E > F  { ... }
<br/>E + F  { ... }
<br/>E ~ F  { ... }


2、第二类，属性选择器：
<br/>E[att]  { ... }
<br/>E[att=val]  { ... }
<br/>E[att~=val]  { ... }
<br/>E[att*=val]  { ... }
<br/>E[att^=val]  { ... }
<br/>E[att$=val]  { ... }

3、第三类，伪选择器：

这里重点说说伪选择器，利用伪类和伪元素可以为文档中不一定具体存在的结构指定样式，或者为某些元素的状态所指示的幻象类指定样式。

1、伪元素选择器：
<br/>:first-line  { ... }
&nbsp;&nbsp; :first-letter  { ... }
<br/>:after  { ... }
&nbsp;&nbsp; :before  { ... }

---

2、结构性伪类常用选择器
<br/>:root  { ... }
<br/>:not()  { ... }
<br/>:empty  { ... }
<br/>:target  { ... }

3、后代伪类选择器
<br/>:first-child  { ... }
<br/>:last-child  { ... }
<br/>:nth-child(n)  { ... }
<br/>:nth-last-child(n)  { ... }
<br/>:first-of-type  { ... }
<br/>:last-of-type  { ... }
<br/>:nth-of-type(n)  { ... }
<br/>:nth-last-of-type(n)  { ... }
<br/>:only-child  { ... }
<br/>:only-of-type  { ... }
<br/>:empty  { ... }

---

4、结构性伪类UI选择器
<br/>:hover  { ... }
<br/>:active  { ... }
<br/>:focus  { ... }
<br/>:enabled  { ... }
<br/>:disabled  { ... }
<br/>:read-only  { ... }
<br/>:read-write  { ... }
<br/>:checked  { ... }
<br/>:default  { ... }
<br/>:indeterminate  { ... }
<br/>::selection  { ... }
<br/>:required  { ... }
<br/>:optional  { ... }
<br/>:invalid  { ... }
<br/>:valid  { ... }
<br/>:in-range  { ... }
<br/>:out-of-range  { ... }


---


#二、css框模型

再来说说框模型，元素是文档结构的基础，在css中，每个元素都被浏览器渲染生成了一个包含了内容的框。

不同的元素显示的方式会有所不同，通常可以分为：块级元素和行内元素。

块级元素在视觉上被格式化为块的元素，最明显的特征就是它默认在横向充满其父元素的内容区域，而且在其左右两边没有其他元素，即块级元素默认是独占一行的。

<img src="images/1.png" />
<br/>如图：块级元素可设置width、height属性，还有margin、padding。

---

<br/>行内元素不形成新内容块，即在其左右可以有其他元素，多个相邻的行内元素排列在同一行里，直到一行排列不下，才会新换一行。行高设置了多行间的距离，它定义了该元素中基线之间的最小距离。行高与文字的大小计算值之差分为两半，分别加到一个文本行内容的顶部和底部。

<img src="images/2.png" width="380" />
<br/>如图：不能设置行内元素的width、height属性，竖直方向的margin、padding也不会产生效果。

块级元素和行内元素可以通过display属性进行切换，此外display还可以设置为inline-block或其他值。inline-block后的元素将呈递为行内元素，但是元素的内容作为块级元素渲染。也就是说应用此特性的元素呈现为行内元素，和周围元素保持在同一行，但可以设置宽度和高度等块元素的属性。inline-block后的元素可以理解为：一个格式化为行内元素的块容器。

---

元素的框模型是文档布局的基础，总结完咱们来聊聊css一个大的领域，网页布局：

#三、css网页文档布局

我提一个概念，大家讨论一下：“文档流”。什么是文档流？网页中的文档流有啥用？

"流"一般是指输入输出的形式，我觉着“文档流”可以理解为：代码中写入的文档元素、元素被浏览器渲染后的显示样式。

css布局其实就是根据页面文档中的元素，对其整体的显示方式进行格式化。布局有很多中方式，神马固体布局、液态布局、弹性布局、栅格布局、响应式布局、瀑布流布局等，咱们以后有时间具体聊聊这些布局，这里先总结一下布局常用的技术点和属性设置。

在默认情况下，文档中的元素会按照文档流中的顺序，从上到下的解析元素，元素中的块级元素铺满整行，高度根据子元素的内容自适应取值。浏览器会默认的渲染一些元素的margin、padding值。我们除了设置元素的width、height、margin、padding以及border，还有哪些属性可以改变文档流呢？或者说还有哪些属性可以进行网页布局呢？大家踊跃讨论...

在早期实现css布局时，有两大神器方法：定位、浮动。那是一个css蓬勃发展的年代，通过设置这两个属性，特别是定位中的一些属性，可以使元素完全脱离文档流，真可谓想去哪去哪；由于网页中内容的不定性，为了元素能有自适应的高度，浮动的应用被深挖了出来，一时间浏览器渲染的bug、程序员代码的bug，可以说网页布局的工作痛并快乐着。

---

咱们言归正传，说说定位，因为比较基础这里只简单总结，大家多讨论补充：

position： 定位方式，取值有relative、absolute、fixed、static、inherit

top、right、bottom、left： 定位后元素的偏移量,也可以是负值。

z-index： 元素的Z轴，堆叠顺序,也可以是负值。

overflow： 内容溢出时采取的措施，取值有hidden、scroll、auto、visible、inherit。

clip： 剪裁绝对定位元素，取值 rect (top, right, bottom, left)

最常见的定位布局应用是父元素相对定位后子元素针对父元素的位置进行绝对定位，或者元素针对文档固定定位。

有一点需要注意的是这两种定位方式会使得元素完全脱离文档流，通过z轴设置他们的显示范围，但是呢必须指定他们的偏移量，默认是auto而不是0。

---

再来说说浮动，浮动最初是为了文字环绕图片所设计的，主要针对行内元素，后来演变为自适应的布局。

设置了浮动的元素比较特殊，它们虽然脱离了文档流但只要清除得当还是会回来的。咱们总结一下：

float： 浮动形式，取值有left、right、none

clear： 清除浮动，取值有left、right、both、none

浮动的大部分不可预计的问题也是因为没有清除而引起(浮动具有流动性)，如果是为了自适应高度而浮动元素，那么当你不能准确把握元素高度和位置时一定要及时清除那个浮动元素。

浮动加margin的应用可以使元素布局十分灵活，但是呢现在网页布局的技术有很多种，如果不是解决文字环绕问题，尽量走正路:p

除了上面总结的属性，还有一些可以帮助改善布局：

visibility： 元素是否可见，取值有visible、hidden、collapse、inherit

display： 元素框属性，咱们来深挖一下这个属性...


---

1、display最基础的属性值有：block、inline、inline-block、none；

这些属性很基础，都是常见的框模型形式。提两个问题大家讨论下，inline-block和float在很多方面很像，他们有什么区别，怎么应用合适？none和visibility的hidden呢，又有什么区别？

2、display弹性盒模型属性值：flex

其相关的属性还有：flex-direction、ustify-content、align-items、flex-wrap、flex-flow
<br/>其子元素相关的属性有：flex、order、align-self
<br/>这些属性比较杂，名字起的也乱，主要是记住布局的思路，平时尽量多用用就熟了。

3、display表格模型属性值：table、inline-table、table-row、table-column、table-cell
<br/>这些属性最常用的是table-cell，模拟元素为表格单元格形式呈现。单元格有一些比较特别的属性，例如不定高元素的垂直居中对齐，关联伸缩等。

与其他一些display属性类似，table-cell同样会被其他一些布局属性破坏，例如float, position，所以，在使用display:table-cell与float:left或是position:absolute属性尽量不用同用。设置了display:table-cell的元素对宽度高度敏感，对margin值无反应，响应padding属性，基本上就是活脱脱的一个td标签元素了，而且该元素将会自动在自身周围生成所需的匿名table对象。

像table一样display还有一个属性值是list-item，设置了这个值后元素会像列表一样显示。

---

文档布局的属性通常都是块级元素，咱们再来总结一下块里的文字：

#四、css文字设置

1、font-size： 字体尺寸，取值：small、px、em、%...

2、line-height： 行间的距离，取值normal、px、em、%...

3、font-style： 字体风格，取值normal、italic、oblique

4、font-weight： 文本粗细，取值normal、bold、bolder、lighter

5、text-align： 横向对齐方式，取值left、right、center、justify

6、vertical-align： 垂直对齐方式，取值baseline、super、top、text-top、middle、text-bottom、bottom、sub

7、text-indent： 首行缩进，取值px、em、%...

8、white-space： 空白换行，取值normal、pre、nowrap、pre-wrap、pre-line

9、word-break： 断字点换行，取值normal、break-all、keep-all

10、word-wrap： 长单词换行，取值normal、break-word

11、text-overflow： 文本溢出，取值clip、ellipsis

12、letter-spacing： 字符间的空白，取值normal、px、em、%...

---
<br/><br/>
总结完这些css属性后，咱们可以愉快的聊聊怎么脚本化这些属性了。


<br/><br/><br/><br/>
需要休息么？


---

#五、脚本化元素样式

脚本化最直截了当的方法就是更改单独的文档元素样式，每个文档元素都有一个style属性，我们可以通过js对其进行读写。style属性的值不是字符串而是一个对象，该对象的属性代表了在文档中通过style指定的css属性。


.small[
```javascript
	var obj = document.getElementById("obj");
	alert(obj.style);
	obj.style.fontSize = "18px";
	obj.style.marginLeft = leftMargin + “px”;
```
]

文档元素的style属性是它的内联样式，它覆盖在样式表中的任何声明。当读取属性时，脚本只能返回通过style属性设置的值，否则即使样式表中有定义也会得到一个空字符串。当获取复合属性时可以使用style对象的cssText属性，当然也可以使用元素的getAttribute()。

浏览器窗口对象window有个getComputeStyle()方法，可以获得一个元素的计算样式。计算样式虽然是只读的，但可以获取在样式表中定义的值。此方法需要一个参数即元素的引用，另一个参数通常为空，除非要应用伪类设置。它返回一个样式对象，这个对象代表了应用在指定元素上的所有样式。

.small[
```javascript
	var size = parseInt(window.getComputeStyle(obj,"").fontSize);
	obj.style.fontSize = size*2 + "px";
```
]


---

#六、脚本化css类

除了脚本化各别元素样式外，还可以脚本化一类元素，即元素的class属性值。

文档元素可以有多个css类名，class属性保存了一个用空格隔开的类名列表。className属性是一个容易误解的名字，不如classNames好理解。

.small[
```javascript
	.color1 { background-color: #CC3; color: #333; }
	.color2 { background-color: #99F; color: #666; }
	.color3 { background-color: #FC6; color: #999; }
```
]

h5中为每个元素定义了一个classList属性，该属性值是一个类数组的只读对象，它包含了元素的单独类名。此外，更重要的是它还定义了add()、remove()、toggle()、contains()方法，从名字上大家应该能体会这些不错的操作。

.small[
```javascript
	var list = document.getElementById("obj").classList;
	list.add("color1");
	list.toggle("color2");
	if(list.contains("color3")) {
		list.remove("color3");
	}
```
]


---

#七、脚本化样式表

最后来说说脚本化样式表，在脚本化整个样式表时，可以使用两类对象：

第一类是元素对象，由style标签或link标签表示，这两种元素包含或引用样式表。这些是常规的文档元素，可以使用像getElementById这样的方法引用他们，然后用DOM中的API去操作它们，例如innerText等。

第二类是浏览器宿主环境定义的文档style对象，它表示样式表本身，即document.styleSheets，该属性是一个只读的类数组对象，它包含的对象表示与文档关联在一起的样式表。

.small[
```javascript

	<link href="../../lib/base.css" type="text/css" rel="stylesheet" />
	
	<style> ...... </style>
	
	
```
]

了解了这两类对象，来看看它们经常做什么。

1、控制样式表的开闭

这两类对象都定义了一个在js中可以读写的disabled属性，如果该属性为true，引用的样式表就会被浏览器关闭忽略。


.small[
```javascript
	document.styleSheets[0].disabled = true;
	document.getElementsByTagName("style")[0].disabled = true;
```
]

---

2、创建新样式表

创建新样式表其实很简单，只需要用DOM的方法创建一个style元素，将其插入到文档的头部，然后用其innerHTML属性来设置样式的内容。

.small[
```javascript
	var styleElt = document.createElement("style");
	styleElt.innerHTML = "body { background-color: #FC6; }";
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(styleElt);
```
]

<br/>

3、操作样式表具体的规则

浏览器也定义了用来查询、插入、删除样式表规则的API。直接操作样式表通常没什么意义，典型地，相对编辑样式表或增加新规则而言，让样式表保持静态并对元素的className属性编程更好；另一方面，如果允许用户完全控制页面上的样式，可能就需要动态操作了：

每一个样式表对象都有一个cssRules[]数组属性，它包含样式表的所有规则，包括如@import和@page等指令。每一个数组中的值是一个样式规则对象，样式规则对象有两个方便的属性selectorText、cssText，前者表示此规则的选择器、后者表示此规则的文本表示形式。

.small[
```javascript
	var rule = document.styleSheets[0].cssRules[0];
	alert(rule.cssText);
	alert(rule.selectorText);
```
]

---

除了获取样式表中已经存在的规则，也能向样式表添加和删除规则。标准的API接口定义了insertRule()和deleteRule()两个方法：

.small[
```javascript
	var sheet = document.styleSheets[0];
	var rules = sheet.cssRules;
	sheet.insertRule("span { color:#666;}",rules.length);
	sheet.deleteRule(rules.length-1);
```
]


<br/><br/>

这一期先到这吧，本来还想说说动画的，时间有限以后单拿出来分享吧。

