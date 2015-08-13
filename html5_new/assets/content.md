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
当使用img或者object元素展示SVG图形的时候，SVG就变成了另外一种图片格式了，这种方式对于我们来说是不友好的。更好的方式是直接将SVG图片嵌入到HTML文档中，这样这些图片就可以通过脚本的方式来控制。由于SVG就是一种XML语法，因此可以将它以如下的方式嵌入到XHTML文档中：http://127.0.0.1:8080/html5_new/demo.xml

---


























