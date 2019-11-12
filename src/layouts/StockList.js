import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import red from '@material-ui/core/colors/red';
import {AlphaVantage} from "../api";


const style = {
    Paper: {
        padding: 0
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
    tdChangeMinus:{
        color: red,
        backgroundColor: red
    }
}

const columns = [
    { id: 'code', label: 'Symbol', minWidth: 70 },
    {
        id: 'price',
        label: 'Price',
        minWidth: 70,
        align: 'right',
        format: value => value.toFixed(2)
    },
    {
        id: 'change',
        label: 'Change Percent',
        minWidth: 70,
        align: 'right',
        format: value => value.toFixed(2)
    }
];


class StockList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: []
        }
    }

    componentDidMount() {
        console.log("componentDidMount()")

        const promises = this.props.symbols.map((s)=>{
            return AlphaVantage.getQuotesLatest(s)
            // return ApiCalls.getStockName(s)

        })

        Promise.all(promises).then((res)=>{
            console.log(res)
            const quotes = res.map((r)=>{
                return {
                    code: r.data["Global Quote"]["01. symbol"],
                    price: r.data["Global Quote"]["05. price"],
                    change: r.data["Global Quote"]["10. change percent"],
                }
            })
            this.setState({
                quotes: quotes
            })
        })
    }

    render() {
        return (
            <Grid item xs={12} lg={3}>
                <Paper style={style.Paper}>
                    <div className={style.tableWrapper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.quotes.map((row)=>{
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{color: red}}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        )
                                    })
                                }


                            </TableBody>
                        </Table>
                    </div>


                </Paper>
            </Grid>

        );
    }
}

export default StockList


