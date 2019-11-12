import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {Rss} from "../api";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import red from "@material-ui/core/colors/red";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const style = {}

class RssFeeds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feeds: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Rss.getRssFeeds().then((res) => {
            this.setState({feeds: res.items})
        })
    }

    renderPanelItem = (feeds) => {



        return feeds.map((feed)=>{
            return (
                <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <Button variant="contained" href="#contained-buttons">
                            Details
                        </Button>
                    </Grid>

                    <Grid item xs={8}>
                        <ExpansionPanel>

                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{feed.title}</Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <Typography>
                                    {feed.contentSnippet}
                                </Typography>
                            </ExpansionPanelDetails>

                        </ExpansionPanel>
                    </Grid>

                </Grid>
            )
        })

    }

    render() {

        return (
            <Paper>
                {this.renderPanelItem(this.state.feeds)}
            </Paper>
        );
    }
}

export default RssFeeds


