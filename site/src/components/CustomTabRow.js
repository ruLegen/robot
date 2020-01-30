import React from "react";
import {TableRow,TableCell,Typography} from  '@material-ui/core'
function CustomTableRow(props){
    return (<TableRow>
              <TableCell component="th" scope="row">
                <Typography>{props.rowName}</Typography>
              </TableCell>
              <TableCell align="right">
                  <Typography>{props.rowValue}</Typography>
              </TableCell>
            </TableRow>)
}
export default CustomTableRow