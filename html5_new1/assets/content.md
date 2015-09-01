layout: true
class: center, middle, master
---
#多媒体和图形编程



---
layout: false
###脚本化音频和视频

HTML5引入的audio和video元素，使用起来和img元素一样简单。对于支持HTML5的浏览器，不再需要使用插件（像Flash）来在HTML文档中嵌入音频和视频：   
.small[
```javascript
     <audio src="backgroud_music.mp3"/>
     <video src="news.mov" width=320 height=240/>
```]
由于各家浏览器制造商未能在对标准音频和视频编解码器支持上达成一致，因此，通常都需要使用source元素来为指定不同格式的媒体源：

<video id="video1" width="420" style="margin-top:15px;"  controls="controls">
    <source src="http://www.w3school.com.cn/example/html5/mov_bbb.mp4" type="video/mp4" />
    <source src="http://www.w3school.com.cn/example/html5/mov_bbb.ogg" type="video/ogg" />
   你的浏览器不支持html5的video标签
</video>

<audio controls="controls">
  <source src="http://www.w3school.com.cn/i/song.ogg" type="audio/ogg">
  <source src="http://www.w3school.com.cn/i/song.mp3" type="audio/mpeg">
你的浏览器不支持html5的audio标签.
</audio>

要注意的是，source元素没有任何内容：没有闭合的'</'source'>'标签，也不需要使用‘/>’来结束它们。
支持audio和video元素的浏览器不会渲染这些元素的内容。而不支持它们的浏览器则会将它们的内容都渲染出来，因此，可以在这些元素中放置后备内容（比如，一个用于调用Flash插件的<object>元素）：

---

.small[
```javascript
<video id="news" width=640 height=480 controls preload>
  <!-- Firefox和Chrome支持的webM格式-->
  <source src="news.webm" type='audio/webm;codecs="vp8,vorbis"'>
  <!-- IE和Safari支持的H.264格式 -->
  <source src="news.mp4" type='videp/mp4;codecs="avc1.42E01E,mp4a.40.2"'>
  <!-- Flash插件作为后备方案 -->
  <object width=640 height=480 type="application/x-shockwave-falsh" data="flash_movie_player.swf">
    <!-- 这里的参数元素用于配置Flash视频播放器 -->
    <!-- 文本是最终的后备内容 -->
    <div>video element not supported and Flash plugin not installed.</div>
  </object>
</video>
```]

   audio和video元素支持一个controls属性。如果设置了该属性（或者对应的JavaScript属性设置为true），它们将会显示一系列播放控件，包括播放、暂停按钮、音量控制等。
   
   除此之外，audio和video元素还提供了API能让脚本控制媒体，使用该API可以实现在Web应用中添加简单的声音效果或者创建自定义音频和视频控制面板。音频和视频控制面板在外观上很大差别，但是两个元素基本共享相同的API（唯一不同的是，video元素还有width和height属性）。
   
---
          
#### Audio()构造函数
在不设置controls属性的情况下，audio元素没有任何视觉外观。正如可以使用Image()构造函数来创建一张屏幕外图片那样，HTML5中的媒体API同样也允许使用Audio()构造函数，并将媒体源URL作为参数，来创建一个屏幕外音频元素：
.small[
```javascript
	new Audio("chime.wav").paly();//载入并播放声音效果
```]

Audio()构造函数的返回值和通过从文档中查询audio元素或者使用document。creatElement('audio')来创建一个新的元素获得的都是同一类对象。video没有构造函数。

不借助插件在浏览器中原声播放音频和视频是HTML5中非常强大的新特性。

下面讨论下如何利用JavaScript API来操控音频和视频流：

###类型选择和加载
   调用canPlayType()方法，可测试一个媒体元素能否播放指定类型的媒体文件，并将媒体的MIME类型（有时需要包含codec参数）传递进去。如果它不能播放该类型的媒体文件，该方法会返回一个空的字符串（一个假值）；反之，会返回一个字符串：“maybe”或“probably”。之所以返回“probably”这样不确定的结果，是因为音频和视频编解码器本身就非常复杂，在没有真正下载并尝试播放指定类型的媒体前很难确定是否真的可以支持播放此类文件：

