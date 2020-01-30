import React, { Component } from "react";
import Sketch from "react-p5";
import "../styles/App.css"
function map(x, in_min,in_max,out_min, out_max) {

    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}  
function drawGrid(p5) {
	p5.stroke(200);
	p5.fill(120);
	for (var x=-p5.width; x < p5.width; x+=40) {
		p5.line(x, -p5.height, x, p5.height);
		p5.text(x, x+1, 12);
	}
	for (var y=-p5.height; y < p5.height; y+=40) {
		p5.line(-p5.width, y, p5.width, y);
		p5.text(y, 1, y+12);
	}
}

export default class ControlSketch extends Component {
    constructor(props){
        super(props)
    }
    shouldComponentUpdate(nextProps, nextState) {
        // if (this.props.width    != nextProps.width ||
        //     this.props.height   != nextProps.height) {
        //   return true;
        // }
        // else
        return false;
      }
      componentDidUpdate(){
          console.log("updated")
      }
      componentDidMount(){

      }
	render() {
        let {Cyberbot,...other} = this.props
        var dir = [0,0]
        let up = false
        let down = false
        let left = false
        let right = false
		return (
			
				<Sketch
                className="ww"
					setup={(p5, parent) => {
                        console.log({parent})
                     
                        let canvas = p5.createCanvas(this.props.width, this.props.height).parent(parent);
                        canvas.id('mycanvas');
                        p5.frameRate(60)
                    }}
                    keyPressed={(p5)=>{
                        console.log("keypressed")
                        switch (p5.keyCode) {
                            case p5.UP_ARROW: up=true;break;
                            case p5.DOWN_ARROW: down=true;break;
                            case p5.LEFT_ARROW: left=true;break;
                            case p5.RIGHT_ARROW: right=true;break;
                            default:
                                break;
                        }                            
                        
                    }}
                    keyReleased={(p5)=>{
                        console.log("releade")

                        switch (p5.keyCode) {
                            case p5.UP_ARROW: up=false;break;
                            case p5.DOWN_ARROW: down=false;break;
                            case p5.LEFT_ARROW: left=false;break;
                            case p5.RIGHT_ARROW: right=false;break;
                            default:
                                break;
                        }                            
                    }}

					draw={p5 => {
                                            
                        p5.background(255,255,255);
                        let x = 2*map(p5.mouseX,0,this.props.width,-1,1)
                        let y = 2*map(p5.mouseY,0,this.props.height,1,-1)
                        dir = [(x+y),(y-x)]
                        // Set colors
                        p5.fill(204, 101, 192, 127);
                        p5.stroke(127, 63, 120);
                        p5.fill(3);
                        
                        p5.textAlign(p5.RIGHT);
                        // A rectangle
                        // An ellipse
                        p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
                            
                        try{
                            if(p5.mouseIsPressed)
                            {
                               let multiplayer = 500
                               var motor1=parseInt(dir[0]*multiplayer)
                               var motor2=parseInt(dir[1]*multiplayer)
                                if(Math.abs(motor1) > 1020)
                                    motor1 = dir[0] < 0?-990:990
                                if(Math.abs(motor2) > 1020)
                                    motor2 = dir[1] < 0?-990:990
                                    p5.fill(0, 102, 153);
                                    p5.textAlign(p5.LEFT);
                                    p5.text(`motor1 speed ${motor1}`,10,30)
                                    p5.text(`motor2 speed ${motor2}`,10,50)
                                    p5.textAlign(p5.RIGHT);
                                    
                                Cyberbot.Transmit(0,motor1,motor2)
                            }
                            else
                            {
                              dir = [0,0] 
                                Cyberbot.Transmit(0,0,0)
                            }
                            
                            if(p5.keyIsPressed)
                            {
                                let dir=[980,980]
                                let coof = [0,0]
                                if(left)
                                    coof = [-1,1]
                                if(right)
                                    coof = [1,-1]
                                
                                if(up)
                                {
                                    coof = [1,1]
                                    if(up && left)
                                        coof = [-0.1,1]
                                    if(up && right)
                                        coof = [1,-0.1]
                                }
                                else
                                if(down)
                                {
                                        coof = [-1,-1]
                                    if(down && left)
                                        coof = [-1,0.1]
                                    if(down && right)
                                        coof = [0.1,-1]
                                }
                                
                                dir[0] = dir[0]*coof[0]
                                dir[1] = dir[1]*coof[1]
                                p5.fill(0, 102, 153);
                                p5.textAlign(p5.LEFT);
                                p5.text(`motor1 speed ${dir[0]}`,0,40)
                                p5.text(`motor2 speed ${dir[1]}`,0,0)
                                p5.textAlign(p5.RIGHT);
                                //add Here movement for robot 
                                Cyberbot.Transmit(0,parseInt(dir[0]),parseInt(dir[1]))

                        }
                            
                        }
                        catch(e)
                        {
                            console.log(e)
                        }
                        // drawGrid()

                     //   if( p5.frameCount % 15 == 1)
                     //   {
                            Cyberbot.Recive(0,10)
                            
                       // }


                        //robot drawing
                        p5.translate(this.props.width/2,this.props.height/2)
                        drawGrid(p5)
                        p5.fill(255,0,0)
                       // p5.line(50,0,50,-dataFromBot.ultrasound*2)


                        p5.push()
                        p5.rotate(7*3.14/4)
                        p5.fill(0,255,0)
                       // p5.line(0,0,0,-dataFromBot.ir[0])
                        p5.pop()

                        p5.push()
                        p5.translate(100,0)
                        p5.rotate(-7*3.14/4)
                        p5.fill(0,255,0)
                        p5.fill(0,255,0)
                        //p5.line(0,0,0,-dataFromBot.ir[1])
                        p5.pop()


					}}
				/>
		);
}
}