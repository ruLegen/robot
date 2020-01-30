import React from 'react'
import LoadingOverlay from 'react-loading-overlay';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
function LoaderOverlay({active,children,text,spinnerColor,...others}){
    return (
        <LoadingOverlay active={active}
                        text={text}
                        spinner={<ClimbingBoxLoader color={spinnerColor}/>}
                        {...others} >
            {children}
        </LoadingOverlay>
    )
}
export default LoaderOverlay