---
.small[
```javascript
	var a = new Audio();
	if(a.canPlayType("audio/wav")){
	   a.src = "soundeffect.wav";
	   a.paly();
	}
```]  
当设置媒体元素的src属性的时候，加载媒体的过程就开始了（除非将preload设置成“auto”，否则，只会加载少量内容，因此该过程不会持续很长时间）。当设置src属性的时候，如果有其他的媒体文件正在加载或者播放，则会中止它们的加载或者播放过程。如果通过在媒体元素中添加source元素都添加完毕了，因此它也不会开始选择并加载source元素指定的媒体源文件，除非显式的调用load()方法。

###控制媒体播放
<audio>和<video>元素最重要的方法是play()和pause()方法，它们用来控制媒体开始和暂停媒体的播放：
.small[
```javascript
//文档载入完成后，开始播放背景音乐
window.addEventListener("load",function(){
   document.getElementById("music").play();
},false);
```]
设置currentTime属性来进行定点播放，该属性指定了播放器应该跳过播放的时间（单位为秒），可以在媒体播放或者暂停的时候设置该属性。

volume属性表示播放音量，介于0（静音）~ 1（最大音量）之间。将muted属性设置为true则会进入静音模式，设置为false则会恢复之前指定的音量继续播放。

---
playbackRate属性用于指定媒体播放的速度。该属性值为1.0表示正常速度，大于1则表示“快进”，0~1之间的值则表示“慢放”。负值则表示回放，但是目前浏览器还未支持该属性。
要注意的是，currentTime、volume、muted以及playbackRate属性并不只是用于控制媒体播放。如果一个<audio>或者<video>元素有controls属性，它将会在播放器上显示控件，让用户控制媒体的播放。不仅如此，脚本也可以通过查询诸如muted和currentTime这样的属性来得知当前媒体的播放情况。

controls、loop、preload以及autoplay这样的HTML属性不仅影响音频和视频的播放，而且还可以作为JavaScript属性来设置和查询。

controls属性指定是否在浏览器中显示播放控件。设置该属性值为true表示显示控件，反之表示隐藏控件。

loop属性是布尔类型，它指定媒体是否需要循环播放，true表示需要循环播放，false则表示播放到最后就停止。

preload属性指定在用户开始播放媒体前，是否或者多少媒体内容需要预加载。该属性值为“none”则表示不需要预加载数据。为“metadata”则表示诸如时长、比特率、帧大小这样的元数据而不是媒体内容需要加载。其实，在不设置preload属性的情况下，浏览器默认也会加载这些元数据的。preload属性值如果为“auto”则表示浏览器应当预加载它认为适量的媒体内容。

autoplay属性指定当已经缓存足够多的媒体内容时是否需要自动开始播放。将该属性设置为“true”时，告诉浏览器需要预加载媒体内容。

---
###查询媒体状态
<audio>和<video>元素有一些只读属性，描述媒体以及播放器当前的状态：如果播放器暂停，那么paused属性的值就为“true”。如果播放器正在跳到一个新的播放点，那么seeking属性的值就为“true”。如果播放器播放完媒体并且停下来，那么ended属性的值就为“true”（如果设置loop属性值为true，那么ended属性值永远不为“true”）。

duration属性指定了媒体的时长，单位是秒。如果在媒体元数据还未载入前，查询该属性，它会返回NaN。对于像internet广播这样有无限时长的流媒体而言，该属性会返回Infinity。

initialTime属性指定了媒体的开始时间，单位是秒。对于固定时长的媒体剪辑而言，该属性值通常是0。而对于流媒体而言，该属性表示已经缓存的数据的最早时间以及能够回退到的最早时间。当设置currentTime属性时，其值不能小于initialTime的值。

