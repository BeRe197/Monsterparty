import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar'

export class Monster extends Component {

    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
        this.state = {
            time:2
        }
    }

    componentDidMount() {
        this.timeId = setInterval(() => this.tick(), 1000)
    }

    tick() {
        if (this.state.time === 0) {
            this.props.onGameOver()
        }
        this.setState((prevState) => ({
           time: prevState.time - 1 
        }))
    }

    componentWillUnmount() {
        clearInterval(this.timeId)
    }

    render() {

        const {id, pic, onClick, top, left} = this.props

        return (
            <button id={id} style={{top: top, left: left, position: 'absolute', margin: '0'}} className='monsterBtn' onClick={onClick}>
                <img alt='' src={pic} style={{width: '100%'}}/>
                <ProgressBar now={this.state.time*50} label={`${this.state.time}s`} />
            </button>
        )
    }
}

Monster.propTypes = {
    id:PropTypes.number,
    pic:PropTypes.string,
    onClick:PropTypes.func,
    top:PropTypes.number,
    left:PropTypes.number
}

export default Monster
