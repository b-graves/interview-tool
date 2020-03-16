import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Responses from './Responses';

import { getComponents, deleteComponent, updateComponent } from '../../actions/components';
import { getGroups } from '../../actions/groups';

import { Navigator, Page, Button, Toolbar, BackButton, Card, Splitter, SplitterContent, SplitterSide } from 'react-onsenui';
import Content from '../layout/Content'

import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus } from 'react-icons/fi';

import { getResponses } from '../../actions/responses';
import { getRecordings } from '../../actions/recordings';

import ReactPlayer from 'react-player'
import { IoMdPlay, IoMdPause } from "react-icons/io";

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Themes from './Themes'
import ThemeResults from './ThemeResults'

import Players from "./Players"

import { Timeline, Bookmark as Moment, Marker } from 'react-vertical-timeline';
import "react-vertical-timeline/style.css"

class SessionResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            moment: 0,
            ready: false,
            playing: false,
            recording: this.getRecording(0)
        }
        this.progressClick = this.progressClick.bind(this);
        this.progressClickAndScroll = this.progressClickAndScroll.bind(this);
    }


    componentDidMount() {
        this.props.getComponents(this.props.planId);
        this.props.getGroups(this.props.planId);
        this.props.getResponses(this.props.participant.id);
        this.props.getRecordings(this.props.participant.id);
    }


    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleProgress = state => {
        this.setProgress(this.state.recording.start + state.playedSeconds)
    }

    getRecording(moment) {
        return this.props.recordings.find(recording => recording.start <= moment && recording.stop >= moment)
    }

    handleSeek = moment => {

        if (this.state.recording && this.state.ready) {
            let seconds = moment - this.state.recording.start;
            if (seconds < 1) {
                seconds = 0;
            }
            this.player.seekTo(parseFloat(seconds));
        }

    }

    handleOnReady = () => {
        this.setState({ ready: true });
        // let seconds = this.state.moment - this.state.recording.start;
        // this.player.seekTo(parseFloat(seconds));
    }

    ref = player => {
        this.player = player
    }

    getReponse(moment) {
        return this.props.responses.find((response, index) => response.moment <= moment && (index === this.props.responses.length - 1 || this.props.responses[index + 1].moment > moment))
    }

    getReponseByComponent(component) {
        return this.props.responses.find((response, index) => response.component == component.id)
    }

    scrollTo(response) {
        scroller.scrollTo(response.id, {
            duration: 750,
            smooth: true,
            containerId: "responsesContainer",
            offset: -20
        })
    }

    progressClick(progress) {
        let moment = (progress / 100) * this.props.participant.duration;
        let recording = this.getRecording(moment)
        this.setState({
            progress,
            moment,
            recording
        }, () => this.handleSeek(moment));
    }

    progressClickAndScroll(progress) {
        let moment = (progress / 100) * this.props.participant.duration;
        let recording = this.getRecording(moment)
        let response = this.getReponse(moment)
        if (response !== undefined) {
            this.scrollTo(response)
        }
        this.setState({
            progress,
            moment,
            recording
        }, () => this.handleSeek(moment));
    }

    setProgress(moment) {
        let response = this.getReponse(moment)
        if (response !== undefined) {
            this.scrollTo(response)
        }
        this.setState({
            progress: this.calculatePercentage(moment),
            moment: moment
        });

    }

    handleSetActive = to => {
        console.log(to);
    }

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    colorNames = ["white", "purple", "dark-blue", "light-blue", "green", "yellow", "red"]

    priorityIcons = {
        "-2": <FiChevronsDown className="card-priority-icon" />,
        "-1": <FiChevronDown className="card-priority-icon" />,
        1: <FiChevronUp className="card-priority-icon" />,
        2: <FiChevronsUp className="card-priority-icon" />,
    }

    calculatePercentage(moment) {
        return Math.round((moment / this.props.participant.duration) * 100)
    }

    str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    render() {
        let completedComponentCards = {}
        let completedComponents = {}
        let groupColors = {}

        for (let i = 0; i < this.props.groups.length; i++) {
            groupColors[this.props.groups[i].id] = this.props.groups[i].color
        }

        if (this.props.components) {
            this.props.components.forEach((component, index) => {
                completedComponentCards[component.id] = <Card
                    style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                    className={'card__uniform'}
                    onClick={() => {
                        let response = this.getReponseByComponent(component)
                        if (response !== undefined) {
                            this.progressClick(this.calculatePercentage(response.moment));
                        }
                    }}
                >
                    <div className="title">
                        {component.name}
                        {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                    </div>
                </Card>
                completedComponents[component.id] = component;
            })
        }

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Sessions
                        </BackButton>
                    </div>
                    <div className="center">
                        Interview Tool
                    </div>
                </Toolbar>}>
                <Splitter>
                    <SplitterContent>
                        <Page className="element" id="responsesContainer">
                            <Content>
                                <div style={{ display: "none" }}>
                                    {this.state.recording ?
                                        <ReactPlayer
                                            ref={this.ref}
                                            url={this.state.recording.audio}
                                            playing={this.state.playing}
                                            controls={false}
                                            light={false}
                                            loop={false}
                                            onReady={() => this.handleOnReady()}
                                            onStart={() => console.log('onStart')}
                                            onEnded={() => this.setState({ playing: false })}
                                            onBuffer={() => console.log('onBuffer')}
                                            onSeek={e => console.log('onSeek', e)}
                                            onError={e => console.log('onError', e)}
                                            onProgress={this.handleProgress}
                                        />
                                        :
                                        null
                                    }
                                </div>
                                <Responses progressClick={this.progressClick} view={1} completedComponents={completedComponentCards} participant={this.props.participant} />
                                <Themes planId={this.props.planId} />
                                <ThemeResults planId={this.props.planId} />
                            </Content>
                        </Page>
                    </SplitterContent>
                    <SplitterSide
                        side="left"
                        width="13%"
                        isOpen={true}
                        style={{ backgroundColor: "#fafafa" }}
                        collapse={"split"}
                    >
                        <div style={{ paddingRight: "6px" }}>
                            <Timeline
                                height={600}
                                onSelect={this.progressClickAndScroll}
                                progress={this.state.progress}
                            >
                                {this.props.responses.map(response =>
                                    <div className={this.colorNames[groupColors[completedComponents[response.component].group]] + "-marker"}>
                                        <Moment onSelect={(progress) => { this.progressClick(progress); this.scrollTo(response) }} progress={this.calculatePercentage(response.moment)}>
                                        </Moment>
                                    </div>
                                )}
                                {this.props.recordings.map(recording => {
                                    let start = this.calculatePercentage(recording.start);
                                    let stop = this.calculatePercentage(recording.stop);
                                    return <div className="timeline-progress timeline-recording" style={{ height: (stop - start) + "%", top: start + "%" }}></div>
                                })}
                                {this.state.progress < 100 ?
                                    <div className="timeline-timer" style={{ height: this.state.progress + "%" }}>
                                        <span>{this.str_pad_left(Math.floor(this.state.moment / 60), '0', 2)}:{this.str_pad_left(Math.floor(this.state.moment % 60), '0', 2)}</span>
                                    </div>
                                    : null}
                                <div className="timeline-timer" style={{ height: "100%" }}>
                                    <span>{this.str_pad_left(Math.floor(this.props.participant.duration / 60), '0', 2)}:{this.str_pad_left(Math.floor(this.props.participant.duration % 60), '0', 2)}</span>
                                </div>
                            </Timeline>
                            <div style={{ opacity: this.state.recording ? 1 : 0, padding: "10px 20px", fontSize: "40px" }}>
                                {this.state.playing ?
                                    <IoMdPause onClick={this.handlePlayPause} />
                                    :
                                    <IoMdPlay onClick={this.handlePlayPause} />
                                }
                            </div>
                        </div>
                    </SplitterSide>
                </Splitter>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
    groups: state.groups.groups,
    responses: state.responses.responses,
    recordings: state.recordings.recordings
});


export default connect(mapStateToProps, { getComponents, deleteComponent, updateComponent, getGroups, getResponses, getRecordings })(SessionResults)