played、buffered、seekable三个属性分别包含媒体时间轴、播放、和缓冲状态的较细粒度师图。played属性返回已经播放的时间段。buffered属性返回当前已经缓冲的时间段，seekable属性则返回当前播放器需要跳到的时间段。（可以使用这些属性来实现一个进度条，显示currentTime、duration以及媒体的播放量和缓冲量。）played、buffered和seekable都是TimeRanges对象。每个对象都有一个length属性以及start()和end()方法。前者表示当前的一个时间段，后者分别反悔当前时间段的起始时间点和结束时间点（单位都是秒）。对于一段常见的连续时间段来说，一般使用start(0)和end(0)。例如，假设媒体文件从开始缓存起中间没有丁点播放发生（跳过一段播放），可以使用如下代码来确定当前缓存内容的百分比：
.small[
```javascript
    var percent_loaded = Math.floor(song.buffered.end(0)/song.duration*100);
```]
---
最后，还有三个属性：readyState、networkState和error，它们包含audio和video元素更加底层的一些状态细节。每个属性都是数字类型的，而且为每个有效值都定义了对应的常量。不过要注意的是，这些常量是定义在媒体对象（或者错误对象）上的。可以按照如下方式来使用一个属性：
.small[
```javascript
    if(song.readyState === song.HAVE_ENOUGH_DATA)song.play();
```]
readyState属性指定当前已经加载了多少媒体内容，以此同时也暗示着是否已经准备好可以播放了。
NetworkState属性指定媒体元素是否使用网络或者为什么媒体文件不使用网络。
当在加载媒体或者播放媒体过程中发生错误时，浏览器就会设置audio或者video元素的error属性。在没有错误发生的情况下，error属性值为null。反之，error的属性值是一个对象，包含了描述错误的数值code属性。
.small[
```javascript
    if(song.error.code === song.error.MEDIA_ERR_DECODE)alert("Can‘t play song:corrupt audio data.");
```]
###媒体相关事件
audio和video都是相对比较复杂的元素————它们不仅要对用户与播放控件交互做出响应，还要对网络活动做出响应，甚至在播放的时候，对播放时间做出响应。还有一些之前介绍过的一些属性来表示它们当前的状态。它们也有很多种类的触发事件。
根据事件触发的先后顺序，总结以下22个媒体相关事件。这些事件不能通过属性来注册时间，只能通过audio和video元素的addEventListener()方法来注册处理程序函数。

---
<img src="pic_1.png" width="90%">

---
<img src="pic_2.png" width="90%">

---
###SVG：可伸缩的矢量图形
SVG是一种用于描述图形的XML语法。一个“SVG”图形是对画该图形时的必要路径的一种精准、分辨率无关（是可伸缩的）的描述。一个简单的SVG文件如下所示：
<!-- SVG图形一开始声明命名空间 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 150 1000 1000"><!-- 图形的坐标系 -->
    <defs><!--设置后面要用到的一些定义-->
        <linearGradient id="fade"><!--将一种渐变色命名为“fade”-->
             <stop offset="0%" stop-color="#008"/><!--深蓝-->
             <stop offset="100%" stop-color="#ccf"/><!--渐变到浅蓝-->
        </linearGradient>
    </defs>
    <rect x="100" y="200" width="800" height="600" stroke="black" stroke-width="25" fill="url(#fade)"/>
</svg>

---
SVG这种语法比较庞大且有一定的复杂度。它不仅可以用于简单的基本图形的绘制以外，还支持任意曲线、文本以及动画的绘制。SVG图形甚至还能整合javascript脚本和CSS样式表来添加行为和展示信息。这里我们将介绍客户端的javascript代码（内嵌在HTML中，而不是SVG中）如何利用SVG动态绘制图形。会有一些SVG例子的展示，但是只会牵涉SVG的基本知识。要了解关于SVG的详细内容，可以参阅SVG的标准文档，该文档比较全面的介绍了SVG。这份文档由W3C负责维护，地址在：http://www.w3.org/TR/SVG/
文档包含了完整的用于SVG文档的文档对象模型。但我们下面的例子，使用的是标准的XML DOM而非SVG DOM绘制SVG图形。

