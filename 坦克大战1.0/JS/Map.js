(function(){
	var Map = window.Map = function(){
		// 用于选择场景
		this.act = 0;
	}
	// 选择场景
	Map.prototype.enter = function(num){
		this.act = num;
		this.init();
	}
	// 游戏窗口416*416；一个单元格32*32 共建立416/32 = 13 个数组；
	Map.prototype.init = function(){
		switch(this.act){
			case 0 :
				// 布置数组
				this.code = [
								[0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
								[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0],
								[0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0],
								[0 ,1 ,0 ,1 ,0 ,1 ,2 ,1 ,0 ,1 ,0 ,1 ,0],
								[0 ,1 ,0 ,1 ,0 ,11,0 ,11,0 ,1 ,0 ,1 ,0],
								[0 ,11,0 ,11,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0],
								[0 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
								[22,0 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,22],
								[0 ,0 ,0 ,0 ,0 ,1 ,12 ,1 ,0 ,0 ,0 ,0 ,0],
								[0 ,1 ,0 ,1 ,0 ,1 ,11,1 ,0 ,1 ,0 ,1 ,0],
								[0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,0],
								[0 ,1 ,0 ,1,0 ,122,12,121,0 ,1 ,0 ,1 ,0],
								[0 ,0 ,0 ,0 ,0 ,102,6,101,0 ,0 ,0 ,0 ,0],
							];
				// 敌人的数量
				this.tankAmount = 12;
			break;
			case 1 :
			// 布置数组
			this.code = [
							[0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
							[0 ,1 ,0 ,21,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0],
							[0 ,1 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,2 ,1 ,0],
							[0 ,1 ,0 ,1 ,0 ,1 ,2 ,1 ,0 ,2 ,0 ,0 ,0],
							[0 ,0 ,0 ,1 ,0 ,11,0 ,11,0 ,1 ,0 ,1 ,2],
							[3 ,0 ,0 ,11,0 ,0 ,0 ,0 ,0 ,0 ,3 ,0 ,0],
							[3 ,3 ,0 ,0 ,0 ,1 ,0 ,1 ,2 ,0 ,3 ,0 ,0],
							[0 ,1 ,1 ,1 ,3 ,3 ,3 ,2 ,0 ,0 ,3 ,0 ,0],
							[0 ,0 ,0 ,2 ,3 ,1 ,0 ,1 ,0 ,1 ,0 ,0 ,0],
							[2 ,1 ,0 ,2 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
							[0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,2 ,1 ,0],
							[0 ,1 ,0 ,11,0 ,122,12,121,0, 12,0 ,12, 0],
							[0 ,1 ,0 ,12,0 ,102,6,101,0 , 1,12,1,0],
						];
			// 敌人的数量
			this.tankAmount = 15;
			break;

		}
	}

	//单个地图块的渲染
	Map.prototype.renOne = function(str,i,j){
		// 设定裁剪需要的数值
		var cx = 0,cy = 0,dx = 0 , dy = 0, w = 32 , h = 32, cw = 32 , ch = 32,num = 0;
		// 图片的裁切
		//110 表示第一位,第二位表示上下需要裁切,第三位表示第三位需要裁切
		// 11第一幅图,裁切上边,12第一张图裁切下边
		Map.prototype.clip = function(str){		
			//例如11 裁剪剩上边 12 裁剪剩下边
			num = str.charAt(0)-1;
			if(str.charAt(1) !=0 ){
				var n = str.charAt(1);
				cy = 16;
				ch = 16;
				dy = (n-1)*16;
				h = 16;
			}
			// 左右需要裁剪 例如 101裁剪剩左边 102 裁剪剩右边
			if(str.charAt(2)){
				var n = str.charAt(2);
				cx = 16;
				cw = 16;
				w = 16 ;
				dx = (n-1)*16;
			}
		}
		// 渲染一个块			
			this.clip(str.toString());
			// 渲染结果加上地图的偏差,加上在地图上的位置
			var zzx = dx+game.bg.x+j*32;
			var zzy = dy+game.bg.y+i*32;
			game.ctx.drawImage(game.R['tile'],cx+num*32,cy,cw,ch,zzx,zzy,w,h);
	}
	// 渲染整个地图
	Map.prototype.render = function(){
		for(var i = 0 ; i < 13 ; i++){
			for(var j = 0 ; j < 13 ; j++){
				if(this.code[i][j]!=0) this.renOne(this.code[i][j],i,j)
			}
		}
	}
	// 输入行列输出高度信息
	Map.prototype.calH = function(i,j,stat){
		var num = this.code[i][j];

		var str = num.toString().charAt(1);
		var str1 = num.toString().charAt(2);
		// 坦克或子弹向上运动的状态
		if(stat == 0){
			// 保险，不对为空的进行判断
			if(num == 0) return 0;
			// 只有一位
			if(num <5 ) return 32;
			if(str ==1&&str1 != 1&& str1 !=2){
				//只有剩下上边时返回16；其它都返回32
				return 16;
			}else{
				//下裁剪或者没有裁剪
				return 32
			}
		}
		if(stat == 1){
			// 向下时只剩下边返回16；其它返回32
			if(str == 2){
				return 16;
			}
			else{return 0;}
		}
	}
	//输出行所需数据
	Map.prototype.calW = function(i,j){
		var num = this.code[i][j];
		var str = num.toString().charAt(2);
		if(stat == 2){
			if(num == 0) return 0;
			if(str == '1') return 16;
			return 32;
		}
		if(stat == 3){
			if(str == 2) return 16;
			return 0;
		}
	} 
	Map.prototype.posmess = function(i,j){
		var num = this.code[i][j]
		// x1,y1为盒子左上角的信息
		 this.x1 = 32 * j;
		 this.y1 = 32 * i;
		//之后写时if(posmess) 当有值时在进行位置判断
		if(num == 0) return false;
		//当没有裁切时
		if(num < 10){
			this.x2 = this.x1 + 32;
			this.y2 = this.y1 + 32;
		}
		// 计算上下裁切 提取第二位字段
		if(num >= 10 && num < 100)  var sx = num % 10;
		// 提取第三位字段 
		if(num >= 100) var sx = parseInt(num/10) %10;
		// 进行第二位的判断提取信息
		if(sx == 0) this.y2 = this.y1 + 32;
		if(sx == 1) this.y2 = this.y1 + 16;
		if(sx == 2){
			this.y2 = this.y1 + 32;
			this.y1 = this.y2 - 16;
		}
		// 计算左右裁切
		// 当没有第三位或第三位为0的状态默认没有裁切
		if(num >= 10 || num <= 100) this.x2 = this.x1 + 32;
		// 提取第三位的信息
		if(num > 100) var zy = num % 10;
		// 对第三位判断
		if(zy == 1) this.x2 = this.x1 + 16;
		if(zy == 2){
			this.x2 = this.x1 + 32;
			this.x1 = this.x2 - 16;
		}
	}
	// 对坦克的检测
	Map.prototype.hostcheck = function(x,y){
		// 坦克的根据地图的时时位置
		var hx = game.host.x - game.bg.x+x;
		var hy = game.host.y - game.bg.y+y;
		//坦克的信息
		var hx1 = hx,hx2 = hx + 32 ,hy1 = hy ,hy2 = hy + 32;
		// 遍历数组检测 没碰到返回false 碰到返回true
		for(var i = 0 ; i < 13 ; i ++){
			for(var j = 0 ; j < 13 ; j++){
				if(this.code[i][j] != 0){
					// 如果挡住的是草则不阻挡
					if(this.code[i][j] == 3) continue;
					this.posmess(i,j);
					// 坦克
					if(hx2 <= this.x1 || hx1 >= this.x2 || hy2 <= this.y1 || hy1 >= this.y2){
					}else{
						return true;
					}
				}
			}
		}
	}
	// 地图更新变量作为子弹的判断依据
	Map.prototype.message = function(i,j){
		var num = this.code[i][j]
		 this.bx1 = 32 * j;
		 this.by1 = 32 * i;
		if(num == 0) return false;
		if(num < 10){
			this.bx2 = this.bx1 + 32;
			this.by2 = this.by1 + 32;
		}
		if(num >= 10 && num < 100)  var sx = num % 10;
		if(num >= 100) var sx = parseInt(num/10) %10;
		if(sx == 0) this.by2 = this.by1 + 32;
		if(sx == 1) this.by2 = this.by1 + 16;
		if(sx == 2){
			this.by2 = this.by1 + 32;
			this.by1 = this.by2 - 16;
		}
		if(num >= 10 || num <= 100) this.bx2 = this.bx1 + 32;
		if(num > 100) var zy = num % 10;
		if(zy == 1) this.bx2 = this.bx1 + 16;
		if(zy == 2){
			this.bx2 = this.bx1 + 32;
			this.bx1 = this.bx2 - 16;
		}
	}
	// 对子弹的检测
	Map.prototype.bcheck = function(who,x,y){
		// 函数子弹调用
		var hx = who.x - game.bg.x+x;
		var hy = who.y - game.bg.y+y;
		//子弹的信息
		var hx1 = hx,hx2 = hx + who.h ,hy1 = hy ,hy2 = hy + who.w;
		// 遍历数组检测 没碰到返回false 碰到返回true
		for(var i = 0 ; i < 13 ; i ++){
			for(var j = 0 ; j < 13 ; j++){
				if(game.map.code[i][j] != 0){
					game.map.message(i,j);
					// 坦克
					if(hx2 <= game.map.bx1 || hx1 >= game.map.bx2 || hy2 <= game.map.by1 || hy1 >= game.map.by2){
					}else{
						// 在此记录死亡时的i,j;之后调用
						this.update(who,i,j);
						// 如果集中老家判定死亡
						if(game.map.code[i][j] == 6) game.scene.enter(3);
						// 如果挡住的是草则不阻挡
						if(this.code[i][j] == 3) return false;
						return true;
					}
				}
			}
		}
	}
	// 子弹设计更新地图
	Map.prototype.update = function(who,i,j){
		// 拿取子弹的方向
		var level = who.level;
		var dir = who.dir;
		var num = this.code[i][j];
		var state = 0;
		// 提取小块状态
		if(num < 10) state = num;
		if(num >= 10 && num < 100) state = parseInt(num / 10);
		if(num >= 100 ) state = parseInt(num / 100);
		// 如果子弹等级不够直接返回
		if(level < state) return;     
		// 向上时
		if(dir == 0){
			if(num < 10) this.code[i][j] = num * 10 + 1;
			if(num >= 10 && num < 100){
				var st = num % 10;
				if(st == 0){
					this.code[i][j] = num + 1;
				}else{
					this.code[i][j] = 0;
				}
			} 
			if(num >= 100){
				var st = parseInt(num / 10)%10;
				if(st == 0){
					this.code[i][j] = num + 10;
				}else{
					this.code[i][j] = 0;
				}
			} 
		}
		// 向下时
		if(dir == 1){
			if(num < 10) this.code[i][j] = num * 10 + 2;
			if(num >= 10 && num < 100){
				var st = num % 10;
				if(st == 0){
					this.code[i][j] = num + 2;
				}else{
					this.code[i][j] = 0;
				}
			}
			if(num >= 100){
				var st = parseInt(num / 10)%10;
				if(st == 0){
					this.code[i][j] = num + 20;
				}else{
					this.code[i][j] = 0;
				}
			}  
		}
		// 向左时
		if(dir == 2){
			if(num < 10) this.code[i][j] = num * 100 + 1;
			if(num >= 10 && num < 100) this.code[i][j] = num * 10 + 1; 
			if(num >= 100) this.code[i][j] = 0; 
		}
		// 向右时
		if(dir == 3){
			if(num < 10) this.code[i][j] = num * 100 + 2;
			if(num >= 10 && num < 100) this.code[i][j] = num * 10 + 2; 
			if(num >= 100) this.code[i][j] = 0; 
		}
	}
	// 地图更新变量作为敌人的判断依据
	Map.prototype.enermymess = function(i,j){
		var num = this.code[i][j]
		 this.ex1 = 32 * j;
		 this.ey1 = 32 * i;
		if(num == 0) return false;
		if(num < 10){
			this.ex2 = this.ex1 + 32;
			this.ey2 = this.ey1 + 32;
		}
		if(num >= 10 && num < 100)  var sx = num % 10;
		if(num >= 100) var sx = parseInt(num/10) %10;
		if(sx == 0) this.ey2 = this.ey1 + 32;
		if(sx == 1) this.ey2 = this.ey1 + 16;
		if(sx == 2){
			this.ey2 = this.ey1 + 32;
			this.ey1 = this.ey2 - 16;
		}
		if(num >= 10 || num <= 100) this.ex2 = this.ex1 + 32;
		if(num > 100) var zy = num % 10;
		if(zy == 1) this.ex2 = this.ex1 + 16;
		if(zy == 2){
			this.ex2 = this.ex1 + 32;
			this.ex1 = this.ex2 - 16;
		}
	}
	// 对敌人的检测
	Map.prototype.encheck = function(who,x,y){
		// 函数子弹调用
		var hx = who.x - game.bg.x+x;
		var hy = who.y - game.bg.y+y;
		//子弹的信息
		var hx1 = hx,hx2 = hx + who.h ,hy1 = hy ,hy2 = hy + who.w;
		// 遍历数组检测 没碰到返回false 碰到返回true
		for(var i = 0 ; i < 13 ; i ++){
			for(var j = 0 ; j < 13 ; j++){
				if(game.map.code[i][j] != 0){
					// 如果挡住的是草则不阻挡
					if(this.code[i][j] == 3) continue;
					game.map.enermymess(i,j);
					if(hx2 <= game.map.ex1 || hx1 >= game.map.ex2 || hy2 <= game.map.ey1 || hy1 >= game.map.ey2){
					}else{
						return true;
					}
				}
			}
		}
	}
})()
