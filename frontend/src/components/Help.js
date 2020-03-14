import React from 'react';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import { FaQuestion } from 'react-icons/fa';

import { Popover, Button } from 'react-onsenui';


export default class Help extends React.Component {

    state = {
        isOpen: false
    }

    btn = null;

    render() {
        return (
            <span>
                <Button
                    modifier="quiet"
                    className="quiet-grey"
                    ref={(btn) => { this.btn = btn; }}
                    onClick={() =>
                        this.setState({ target: this.btn, isOpen: true })
                    }
                    style={{fontSize: "70% !important"}}
                >
                    <FaQuestion className={this.props.extra ? "button-icon-help-extra" : "button-icon-help"} />
                </Button>
                <Popover
                    isOpen={this.state.isOpen}
                    onCancel={() => this.setState({ isOpen: false })}
                    getTarget={() => this.state.target}
                >
                    <div>
                        <p style={{padding: "0px 1em"}}>{this.props.text}</p>
                    </div>
                </Popover>
            </span>
        );
    }
}