除了IE以外的所有主流浏览器都支持SVG（IE9也将支持）。在最新的浏览器中，可以使用普通的<img>元素来展示SVG图片。而相对早期的浏览器（比如：Firefox3.6）还不支持SVG，需要使用<object>元素：
.small[
```javascript
    <object data="sample.svg" type="image/svg+xml" width="100" height="100"/>
```]
当使用img或者object元素展示SVG图形的时候，SVG就变成了另外一种图片格式了，这种方式对于我们来说是不友好的。更好的方式是直接将SVG图片嵌入到HTML文档中，这样这些图片就可以通过脚本的方式来控制。由于SVG就是一种XML语法，因此可以将它以如下的方式嵌入到XHTML文档中：
http://127.0.0.1:8080/html5_new/demo.xml

这种展示SVG图形的技术除了IE以外的当前浏览器都支持。
HTML5将XML和HTML的区别进一步缩小，允许SVG（和MathML）标记直接在HTML文件中使用，不需要命名空间的声明或者标签前缀：
http://127.0.0.1:8080/html5_new/code/demo1.html
截止撰写本书时，只有最新的浏览器才支持在HTML中直接内嵌SVG。

---
SVG就是一种XML语法，因此画SVG图形其实就是相当于是在使用DOM创建相应的XML元素，自定义一个pieChart()函数，该函数用来创建SVG元素。具体实例如下：
http://127.0.0.1:8080/html5_new/code/demo1.html

这些例子都是使用DOM代码来创建SVG元素并设置元素属性。为了在不完全支持HTML5的浏览器下也能正常工作，该例子使用xml语法来处理SVG，使用SVG命名空间以及createElementNS()这样的DOM方法而不是createElement()。

总结：svg是基于图形的元素，多种图形元素，支持脚本和css，用户交互到图形元素，适合大面积，小数量应用场景。适合静态图片展示，高保真文档查看和打印的应用场景。（比如谷歌地图）

###cancas中的图形
canvas元素自身是没有任何外观的，但是它在文档中创建了一个画板，同时还提供了很多强大的绘制客户端javascript的API。尽管canvas元素在HTML5中才标准化，但实际上它很早就存在了。canvas元素最早是apple在Safari 1.3中引入的，Firefox1.5之后以及Opera 9之后的浏览器都已经支持它了。Chrome的所有版本也都支持它。IE9之前的浏览器也不支持canvas元素。

canvas元素和svg之间一个重要的区别是：使用canvas来绘制图形是通过调用它提供的方法，而使用svg绘制图形是通过构建一棵XML元素树来实现。这两种方式都很强大：两者之间都可以互相模拟。但是，这两者还是不同的，并且各有优势。使用svg绘制图形，可以简单地通过移除相应的元素来编辑图片。而使用canvas来绘制，要移除图片中的元素就不得不把当前的擦除再重新绘制一遍。canvas的绘制API是基于javascript的，并且相对比较简单，不像svg那么复杂。

---
大部分的画布绘制API都不是在canvas元素自身上定义的，而是定义在一个“绘制下文”对象上，获取该对象可以通过调用画布的getContext()方法。调用getContext()方法时，传递一个“2d”参数，会获得一个CanvasRenderingcontext2D对象，使用该对象可以在画布上绘制二维图形。
####画布中的3D图形
在撰写本书时，浏览器提供商正在开始实现canvas元素用于绘制3D图形的API。这些API成为“WebGL”，它是绑定到OpenGL标准API的一个javascript。将“webgl”字符串作为参数传递给画布的getContext()方法可以获得用于绘制3D图形的上下文对象。由于WebGL很庞大，而且也非常复杂，在此就不介绍它的一些底层API：其实Web开发者更倾向于使用封装了WebGL底层API的工具类库而不喜欢直接使用WebGL API.

