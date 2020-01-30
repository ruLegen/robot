import React from 'react'
function TabPanel(props)
{
    const {children,value,index,className} = props
    return (value === index ?<div className={className}>{children}</div>:null)
}

export default TabPanel