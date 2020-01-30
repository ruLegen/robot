import React, { Component, Fragment } from 'react'

import { AppBar, Tabs, Tab, Button, Typography,Container, TableHead, TableRow, TableCell, TableBody,Table } from '@material-ui/core'
import TabPanel from '../components/TabPanel'
import Chart from '../components/Chart'
import LoaderOverlay from '../components/LoaderOverlay'
import BotTerminal from '../components/BotTerminal'
import { Cyberbot as Bot } from '../js/CyberBot'
import { removeIndexImmutable } from '../js/utils'
import List from '@material-ui/core/List';
 import MazeDrawerSketch from '../components/MazeDrawerSketch';
import ControlSketch from '../components/ControlSketch'
import CustomTableRow from '../components/CustomTabRow';
import {GreenText} from '../components/ConsoleUtils'
// import Sketch from 'react-p5';

const status = ['FC - Forward', 'FC - Right', 'FC - Left', 'FB - Left', 'FB - Right', 'FB - Left',"RIGHT_BUT_GO_FORWARD"]
const HISTORY_LIMIT = 30;
const DIRECTION_HISTORY_LIMIT = 300;
class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabID: 0,
             botInfo : [1,2,3,4,5,6,7,8,9],
           // botInfo: [],
            connected: false,
            history: [],
            isChartStoped: false,
            lastData: [],
            chartFilter: [0, 1, 2],
            directionHistory: 0,
            baseTime: (new Date().getTime() / 1000),
            claimedUS:null,
            claimedIRMin:null,
            claimedIRMax  :null,

        }

        this.handleTabChange = (event, tabIndex) => {
            this.setState({ tabID: tabIndex })
            console.log(tabIndex)
        }
        this.onData = (data) => {
            if (data != '' && this.state.isConnected) {
                data.unshift((new Date().getTime() / 1000 - this.state.baseTime).toFixed(1))
                let newArray = this.state.history;
                let newDirectionHistory = this.state.directionHistory
                if (this.state.history.length > HISTORY_LIMIT)
                    newArray = removeIndexImmutable(newArray, 0)
                // if (this.state.directionHistory.length > DIRECTION_HISTORY_LIMIT)
                // newDirectionHistory = removeIndexImmutable(newDirectionHistory, 0)    
                // //Add new Item, slice data to 4 elements later   
                newArray = [...newArray, data]
                //4 index is direction in data array
                // newDirectionHistory = [...newDirectionHistory, data[4]]
                this.setState({ botInfo: data, history: newArray, directionHistory: data[4] })
            }
        }

        this.Cyberbot = new Bot("192.168.4.1");
        this.Cyberbot.onData = this.onData;
        this.Cyberbot.onConnected = () => {
            this.Cyberbot.Recive(0,10)
            this.setState({
                isConnected: true
            })
        };
        this.Cyberbot.onClose = () => {
            console.log('closed')
            this.setState({
                isConnected: false
            })
        };

    }
    componentDidMount() {
        console.log("awdawdwad")

        //delete this. later
        //  setInterval(() => {
        //      this.onData([parseInt(Math.random() * 30), parseInt(Math.random() * 800), parseInt(Math.random() * 800), parseInt(Math.random() * 5),parseInt(Math.random() * 800),parseInt(Math.random() * 800),parseInt(Math.random() * 800),parseInt(Math.random() * 800),parseInt(Math.random() * 800)])
        //  }, 100)

        //  setTimeout(() => {
        //      this.setState({ isConnected: true })
        //  }, 1000);
        this.Cyberbot.Connect();
    }
    render() {
        return (<LoaderOverlay spinnerColor='#36D7B7' className='loader-overlay' text="Подключение..." active={!this.state.isConnected}>
            <div>
                <AppBar position="relative">
                    <Tabs value={this.state.tabID} onChange={this.handleTabChange} variant="fullWidth">
                        <Tab label="Состояние" />
                        <Tab label="Отчет" />
                        <Tab label="Управление" />
                    </Tabs>
                </AppBar>
            </div>
            <div>
                <TabPanel value={this.state.tabID} index={0}>
                        <Container maxWidth='sm'>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell><Typography>Показания</Typography></TableCell>
                                    <TableCell align="right"><Typography>Значение</Typography></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <CustomTableRow rowName='Время (сек)' rowValue={this.state.botInfo[0]}/>    
                                    <CustomTableRow rowName='Ультразвуковой' rowValue={this.state.botInfo[1]}/>    
                                    <CustomTableRow rowName='Левый ИК' rowValue={this.state.botInfo[2]}/>    
                                    <CustomTableRow rowName='Правый ИК' rowValue={this.state.botInfo[3]}/>    
                                    <CustomTableRow rowName='Напрвавление движения' rowValue={status[this.state.botInfo[4]]}/>    
                                    <CustomTableRow rowName='Состояние робота' rowValue={this.state.isConnected?"Подключен":"Не подключен"}/>    
                                </TableBody>
                            </Table>
                        </Container>
                  </TabPanel>
                <TabPanel className='log-container' value={this.state.tabID} index={1}>
                    <div className='chartbox-container'>
                        <Chart shouldUpdate={!this.state.isChartStoped}
                            data={this.state.isChartStoped ? this.state.lastData : this.state.history}
                            filter={this.state.chartFilter} />
                        <Button onClick={() => {
                            this.setState({
                                isChartStoped: !this.state.isChartStoped,
                                lastData: this.state.history
                            })
                        }} variant='filled' color='primary'>
                            {this.state.isChartStoped ? "Start" : "Stop"}
                        </Button>
                        <Button onClick={() => {
                            this.setState({claimedUS: this.state.botInfo[1]})
                        }} variant='filled' color='primary'>Ультразвуковой =<GreenText>{this.state.claimedUS}</GreenText></Button>
                    
                      <Button onClick={() => {
                            this.setState({claimedIRMin: this.state.botInfo[3]})
                        }} variant='filled' color='primary'>Минимальное =<GreenText>{this.state.claimedIRMin}</GreenText></Button>

                        <Button onClick={() => {
                            this.setState({claimedIRMax: this.state.botInfo[3]})
                        }} variant='filled' color='primary'>Максимальное =<GreenText>{this.state.claimedIRMax}</GreenText></Button>

                      
                    </div>
                    <div className='terminal-container'>
                        <BotTerminal bot={this.Cyberbot} state={this.state} onStateChange={(state) => {
                            this.setState(state)
                        }} />
                    </div>
                </TabPanel>
                <TabPanel value={this.state.tabID} index={2}>
                    <div className="Control-TabPanel">
                        <ControlSketch width={window.innerWidth} height={window.innerHeight - 100} Cyberbot={this.Cyberbot} />
                    </div>
                </TabPanel>
            </div>
        </LoaderOverlay>)
    }
}

export default IndexPage