1、绘制线段和填充多边形
要在画布上绘制线段以及填充这些线段闭合的区域，从定义一条路径开始。路径有许多子路径组成，子路径又是由两个或多个点之间连接而成的线段组成。调用beginPath()方法开始定义一条新的路径，而调用moveTo()方法则开始定义一条新的子路径。一旦使用moveTo()方法确定了子路径的起点，接下来就可以调用lineTo()方法来将该点与新的一个点通过直线连接起来。如下代码定义一条包含了两条线段的路径：
.small[
```javascript
    var canvas = document.getElementById("my_canvas");
    var c = canvas.getContext('2d');
    c.beginPath();     //开始一条新路径
    c.moveTo(100,100);	//从（100,100）开始定义一条新的子路径
    c.lineTo(200,200);	//从(100,100)到(200,200)绘制一条线段
    c.lineTo(100,200);	//从(200,200)到(100,200)绘制一条线段
```]

---
上述代码只是简单地定义一条路径，并没有在画布上绘制任何图形。要在路径中绘制（或者勾勒）两条线段，可以通过调用stroke()方法，要填充这些线段闭合的区域可以通过调用fill()方法：
.small[
```javascript
    c.fill();   //填充一个三角形区域
    c.stroke(); //绘制三角形的两条边
```]
要注意的是上述定义的子路径是“未闭合”的。它只包含两条线段，线段的终点并没有和起点汇合。也就是，它并没有闭合一个区域。对于这样“未闭合”的子路径，调用fill()方法填充的时候，会假设子路径的终点和子路径的起点是连接起来。这就是为什么，例子中填充了一个三角形，但是只是勾勒了三角形的一条边。想要勾勒出上述三角形的三条边，可以调用closePath()方法将子路径的起点和终点真正连接起来。例子：
http://127.0.0.1:8080/html5_new/code/canvas.html

关于stoke()方法和fill()方法还有另外非常重要的两点。第一点是：这两个方法都是作用在当前路径上的所有子路径。
第二点：是stroke()方法和fill()方法都不更改当前路径。可以调用fill()方法，但是之后调用stroke()方法时候当前路径不变。完成一条路径后要再重新开始另一条路径，必须要记得调用beginPath()方法。如果没有调用beginPath()方法，那么之后添加的所有子路径都是添加在已有路径上，并且有可能重复绘制这些子路径。

使用moveTo()、lineTo()和closePath()方法绘制规则多边形，例子：
http://127.0.0.1:8080/html5_new/code/canvas.html

---
要注意的是上述例子绘制了一个内部包含正方形的六边形。正方形和六边形是两条独立的子路径，但它们互相重叠。当出现该情况（或当单条子路径与自身相交）时，画布需要能够确定哪些区域在路径里面，哪些在外面。画布会采用“非零绕数原则”测试来判断它们。在上述例子中，由于六边形和正方形绘制的方向不同：六边形的顶点是沿着顺时针方向来连接的，而正方形顶点则是沿着逆时针连接的，因此根据“非零绕数原则”，对于内部的正方形不进行填充。换句话说，如果正方形也沿着顺时针方向连接的话，调用fill()方法的时候就会对正方形也进行填充了。

####非零绕数原则
要检测一个点P是否在路径的内部，使用非绕零绕数原则：想象一条从点P出发沿着任意方向无限延伸（或者延伸到路径所在的区域外某点）的射线。现在从0开始初始化一个计数器，然后对所有穿过这条射线的路径经行枚举。每当一条路径顺时针方向穿过射线的时候，计数器就加1；反之，就减1.最后，枚举完所有的路径之后，如果计数器的值不是0，那么就认为P是在路径内。反之，如果计数器的值为0，则认为P在路径外。

2、图形属性
上边例子中，用了fillStyle、strokeStyle以及lineWidth属性。这些属性都是图形属性，分别指定了调用fill()和stroke()时候要采用的颜色以及调用stroke()方法绘制线段时的线段宽度。要注意的是，这些参数不是传递给fill()和stroke()方法的，而是作为画布的通用图形状态。画布API中在CanvasRenderingContext2D对象上定义了15个图形属性。

---
<img src="pic3.png" width="90%">
<img src="pic4.png" width="90%">

