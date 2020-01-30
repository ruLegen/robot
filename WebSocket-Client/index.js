function MyMap(x, in_min,in_max,out_min, out_max) {

     return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}        


var statusRobot=new Array('FORWARD is DED_END', 'FOLLOWING the Wall')
var Cyberbot = {
          Socket: null,
          Output: [],
 	  connected:false,
	  onData: function(){},
          Connect: function (hostname) {
            function WebSocketMessage(e) {
              if (this.Socket === null) return;
              //---
		
              var message = e.data.toString();
		
              var list = message.split(';');
  try{onData(list);} catch(e){}
           
            }
  
            function WebSocketOpen(e) {

           

              setInterval(function (socket) {
                if (socket === null) { clearInterval(this); console.log("Trying") ;return; }
                //---
                socket.send("GET:0=0");
		console.log("CONNECTED")
this.connected = true;
              }, 1000, this);
            }
  
            function WebSocketClose(e) {

          
              if (this.Socket === null) return;
              //---
              this.Socket = null;
this.connected = false;
              WebSocketConnect();
            }
  
            function WebSocketConnect(hostname, object) {
              setTimeout(function (hostname, object) {
                try { object.Socket = new WebSocket('ws://' + hostname); } catch (e) { WebSocketConnect(hostname); }
  
                object.Socket.onopen = WebSocketOpen;
                object.Socket.onmessage = WebSocketMessage;
                object.Socket.onclose = WebSocketClose;
  
              }, 500, hostname, object);
            }
            WebSocketConnect(hostname, this);
          },
  
          Transmit: function (from, elem) {
            if (this.Socket === null) return;
  
            var text = 'SET:' + from + '=';
  
            for (let i = 1; i < arguments.length; i++) text += arguments[i] + ';';
  
            this.Socket.send(text);
          },
  
          
          Recive: function (from, count) {
		 if (this.Socket === null)
			return;
		try{
           	 this.Socket.send('GET:' + from + '=' + count + '');
       		}
		catch(e){

		}

        }


}


dataFromBot ={
	ultrasound:0,
	status:'',
	motorLeft:0,
	motorRight:0,
	ir : [0,0],
	line: [0,0,0,0,0,0,0]	
}




function setup() {
  // Create the canvas
  createCanvas(500,500);
  Cyberbot.Connect("192.168.4.1");
  Cyberbot.onData = onData;
 frameRate(30)

  
}


dir = [0,0]

function draw(){

  background(200);
	x = 2*MyMap(mouseX,0,500,-1,1)
	y = 2*MyMap(mouseY,0,500,1,-1)
  dir = [0.5 * (x+y),0.5 * (y-x)]
  // Set colors
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  fill(3);
  
  textAlign(RIGHT);
  text(dataFromBot.ultrasound ,200,100)
//  text(dir[1],200,200)
  text(dataFromBot.ir[0] ,200,200)
  text(dataFromBot.ir[1] ,200,300)
  text('Left speed ' + dataFromBot.motorLeft.toString() ,200,350)
  text('Right speed ' + dataFromBot.motorRight.toString() ,200,400)
 
  // A rectangle
  // An ellipse
  ellipse(mouseX, mouseY, 80, 80);
	
try{

  if(mouseIsPressed)
  {
    Cyberbot.Transmit(0,parseInt(dir[0]*500),parseInt(dir[1]*500))
  }
else
{
dir = [0,0]
 Cyberbot.Transmit(0,parseInt(dir[0]*500),parseInt(dir[1]*500))
}
}
catch(e)
{
console.log(e)
}
 // drawGrid()

//if( frameCount % 30 == 1)
	Cyberbot.Recive(0,10)


//robot drawing
translate(256,256)
fill(0,255,0)
rect(0,0,100,100)
fill(255,0,0)
line(50,0,50,-dataFromBot.ultrasound*2)


push()
rotate(7*3.14/4)
fill(0,255,0)
line(0,0,0,-dataFromBot.ir[0])
pop()

push()
translate(100,0)
rotate(-7*3.14/4)
fill(0,255,0)
fill(0,255,0)
line(0,0,0,-dataFromBot.ir[1])

pop()


//dont forget transalte back to 0, 0


//drawGrid();

}





 function onData(data){
	console.log(data,dataFromBot,statusRobot[parseInt(data[3])])
	
	if(data[0] !== "")
	{
		dataFromBot.ultrasound = data[0]
		dataFromBot.ir = data.slice(1,3)
		dataFromBot.status = data[3]
		
		dataFromBot.motorLeft = data[4]
		dataFromBot.motorRight = data[5]
	}

	//dataFromBot.ir[0] = map(dataFromBot.ir[0],700,1000,0, 200)
	//dataFromBot.ir[1] = map(dataFromBot.ir[1],700,1000,0, 200)
}
function drawGrid() {
	stroke(200);
	fill(120);
	for (var x=-width; x < width; x+=40) {
		line(x, -height, x, height);
		text(x, x+1, 12);
	}
	for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}
