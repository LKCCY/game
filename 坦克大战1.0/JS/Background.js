(function(){
	var BG = window.Bg = function(){
		this.w = 416;
		this.h = 416;
		this.y = 18;
		this.x = 12;
	}
	// 渲染方法
	Bg.prototype.render = function(){
		game.ctx.fillStyle = 'black';
		game.ctx.fillRect(this.x, this.y, this.w, this.h)
	}
})()