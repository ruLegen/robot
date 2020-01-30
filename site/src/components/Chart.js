import React, {Component} from 'react'
import { LineChart, Line,XAxis,YAxis,Tooltip, ResponsiveContainer,Legend } from 'recharts';
import {series,colors} from '../js/utils'

function extractData(data)
{
    let extractedData = []
    data.map((item,index)=>{
        //item = [10,20,30,40]
        let newData = {}
        newData.time = item[0] 
        series.map((seriesName,seriesIndex)=>{
             newData[seriesName] = item[seriesIndex+1]
         })
         extractedData.push(newData)
    })
    return extractedData
}
class Chart extends Component {
    constructor(props)
    {
        super(props)
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.shouldUpdate === true || this.props.filter != nextProps.filter) {
          return true;
        }
        else
        return false;
      }
    componentDidMount(){
        console.log(extractData(this.props.data))
    }
    componentDidUpdate(){
    }
    render(){
        return (
            <ResponsiveContainer> 
               
                <LineChart data={extractData(this.props.data)}>
                {
                    series.map((seriesName,index)=>{
                        if(this.props.filter.includes(index))
                            return (<Line type="monotone" dataKey={seriesName} name={seriesName} stroke={colors[index]} />)
                    })
                }
                 <Legend verticalAlign="top" height={36}/>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                </LineChart>
            </ResponsiveContainer>
       )
    }
}

export default Chart