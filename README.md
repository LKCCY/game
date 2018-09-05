# canvas 坦克大战
![](https://github.com/LKCCY/game/blob/master/images/13.png)
## 简介
+ 使用canvas和JS面向对象
+ 4个游戏场景：开始页面，游戏页面，通关页面，失败页面
+ 2个游戏关卡：最大还原经典画面
+ 6个类：游戏类，场景类，坦克类，敌机类，子弹类，地图类
### 游戏关卡
![](https://github.com/LKCCY/game/blob/master/images/13.png) ![](https://github.com/LKCCY/game/blob/master/images/12.png)
### 游戏场景
![](https://github.com/LKCCY/game/blob/master/images/11.png) ![](https://github.com/LKCCY/game/blob/master/images/14.png) 
### 主要碰撞检测
+ 坦克与地图的碰撞
![](https://github.com/LKCCY/game/blob/master/images/u1.png)
```
       if(b1<t2 || l1>r2 || t1>b2 || r1<l2){ 
        // 没碰上
                }else{  
                    //碰撞
                }  
```

+ 坦克与坦克的碰撞
```
//坦克和敌人的x，y的差值均小于坦克的宽度（32）则碰到了
let xVal = Math.abs(tank.x - bonus.x),
    yVal = Math.abs(tank.y - bonus.y);

if (xVal < 32 && yVal < 32) {
    //碰撞了
}
```
# JQ 2048
