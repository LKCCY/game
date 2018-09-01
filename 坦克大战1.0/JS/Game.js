(function(){
	var Game = window.Game = function(){
		// 初始化 设置画布大小
		this.h = 448;
		this.w = 512;
		this.init();
		// 设置图片资源管理器
		this.loadPic();
	}
	// 初始化画布
	Game.prototype.init = function(){
		this.dom = document.getElementsByTagName('canvas')[0];
		this.ctx = this.dom.getContext("2d");
		this.dom.height = this.h;
		this.dom.width = this.w;
	}
	// 设置图片资源管理器
	Game.prototype.loadPic = function(){
		this.R = {
			'menu':'./img/menu.gif',
			'host':'./img/host.png',
			'tile':'./img/tile.bmp',
			'host':'./img/host.png',
			'boom':'./img/boom.png',
			'enemy1':'./img/enemy1.png',			
			'enemy2':'./img/enemy2.png',	
			'born':'./img/born.png',
			'tankdie':'./img/tankdie.png',
			'drxb':'./img/drxb.png',
			'life':'./img/life.png',
			'gqia':'./img/gqia.png',
			'gameover':'./img/gameover.png',
			'通关':'./img/通关.png',
		}
		// 总图片数量
		var amount = Object.keys(this.R).length;
		var count = 0;
		for(k in this.R){
			var src = this.R[k];
			this.R[k] = new Image();
			this.R[k].src = src;
			// 备份this
			var self = this;
			this.R[k].onload = function(){
				count++;
				if(count == amount){
					self.start();
				}
			}
		}
	}
	// 提供清屏方法
	Game.prototype.clear = function(){
		this.ctx.clearRect(0, 0, this.w, this.h)
	}
	// 开启游戏
	Game.prototype.start = function(){
		// 开启场景
		game.scene = new Scene();
		// 进入场景备份
		game.scene.enter(0);
		var self = this;
		// 开启定时器
		game.timer = setInterval(function(){
			self.clear();
			// 开启场景的渲染
			game.scene.updateAndrender();
		}, 30)
	}
})()