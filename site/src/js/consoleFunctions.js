/*
    Each functions are binded with parent Reat-Class
    this -> React-Class
*/

//change chart status
//return new chart state
function toggleChart(){
    let {state,onStateChange} = this.props
           onStateChange({
                isChartStoped:!state.isChartStoped,
                lastData:state.history
            })
           return !state.isChartStoped;
}

function toggleManualControl(controlState) {
    let {state,bot} = this.props
    console.log(controlState)
    if(controlState == undefined)
        return
    let result = controlState.toLowerCase() == "on"?0:1
    bot.Transmit(4,parseInt(result))
    // if(state.botInfo[4] == 1)
    // {
    //     bot.Transmit(4,0)
    //     return 0
    // }
    // else
    // {
    //     bot.Transmit(4,1)
    //     return 1
    // }
}
//[0,1,2,3] are state in IndexPage data from Bot
function filterChart(filter) {
    let {state,onStateChange} = this.props
    if(filter.length == 0)
    {
        onStateChange({
            chartFilter:[0,1,2,3]
        })
        return [0,1,2,3]
    }
    else
        onStateChange({
            chartFilter:filter
        })
        return filter
}




export {toggleChart,toggleManualControl,filterChart}