//使用javascript和SVG来绘制饼状图
//创建一个<svg>元素，并在其中绘制一个饼状图
//参数：
// 	  data：用于绘制数字类型的数组，数组每一项都表示饼状图的一个楔
// 	  width，height：SVG图形的大小，单位为像素
// 	  cx，cy，r：饼状图的圆心以及半径
//    colors:一个包含HTML颜色信息的数组，每种颜色代表饼状图每个楔的颜色
//    labels：一个标签数组，该信息说明饼状图中每个楔代表的含义
//    lx，ly：饼状图的左上角
//返回：
//    一个保存饼状图的<svg>元素
//    调用者鼻血将返回的元素插入到文档中

function pieChart(data,width,height,cx,cy,r,colors,labels,lx,ly){
	var svgns = "http://www.w3.org/2000/svg";

	//创建一个<svg>元素，同时指定像素大小和用户坐标
	var chart = document.createElementNS(svgns,"svg:svg");
    chart.setAttribute("width",width);
    chart.setAttribute("height",height);
    chart.setAttribute("viewBox","0 0"+ " " + width + " " + height);

    //累加data的值，以便于指导饼状图的大小
    var total = 0 ;
    var angles = [];
    for(var i = 0; i < data.length; i ++){
    	total += data[i];
    	(function(num){
			angles[num]=data[num]/total*Math.PI*2;
		}(i))
    } 

    //现在计算出饼状图每个分片的大小，其中角度以弧度制计算
	// var angles = [];
	// for(var i = 0; i < angles.length; i++) angles[i]=data[i]/total*Math.PI*2;

	//遍历饼状图的每个分片
	startangle = 0;
	for(var i = 0 ; i < data.length; i++){
		//这里表示楔的结束位置

		var endangle = startangle + angles[i];

		//这里表示楔和圆相交的两个点
		//这些计算公式都是以12点钟方向为0度
		//顺时针方向角度递增
		var x1 = cx + r*Math.sin(startangle);
		var y1 = cy - r*Math.cos(startangle);
		var x2 = cx + r*Math.sin(endangle);
		var y2 = cy - r*Math.cos(endangle);

		//这个标记表示角度大于半圆
		//此标记在绘制SVG弧度组件的时候需要
		var big = 0;
		if(endangle - startangle > Math.PI) big = 1;

		//使用<svg:path>元素来描述楔
		//要注意的是，使用createElementNS()来创建该元素
		var path = document.createElementNS(svgns,"path");

		//下面的字符串包含路径的详细信息
		var d = "M " + cx + "," + cy + //从圆心开始
		        " L " + x1 + "," + y1 + //画一条到（x1,y1）的线段
		        " A " + r + "," + r + //再画一条半径为r的弧
		        " 0 " + big + " 1 " +   //弧的详细信息
		        x2 + "," + y2 +     //弧到（x2，y2）结束
		        " Z";                //当前路径到(cx,cy)结束

		//M表示起点X，起点Y
		//L(直线)起点x，终点y
		/*A(弧线)，共有七个参数：rx，ry，xrotation，flag1，flag2，x，y
			rx，ry指所在椭圆的半轴大小；
			xrotation指椭圆的X轴与水平方向顺时针方向夹角，可以想象成一个水平的椭圆绕中心点顺时针旋转xrotation的角度；
			flag1只有两个值，1表示大角度弧线，0为小角度弧线 
			flag2只有两个值，确定从起点至终点的方向，1为顺时针，0为逆时针
			x，y为终点坐标
		*/
		//Z关闭路径

		//设置<svg:path>元素的属性
		path.setAttribute("d",d);   //设置路径
		path.setAttribute("fill",colors[i]);   //设置楔的颜色
		path.setAttribute("stroke","black"); //楔的外边框为黑色
		path.setAttribute("stroke-width","2");//两个单位宽
		chart.appendChild(path);     //将楔加入到饼状图中

		//当前楔的结束就是下一个楔的开始
		startangle = endangle;

		//现在绘制一些相应的小方块来表示图例
		var icon = document.createElementNS(svgns,"rect");
		icon.setAttribute("x",lx);        //定位小方块
		icon.setAttribute("y",ly + 30*i); 
		icon.setAttribute("width",20);    //设置小方块的大小
		icon.setAttribute("height",20);   
		icon.setAttribute("fill",colors[i]);  //填充小方块的颜色和对应的楔的颜色相同
		icon.setAttribute("stroke","black");  //子外边框颜色也相同
		icon.setAttribute("stroke-width","2");
		chart.appendChild(icon);              //添加到饼状图中

		//在小方块的右边添加标签
		var label = document.createElementNS(svgns,"text");
		label.setAttribute("x",lx + 30);      //定位标签文本
        label.setAttribute("y",ly + 30*i +18);
        //文本样式属性还可以通过css来设置
        label.setAttribute("font-family","sans-serif");
        label.setAttribute("font-size","16");
        //在<svg:text>元素中添加一个DOM文本节点
        label.appendChild(document.createTextNode(labels[i]));
        chart.appendChild(label);         //将文本添加到饼状图中
	}
	return chart;
}









