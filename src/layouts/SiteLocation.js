import * as React from "react";
import { Breadcrumb } from 'react-bootstrap'

class SiteLocation extends React.Component {

    currentPath = () =>{
        const tokens = this.props.location.pathname.split('/')
        return tokens[tokens.length - 1]
    }

    renderBreadcrumbItem = () => {
        return (
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        )
    }

    render() {
        console.log(this.props)
        return (
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>{this.props.location.pathname}</Breadcrumb.Item>
            </Breadcrumb>

        );
    }
}

export default SiteLocation