---
因为画布API在上下文对象上定义图形属性，所以你也许试图多次调用getContext()方法来获取多个上下文对象。如果可以这样，能够在每个上下文中定义不同的属性：在每个上下文中，就好像拥有了不同的画笔，将会绘制出不同的颜色，或者不同的宽度的线段。遗憾的是，在画布上不能这样，每个canvas元素只有一个上下文对象，因此每次调用getContext()方法都会返回相同的canvasRenderingContext2D对象。

3、画布的尺寸和坐标
canvas元素的width和height属性和对应的画布对象的宽度以及高度属性决定了画布的尺寸。画布的默认坐标系是以画布最左上角为坐标原点（0，0）。越往右X轴的数值越大，越往下Y轴的数值越大。画布上的点可以使用浮点数来指定坐标，但是它们不会自动转换成整型值————画布采用反锯齿的方式来模拟部分填充的像素。

画布的尺寸是不能随意更改的，除非完全重置画布。重置画布的width属性或者height属性（哪怕重置的时候属性值不变），都会清空整个画布，擦除当前的路径并且会重置所有的图形属性（包括当前的变换和裁剪区域）为初始状态。
默认情况下，canvas会按照它设置的HTML width和height属性值来显示画布大小（以css像素为单位）。但是，和其他html元素一样，canvas元素还可以通过css的width和height样式属性来设置他的屏幕显示大小。如果指定画布的屏幕显示大小和它的实际尺寸不同，那么画布上所有的像素都是会自动缩放以适合通过css属性指定的屏幕显示尺寸。画布的屏幕显示大小不会影响画布位图的css像素或者硬件像素的个数，它的缩放是采用图片缩放方式处理的。如果屏幕显示尺寸要远远大于画布的实际尺寸，那么会导致像素化图形。这个问题需要图形设计师去考虑，和画布编程无关。

---
4、坐标系变换
画布中一些特定的操作和属性的设置（诸如抽取原始像素值以及设置阴影偏移量）都使用默认坐标系。然而除了默认坐标系之外，每个画布还有一个“当前变换矩阵”，作为图形状的一部分。该矩阵定义了画布的当前坐标系。当指定了一个点的坐标后，画布的大部分操作都会将该点映射到当前的坐标系中，而不是默认的坐标系。

通过调用setTransform方法能够直接设置画布的变换矩阵，但是通过转换、旋转和缩放操作更容易实现坐标系变换。调用translate()方法只是简单地将坐标原点进行上、下、左、右移动。调用rotate()方法会将坐标轴根据指定角度（画布API总是以弧度制来表示角度。要将角度制转换成弧度制，可以通过Math.PI来对180进行乘除来实现）进行顺时针旋转。调用scale()方法实现对X轴或者Y轴上的距离进行延长和缩短。
下面举个坐标系变换例子：

http://127.0.0.1:8080/html5_new/code/canvas.html

5、绘制和填充曲线

路径由子路径组成，子路径又由连接的点组成。在上边定义的路径中，那些点是通过直线段来连接的，但是点与点之前并不总是通过直线段连接的。canvasRenderingContext2D对象定义了一些方法，这些方法用于在子路径中添加新的点，并用曲线将当前点和新增的点连接起来。

arc(),此方法实现在当前子路径中添加一条弧。包含6个参数：圆心的X、Y坐标、圆的半径、弧形的起始和结束的角度以及弧形的方向（顺时针还是逆时针）。

---
arcTo()，绘制一条直线和一段圆弧。绘制的圆弧有指定的半径并且和当前点到P1的直线以及经过P1和P2的直线都相切。当指定的半径为0时，此方法只会绘制一条从当前点到P1的直线。而当半径值非零时，此方法会绘制一条从当前点到P1的直线，然后将这条直线按照圆形形状变成曲线，一直到它指向P2方向。

还有bezierCurveTo()、quafraticCurveTo()用来花贝塞尔曲线。

最后还有很多相关的api，例如画矩形的rect()、颜色、透明度、渐变、图案、文本、裁剪、阴影、图片、合成、像素操作，可查找canvas的API，直接利用。




























