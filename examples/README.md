http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201502051333.html

我们打算制作一个长方体：长300像素，宽200像素，高100像素。

长方体的面可以分为3组，每一组都有各自的样式。上下左右4个面需要定位在容器的中心，以便于旋转和外移。
左右两个面定位在left: 100px =（(300长 - 100高) / 2），上下两个面定位在top: 50px（(200宽 - 100高) / 2）。


然后要对六个面进行旋转和中心转换。transform的方法和3D立方体的一样，但要注意这是长方体，translate的值是不同的。因为#box的高度是100像素，所以前后两个面要外移50像素。同理，左右两个面要translate 150像素。上下两个面要translate 100像素。

前后外移 高度/2 = 100/2;
左右外移 宽度/2 = 300/2;
上下外移 宽度/2 = 200/2;