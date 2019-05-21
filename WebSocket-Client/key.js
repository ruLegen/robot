var map = {}; // You could also use an array
dir = [0,0]
window.onkeydown = window.onkeyup= function(e){
    map[e.keyCode] = e.type == 'keydown';
  	if(map[38]) //up
		dir=[1,1]
	if(map[40]) //down
		dir=[-1,-1]
	if(map[37]) //left
		dir=[0,1]
	if(map[39]) //right
		dir=[0,-1]
	if(map[38] && map [40])
		dir=[0,0]
	if(map[38] && map[37])
		dir=[0.5,0.5]
	if(map[38] && map[39])
		dir=[0.5,-0.5]
	if(map[40] && map[37])
		dir=[-0.5,0.5]
	if(map[40] && map[39])
		dir=[-0.5,-0.5]
	if(!map[40] && !map[38] && !map[39] && !map[37])
		dir=[0,0]

if(e.type == "keyup")
	dir=[0,0]

  console.log(map,dir)

botton_XY_click(dir[0]*500,dir[1]*500);

}





