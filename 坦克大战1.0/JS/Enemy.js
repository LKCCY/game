(function(){
	var Enemy = window.Enemy = function(){
		// 初始化坦克
		this.level = 1;
		// 坦克方向 0向上，1向下，2向左，3向右
		this.dir = 1;
		this.init();
		game.enArr.push(this);
		// 信号量控制出生显示
		this.idx = 0;
	}
	Enemy.prototype.init = function(){
		this.w = 32;
		this.h = 32;
		var n = _.random(0,2);
		this.bornArr = [{'x':game.bg.x,'y':game.bg.y},{'x':game.bg.x+6*32,'y':game.bg.y},{'x':game.bg.x+12*32,'y':game.bg.y}];
		this.x = this.bornArr[n].x;
		this.y = this.bornArr[n].y;
		this.speed = 4;
	}
	//渲染
	Enemy.prototype.render = function(){
		if(this.idx <= 5){
			this.born();
		}else{			
			game.ctx.drawImage(game.R['enemy1'],this.dir*32,0,this.w,this.h,this.x,this.y,this.w,this.h);
		}
	}
	// 出生时的动画
	Enemy.prototype.born = function(){
		game.ctx.drawImage(game.R['born'],60,0,30,30,this.x,this.y,30,30);
		this.idx++;
	}
	// 坦克的运动
	Enemy.prototype.move = function(){
		this.kill();
		if(this.dir == 0){
			// 需要加与墙壁的判定
			if(game.map.encheck(this,0,-this.speed)){
				this.changeD();
			}else{				
				this.y -= this.speed;
			}
			if(this.y - this.speed < game.bg.y) this.changeD();
			if(this.y < game.bg.y) this.y = game.bg.y;
		}
		if(this.dir == 1){
			if(game.map.encheck(this,0,this.speed)){
				this.changeD();
			}else{				
				this.y += this.speed;
			}		
			if(this.y + this.speed > game.bg.y + game.bg.h - this.h) this.changeD();
			if(this.y > game.bg.y + game.bg.h - this.h) this.y = game.bg.y + game.bg.h - this.h;
		}
		if(this.dir == 2){
			if(game.map.encheck(this,-this.speed,0)){
				this.changeD();
			}else{				
				this.x -= this.speed;
			}	
			if(this.x -this.speed < game.bg.x) this.changeD();
			if(this.x < game.bg.x) this.x = game.bg.x;
		}
		if(this.dir == 3){
			if(game.map.encheck(this,this.speed,0)){
				this.changeD();
			}else{				
				this.x += this.speed;
			}
			var xmax = game.bg.x + game.bg.w-this.w	
			if( this.x +this.speed > xmax) this.changeD();
			if(this.x  > xmax) this.x = xmax;
		}
	}
	// 转变方向
	Enemy.prototype.changeD = function(){
		var num = this.dir;
		do{
			this.dir =_.random(0,3);
		}while(this.dir == num);
	}
	// 与玩家的碰撞
	Enemy.prototype.kill = function(){
		if(Math.abs(this.x-game.host.x)<32&&Math.abs(this.y-game.host.y)<32){
			this.die();
			game.host.die();
		}
	}
	// 坦克的死亡 
	Enemy.prototype.die = function(){
		game.ctx.drawImage(game.R['tankdie'],this.x,this.y)
		game.enArr.splice(game.enArr.indexOf(this),1);
		game.map.tankAmount--;
		if(game.map.tankAmount == 0){
			console.log('通关了');
			game.map.act ++;
			// 如果小于地图关卡，直接显示通关
			if(game.map.act == 2){
				// 进入通关场景
				game.scene.enter(4);
			}else{
				game.scene.enter(2);
			}
		}
	}

})()