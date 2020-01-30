import React, { Component } from "react";
import Sketch from "react-p5";
import "../styles/App.css"

function drawGrid(p5) {
    p5.push()
    p5.rotate(180)

	p5.stroke(200);
	p5.fill(120);
	for (var x=-p5.width; x < p5.width; x+=40) {
		p5.line(x, -p5.height, x, p5.height);
		p5.text(x, x+1, 12);
	}
	for (var y=-p5.height; y < p5.height; y+=40) {
		p5.line(-p5.width, y, p5.width, y);
		p5.text(-y, 1, y+12);
    }
    p5.pop()
}


class MazeDrawerSketch extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.shouldUpdate = true;
    }
    shouldComponentUpdate(nextProps){
        this.props = nextProps
        return false
    }
    componentDidUpdate(){
        console.log("updated");
        
    }
    render() { 
        const multiplayer = 2;
        const rotationAngle = 20;
        let position ;
        let newPosition ;
   
        return ( <Sketch
                    setup={(p5, parent) => {
                        p5.createCanvas(this.props.width, this.props.height).parent(parent);
                        p5.frameRate(30)
                        p5.angleMode(p5.DEGREES)
                        p5.rectMode(p5.CENTER)
                        position =  p5.createVector(0, 0);
                        newPosition= p5.createVector(0, 0);
                    }} 
                    keyPressed={(p5)=>{
                        console.log("awdwa");
                    }}
                    draw={p5 => {
                            p5.push()
                            p5.translate(this.props.width/2,this.props.height/2);
                            p5.rotate(180)
                            drawGrid(p5);
                            p5.stroke('red')
                        //for(let i in directionArray)
                        if(this.props.direction)
                        {
                            //let direction = directionArray[i]

                            let direction=this.props.direction
                            let directionVector = p5.createVector(0,1);
                            //here is mb doesnt need rotation
                            switch (direction) {
                                case 0: directionVector.set(0,1); break;      //forward   x=0 y=1
                                case 1: directionVector.set(-1,0);    directionVector.rotate(rotationAngle); break;      //right     x=1 y=0
                                case 2: directionVector.set(1,0);    directionVector.rotate(-rotationAngle);break;     //left      x=-1 y=0
                                case 3: directionVector.set(1,0);    directionVector.rotate(-rotationAngle);break;     //left
                                case 4: directionVector.set(-1,0);   directionVector.rotate(rotationAngle);break;      //right
                                case 5: directionVector.set(1,0);    directionVector.rotate(-rotationAngle);break;     //left
                                default:
                                    break;
                            }
                            directionVector.setMag(multiplayer)
                            newPosition.add(directionVector)
                            p5.stroke('red');
                            p5.strokeWeight(3);
                            p5.fill('red');
                            p5.line(position.x,position.y,newPosition.x,newPosition.y)
                            p5.stroke('#222222');
                            p5.strokeWeight(1);
                            position = newPosition.copy()
                        }
                        p5.pop()

                    }}        
            /> );
    }
}
 
export default MazeDrawerSketch;