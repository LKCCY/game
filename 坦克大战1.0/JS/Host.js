(function(){
	var Host = window.Host = function(){
		//  初始化主坦克信息
		this.init();
		// 坦克方向 0向上，1向下，2向左，3向右
		this.direction = 0;
		//坦克的位置
		this.x = game.bg.x + 32*4;
		this.y = game.bg.y + game.bg.h - this.h;
	}
	// 初始化主坦克信息
	Host.prototype.init = function(){
		// 坦克等级（子弹初始化的继承）
		this.level = 1;
		//有无防护
		this.defend = 1;
		// 坦克的宽高
		this.w = 32;
		this.h = 32;
		// 控制出生的信号量
		this.idx = 0;
	}
	// 坦克渲染
	Host.prototype.render = function(){
		if(this.idx <= 15 ){
			this.born();
		}else{
			game.ctx.drawImage(game.R['host'],this.direction*this.w,0,this.w,this.h, this.x,this.y,this.w,this.h);
		}
	}
	// 转换方向的方法(方向任何时候可以转变，但移动需要判定条件)
	Host.prototype.changeD = function(num){
		switch(num){
			case 37:
				this.direction = 2;
			break; 
			case 38:
				this.direction = 0;
			break; 
			case 39:
				this.direction = 3;
			break; 
			case 40:
				this.direction = 1;
			break; 
		}
	}
	// 移动的方法
	Host.prototype.goUp = function(){
		this.y -= 4;
		this.y = this.y <= game.bg.y?game.bg.y:this.y;
	}
	Host.prototype.goDown = function(){
		this.y += 4;
		this.y = this.y >= game.bg.y + game.bg.h - this.h?game.bg.y + game.bg.h - this.h:this.y;
	}
	Host.prototype.goLeft = function(){
		this.x -= 4;
		this.x = this.x <= game.bg.x? game.bg.x:this.x;
	}
	Host.prototype.goRight = function(){
		this.x += 4;
		var xmax = game.bg.x + game.bg.w-this.w
		this.x = this.x >= xmax?xmax:this.x;
	}
	//死亡的方法
	Host.prototype.die = function(){
		game.life --;
		game.ctx.drawImage(game.R['tankdie'],this.x,this.y);
		if(game.life > 0){
			game.host = new Host();
		}else{
			game.scene.enter(3);
		}
	}
	// 出生时的方法
	Host.prototype.born = function(){
		game.ctx.drawImage(game.R['born'],60,0,30,30,this.x,this.y,30,30);
		this.idx++;
	}
})()