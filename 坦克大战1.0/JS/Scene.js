(function(){
	var Scene = window.Scene = function(){
		this.bindEvent();
	}
	// 进入场景的方法
	Scene.prototype.enter = function(num){
		game.act = num;
		switch(game.act){
			case 0 :
				// 图片的数据
				this.w = 512;
				this.h = 448;
				this.y = -this.h;
				this.hy = 244;
				break;
			case 1:
				// 图片的大小
				this.w = 512;
				this.h = 224;
				this.uy = -this.h;
				this.dy = this.h*2;
				// 开启地图
				if(!game.map) game.map = new Map()
				// 控制开始第几关
				game.map.act = 0;
				//玩家生命
				game.life = 3;
				// 控制进入主地图时间
				this.mapframee = 0;
				break;
			case 2:
				//搭建场景
				game.bg = new Bg();
				// 搭建地图,进入场景(测试用)
				// game.map = new Map();
				game.map.enter(game.map.act);
				// 初始化坦克
				game.host = new Host();
				// 将子弹放入数组里面管理
				game.hzdArr = [];
				// 将敌人放入数组；
				game.enArr = [];
				// 控制子弹反射的间隔；
				game.zdframe;
				// 控制坦克的数量；
				game.drNum = game.map.tankAmount;
				// 控制坦克的生成间隔；
				game.drframe = 0;
				break;
			case 3 :
				// 死亡画面
				this.x = 136;
				this.y = 140;
				// 控制重新开始的画面；
				this.startframe = 0;
			break;
			case 4:
				// 通关场景
				var w = 480;
				var h = 320;
				// 缩放比例
				var rate = game.w / w;
				this.w = rate * w;
				this.h = rate * h;
				this.y = game.h - this.h-40;
				this.x = 0;
				// 控制进入主界面的时间
				this.mainframe = 0;
			break;
		}
	}
	// 场景根更新渲染方法
	Scene.prototype.updateAndrender = function(){
		switch(game.act){
			case 0 : 
				game.ctx.fillStyle = 'black';
				game.ctx.fillRect(0, 0, this.w, this.h)
				// 标题逐渐下降
				this.y += 6;
				if(this.y >= 0) this.y = 0;
				game.ctx.drawImage(game.R['menu'],0,this.y)
				// 小坦克
				if(this.y != 0){
					game.ctx.drawImage(game.R['host'],0,0,32,32,140,244+this.y,32,32);
				}else{
					game.ctx.drawImage(game.R['host'],0,0,32,32,140,this.hy,32,32);
				}
			break;
			case 1 :
				game.ctx.drawImage(game.R['menu'],0,0);
				game.ctx.fillStyle = '#504c4c';
				// 灰色矩形
				this.uy += 10;
				this.dy -=10;
				this.uy = this.uy >= 0?0:this.uy;
				this.dy = this.dy <= this.h?this.h:this.dy;
				game.ctx.fillRect(0,this.uy,this.w,this.h);
				game.ctx.fillRect(0,this.dy,this.w,this.h);
				// 进入第三个场景
				if(this.uy == 0){
					game.ctx.font = '22px Arial';
					game.ctx.fillStyle = 'black'
					game.ctx.fillText("第 "+(game.map.act+1)+" 关",218,220);
					this.mapframee++;
				}
				if(this.mapframee == 25) this.enter(2); 
			break;
			// 主游戏界面
			case 2:
				game.ctx.fillStyle = '#504c4c';
				game.ctx.fillRect(0, 0, game.w, game.h);
				// 背景渲染
				game.bg.render();
				// 坦克渲染
				if(game.life) game.host.render();
				// 主子弹放入数组里面进行渲染
				for(var i = 0 ; i < game.hzdArr.length; i++){
					game.hzdArr[i].update();
					game.hzdArr[i]&&game.hzdArr[i].render();
				}
				// 敌人的生成
				if(game.drframe % 60 == 0&& game.drNum!=0){
					new Enemy();
					game.drNum--;
				} 
				// 敌人的渲染
					for(var i = 0 ; i < game.enArr.length; i++){
					game.enArr[i].move();
					game.enArr[i]&&game.enArr[i].render();
				}
				// 地图渲染
				game.map.render();
				// 控制子弹生成和敌人生成的间隙
				game.zdframe++;
				game.drframe++;
				// 显示右边咋项
				this.tip(game.map.tankAmount,game.life,game.map.act);
			break;
			// 死亡画面
			case 3:
				game.ctx.fillStyle = 'black';
				game.ctx.fillRect(0,0,game.w,game.h)
				game.ctx.drawImage(game.R['gameover'],this.x,this.y);
				this.startframe++;
				if(this.startframe == 30){
					clearInterval(game.timer);
					game.start();
				}
			break;
			// 通关画面
			case 4 :
				game.ctx.fillStyle = 'black';
				game.ctx.fillRect(0,0,game.w,game.h);
				game.ctx.drawImage(game.R['通关'],this.x,this.y,this.w,this.h);
				// 日期
				game.ctx.fillStyle = 'white';
				game.ctx.font = '20px 宋体';
				game.ctx.fillText('2017年7月13日',game.w - 150,game.h-15);
				// 标题 
			 	game.ctx.fillStyle = 'white';
				game.ctx.font = '25px 微软雅黑';
				game.ctx.fillText('青 春 下 一 站',20,45);
				this.mainframe++;
				if(this.mainframe == 60){
					clearInterval(game.timer);
					game.start();
				}
			break;
		}
	
	}
	// 绑定事件
	Scene.prototype.bindEvent = function(){
		// 备份this;
		var self = this;
		document.onkeydown = function(event){
			var event = event||window.event;
			switch(game.act){
				case 0 :
					// 选择键盘码
					switch(event.keyCode){
						case 38:
							self.hy = 244;
						break;
						case 40 :
							self.hy = 276;
						break;
						case 13:
							self.enter(1);
						break;
					}
				break;
				// 场景2
				case 2:
					//调用更换坦克方向
					game.host.changeD(event.keyCode);
					// 坦克移动的方法
					switch(event.keyCode){
						case 38:
							if(!game.map.hostcheck(0,-4)&&game.life >0) game.host.goUp();
						break;
						case 40:
							if(!game.map.hostcheck(0,4)&&game.life >0) game.host.goDown();
						break;
						case 37:
							if(!game.map.hostcheck(-4,0)&&game.life >0) game.host.goLeft();
						break;
						case 39:
							if(!game.map.hostcheck(4,0)&&game.life >0) game.host.goRight();
						break;
						// 控制子弹
						case 32 :
							if(!game.zdframe) game.zdframe = 0;
							if(game.zdframe >= (1/game.host.level) *12) {
								if(game.life >0)new Hbullet();
								game.zdframe  = 0;
							}
						break;
						// 测试用
						// case 81 :
						// 	new Enemy();
						// break;
					}
				break;
			}
		}
	}
	// 显示右边杂项
	Scene.prototype.tip = function(n,l,g){
		// 设置小坦克图标的显示位置
		var x = 455;
		var y = 40;
		for(var i = 0 ; i < n;i++){			
			game.ctx.drawImage(game.R['drxb'],x+i%2*16,y+parseInt(i/2)*16);
		}
		// 设置声明值得显示窗口
		var x1 = 455;
		var y1 = 260;
		game.ctx.drawImage(game.R['life'],x1,y1);
		game.ctx.fillStyle = 'black';
		game.ctx.font = 'bold 22px Arial';
		game.ctx.fillText(l,x1+18,y1+32);
		game.ctx.drawImage(game.R['life'],x1,y1+50); 
		// 显示关卡
		var x2 = 455;
		var y2 = 360;
		game.ctx.drawImage(game.R['gqia'],x2,y2)
		game.ctx.fillStyle = 'black';
		game.ctx.font = 'bold 22px Arial';
		game.ctx.fillText(g+1,x2,y2+50);
	}

})()