(function(){
	var Hbullet = window.Hbullet = function(){
		// 子弹等级等于坦克等级 
		this.level = game.host.level;
		// 根据坦克方向初始化子弹
		this.init();
		// 放入场景数组进行管理
		game.hzdArr.push(this);
	}
	Hbullet.prototype.init = function(){
		// 0向上，1向下

		if(game.host.direction == 0){
			this.w = 4;
			this.h = 8;
			this.x = game.host.x+14;
			this.y = game.host.y -8 ;
			this.dir = game.host.direction;
		}
		if(game.host.direction == 1){
			this.w = 4;
			this.h = 8;
			this.x = game.host.x+14;
			this.y = game.host.y + 32;
			this.dir = game.host.direction;
		}
		// 2 向左，3向右	
		if(game.host.direction == 2){
			this.w = 8;
			this.h = 4;
			this.x = game.host.x - 8;
			this.y = game.host.y + 14;
			this.dir = game.host.direction;
		}
		if(game.host.direction == 3){
			this.w = 8;
			this.h = 4;
			this.x = game.host.x + 32;
			this.y = game.host.y + 14;
			this.dir = game.host.direction;
		}
	}
	// 子弹渲染的方法
	Hbullet.prototype.render = function(){
		game.ctx.fillStyle = '#eee';
		if(this.dir == 0) game.ctx.fillRect(this.x, this.y, this.w, this.h);
		if(this.dir == 1) game.ctx.fillRect(this.x, this.y, this.w, this.h);
		if(this.dir == 2) game.ctx.fillRect(this.x, this.y, this.w, this.h);
		if(this.dir == 3) game.ctx.fillRect(this.x, this.y, this.w, this.h);
	}
	// 子弹更新的方法
	Hbullet.prototype.update = function(){
		var self = this;
		// 先检测可以杀死敌人吗
		for(var i = 0 ; i < game.enArr.length;i++){
			game.enArr[i]&&this.killen(game.enArr[i]);
		}
		// 先判断与墙壁撞到了吗
		if(this.dir == 0){
			if(game.map.bcheck(self,0,-8)){
				this.die();
			}else{				
		 		this.y -= 8;
			}
		}
		if(this.y <= game.bg.y) this.die();
		if(this.dir == 1) {
			if(game.map.bcheck(self,0,8)){
				this.die();
			}else{				
		 		this.y += 8;
			}
		}
		if(this.y >= game.bg.y + game.bg.h - this.h) this.die();
		if(this.dir == 2) {
			if(game.map.bcheck(self,-8,0)){
				this.die();
			}else{				
		 		this.x -= 8;
			}
		}
		if(this.x <= game.bg.x) this.die();
		if(this.dir == 3) {
			if(game.map.bcheck(self,8,0)){
				this.die();
			}else{				
		 		this.x += 8;
			}
		}
		if(this.x >= game.bg.x + game.bg.w - this.w) this.die();
	}
	// 子弹死亡的方法
	Hbullet.prototype.die = function(){
		game.hzdArr.splice(game.hzdArr.indexOf(this),1);
		this.boom();
	}
	// 子弹死亡渲染
	Hbullet.prototype.boom = function(){
		game.ctx.drawImage(game.R['boom'], this.x-12,this.y-12)
	}
	// 子弹杀掉敌人坦克的方法
	Hbullet.prototype.killen = function(who){
		// 子弹的坐标
		var x1 = this.x ,x2 = this.x+this.w,y1 = this.y,y2 = this.y + this.h;
		// 敌人坦克的坐标
		var dx1 = who.x, dx2 = who.x + who.w , dy1 = who.y , dy2 = who.y + who.h;
		if(x1>dx2||x2<dx1||y2<dy1||y1>dy2){

		}else{
			who.die();
			this.die();
		}
	}

})()