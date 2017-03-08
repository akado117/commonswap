import React from 'react'
const _ = require('lodash')//required so it can be used easily in chrome dev tools.

class FuseTestContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: [],
            grid: "asassasasassaasaaassasasssaaassaaasasassssassasa",
            rowLength: 8,
            occupiedChar: 's',
            emptyChar: 'a'
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const grid = this.refs.gridInput.value || '';
        const occupiedChar = this.refs.occupied.value || '';
        const emptyChar = this.refs.empty.value || '';

        const errors = this.checkForErrors(grid)

        if(!errors.length){
            this.setState({occupiedChar,emptyChar, grid: grid.replace(/\n/g,'')})
        } else {
            this.setState({errors})
        }
    }
    determineIfBinaryChars = (string = '') => {
        let error = '';

        const charList = _.uniqBy(string);

        if(charList.length > 3){
            error = 'Please use just 2 different characters and enter'
        }

        return error
    }
    determineCompletedRows = (string='') => {
        const arry = string.split(/\n/) || []
        let rowLength = 0;

        arry.forEach((str,idx)=>{
            if (idx === 0){
                rowLength = str.length
            } else {
                if(rowLength != str.length){
                    return 'Please use rows with equal length'
                }
            }
        })

        this.setState({rowLength});
        return ''
    }
    checkForErrors = (string) => {
        const errors = [];

        let error = this.determineIfBinaryChars(string)
        error? errors.push(error): ''

        error = this.determineCompletedRows(string)
        error? errors.push(error): ''

        return errors
    }
    splitStringByLength = (str, splitLength) => {
        const stringArr = []
        for(let i = 0; i < str.length/splitLength; i++){
            stringArr.push(str.substring(i*splitLength,(i+1)*splitLength))
        }
        return stringArr
    }
    toggleGridSpace = (row,col) => {
        const grid = this.state.grid
        const position = row * this.state.rowLength + col

        const charAtPosition = grid.charAt(position)
        const replacementChar = charAtPosition==this.state.occupiedChar? this.state.emptyChar : this.state.occupiedChar

        const newGrid = grid.substr(0,position) + replacementChar + grid.substr(position+1)


        this.setState({grid:newGrid})

    }
    render() {
        const self = this;

        const splitGrid = this.splitStringByLength(this.state.grid,this.state.rowLength)

        const errors = this.state.errors.map((str)=>{
            return <h3 className='error'>{str}</h3>
        });
        return (
            <div className="fuse-container">
                <form onSubmit={this.handleChange}>
                    <h2>Please type or paste in an array of characters</h2>
                    <h3>only use two different CHAR types and separate rows with enter</h3>

                    <label htmlFor="occupied">Occupied Char</label>
                    <input id="occupied" ref="occupied" type="text"/>

                    <label htmlFor="empty">Empty Char</label>
                    <input id="empty" ref="empty" type="text"/>
                    <br/>

                    <textarea ref='gridInput' type="text" id="dataField" name="dataField"
                              style={{minHeight:'100px', minWidth:'100px'}}/>
                    <button type="submit">Apply State</button>
                </form>

                <h3>Click cell to toggle occupied/empty</h3>
                <table className="table-container">
                    <tbody>
                        {splitGrid.map((str, idx)=>{
                            return <TableRow rowString={str} occupiedChar={this.state.occupiedChar} rowNum={idx}
                                             key={`row-${idx}`} toggleHandler={self.toggleGridSpace}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

function TableRow ({rowString='',occupiedChar, emptyChar, rowNum, toggleHandler = ()=>{}}) {
    let columnElement = [];
    let colIdx = 0
    for (let char of rowString) {
        const col = colIdx
        columnElement.push(
            <td className={`grid-col ${char==occupiedChar?'occupied': '' }`}
                key={`col-${colIdx}-row-${rowNum}`} onClick={()=>{toggleHandler(rowNum,col)}}>
                {char==occupiedChar? 'O' : '*'}
            </td>)
        colIdx++
    }
    return (
        <tr className="grid-row">
            {columnElement}
        </tr>
    )
}

export default FuseTestContainer