import React from 'react'
import {series,colors} from '../js/utils'

function GreenText(props){
    let {children} = props
    return (<span style={{color:"green"}}>{children}</span>)
}
function RedText(props){
    let {children} = props
    return (<span style={{color:"red"}}>{children}</span>)
}
function OrangeText(props){
    let {children} = props
    return (<span style={{color:"orange"}}>{children}</span>)
}


function ResultMessage(props)
{
    const {status,children} = props;
    return (status?<GreenText>{children}</GreenText>:<RedText>{children}</RedText>)
}

//parent is React class component
//parent.execute(fooName)
//fooName are specified in /js/consoleFunctions.js
function generateConsoleCommands(parent) {
    return {
        chart: {
            description: 'Toggle chart',
            usage: '',
            fn: function () {
                let result= parent.execute('toggleChart')
                return <>Chart is <ResultMessage status={!result}>{result?"stoped":"runing "}</ResultMessage></>
            }
        },
        manual: {
            description: 'Toggle robot control system',
            usage: 'manual 1-manual 0-auto',
            fn: function () {
                let result= parent.execute('toggleManualControl',arguments[0])
                return <>Control <OrangeText>{result?"manual":"auto "}</OrangeText></>
            }
        },
        filter: {
            description: 'Filter chart series',
            usage: 'filter [seriesNumber] 1-Ultrasonic 2-Infrared Right 3-Infrared Left 4-Extraparametr Empty-all charts',
            fn: function () {
                let filteredIndexes = new Set()
                for(let i = 0; i < arguments.length;i++)
                {
                    let index = parseInt(arguments[i]);
                    if(isNaN(index))
                        continue
                    filteredIndexes.add(index)
                }
                filteredIndexes = Array.from(filteredIndexes).filter((item)=>{return item > 0})
                //reduce every element by 1 and create new Array
                filteredIndexes = filteredIndexes.map((item)=>{
                    return item-1
                })
                let result = parent.execute('filterChart',filteredIndexes)
                return <> <GreenText>Filter Applyed</GreenText> - {result.map((indexItem)=>{
                    return (<span style={{color:colors[indexItem]}}>{series[indexItem]} </span>)
                })}</>
            }
        }

    }
}

export {ResultMessage,GreenText,generateConsoleCommands}