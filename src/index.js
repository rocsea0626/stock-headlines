import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker';
import { App } from './components'
import { Provider } from 'react-redux'
import store from './store'

if (process.env.NODE_ENV === 'production') {
    const noop = () => { }
    ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace',
    ].forEach((method) => {
        window.console[method] = noop
    })
}
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
