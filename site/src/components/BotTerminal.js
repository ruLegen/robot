import React,{Component} from "react";
import Terminal from 'react-console-emulator'
import * as consoleCommands from '../js/consoleFunctions' 
import {generateConsoleCommands} from '../components/ConsoleUtils'


class BotTerminal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.execute=(functionName,value)=>{
          return consoleCommands[functionName].bind(this)(value)
        }
        
        this.commands = generateConsoleCommands(this)
    }
    componentDidUpdate(){
       // console.log(this.props.state.isChartStoped)
    }
    render() { 
        return ( <Terminal  autoFocus={true}
                            dangerMode  ={true}
                            commands={this.commands} 
                            welcomeMessage='ROBOTIZE Control Panel'
                            promptLabel={'robotize@:$'}
                            className="bot-terminal-root"
                            
                            /> );
    }
}
 
export default BotTerminal;