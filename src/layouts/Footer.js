import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class Footer extends React.Component {
    render() {
        return (
            <Paper>
                <Typography component="p">
                    This is footer.
                </Typography>
            </Paper>
        );
    }
}

export default Footer