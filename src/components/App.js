import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Monster from './Monster'

import m1 from '../images/m1.png'
import m2 from '../images/m2.png'
import m3 from '../images/m3.png'
import m4 from '../images/m4.png'
import m5 from '../images/m5.png'
import m6 from '../images/m6.png'
import m7 from '../images/m7.png'
import m8 from '../images/m8.png'
import m9 from '../images/m9.png'

import './App.css';

export class App extends Component {

    constructor(props) {
        super(props)
        this.startTimer = 2000
        this.startGame = this.startGame.bind(this)
        this.endGame = this.endGame.bind(this)
        this.handleMonsterClick = this.handleMonsterClick.bind(this)
        this.addMonster = this.addMonster.bind(this)
        this.handleGameOver = this.handleGameOver.bind(this)
        this.state = {
            bestenListe:[],
            punkte:0,
            gameOver:false,
            monsters:[],
            gameStart:false,
            timeInterval:this.startTimer
        }
        this.monsterIMGArray = [m1,m2,m3,m4,m5,m6,m7,m8,m9]
    }

    componentDidUpdate() {
        let monsterLength = this.state.monsters.length
        if (monsterLength !== 0 && monsterLength%5 === 0) {
            clearInterval(this.gameTimeId)
            this.gameTimeId = setInterval(() => this.addMonster(), this.state.timeInterval)
        }
    }

    componentWillUnmount() {
        this.endGame()
    }

    startGame() {
        this.setState({
            gameStart: true,
            gameOver: false
        })
        this.gameTimeId = setInterval(() => this.addMonster(), this.startTimer)
    }

    endGame() {
        clearInterval(this.gameTimeId)
    }

    handleGameOver() {
        this.endGame()
        this.setState((prevState) => ({
            bestenListe: prevState.bestenListe.concat(prevState.punkte),
            gameStart: false,
            gameOver: true,
            monsters: [],
            timeInterval:this.startTimer,
            punkte:0
        }))
    }

    handleMonsterClick(event) {
        var monsterId = event.currentTarget.id
        const newMonsters = this.state.monsters
        newMonsters[monsterId].visible = false
        this.setState((prevState) => ({
            punkte: prevState.punkte + 1,
            monsters: newMonsters
        }))
    }

    addMonster() {
        let monsterLength = this.state.monsters.length
        let newTimeInterval = this.state.timeInterval
        if ((monsterLength+1)%5 === 0) {
            newTimeInterval = newTimeInterval*(2/3)
        }  
        const randomIMG = Math.floor(Math.random() * 9)
        const randomTop = Math.floor(Math.random() * 530)
        const randomLeft = Math.floor(Math.random() * 600)
        let newMonster = {
            img: this.monsterIMGArray[randomIMG],
            top: randomTop,
            left: randomLeft,
            visible: true
        }
        this.setState((prevState) => ({
            monsters: prevState.monsters.concat(newMonster),
            timeInterval:newTimeInterval
        }))
    }

    render() {
        return (
            <Container>
                <h1>Monsterparty</h1>
                <hr />
                <Row>
                    <Col><img className='prevMonster' alt="m1" src={m1} /></Col>
                    <Col><img className='prevMonster' alt="m2" src={m2} /></Col>
                    <Col><img className='prevMonster' alt="m3" src={m3} /></Col>
                    <Col><img className='prevMonster' alt="m4" src={m4} /></Col>
                    <Col><img className='prevMonster' alt="m5" src={m5} /></Col>
                    <Col><img className='prevMonster' alt="m6" src={m6} /></Col>
                    <Col><img className='prevMonster' alt="m7" src={m7} /></Col>
                    <Col><img className='prevMonster' style={{width: '4.5rem'}} alt="m8" src={m8} /></Col>
                    <Col><img className='prevMonster' alt="m9" src={m9} /></Col>
                </Row>
                <hr />
                <span>Du hast 2 Sekunden Zeit jedes Monster zu beruhigen.</span><br />
                <span>(Klicke auf das Monster mit der Maus, für jedes Monster bekommst du 1 Punkt)</span>
                <hr />
                {!this.state.gameOver ?
                <h2>Punkte: {this.state.punkte}</h2>
                : <h2>Bestes Ergebnis: {Math.max.apply(Math, this.state.bestenListe)}</h2>
                }
                <hr />
                {!this.state.gameOver ?
                <div className='gameMap'>
                    {this.state.monsters.map((monster,index) => (
                        this.state.monsters[index].visible ?
                        <Monster key={index} id={index} pic={monster.img} top={monster.top} left={monster.left} onClick={this.handleMonsterClick} onGameOver={this.handleGameOver}/>
                        : ''
                    ))}
                </div>
                : <div>
                    <h1 style={{color: 'red'}}>! - GAME OVER - !</h1>
                </div>}
                <hr />
                <Button variant="success" onClick={this.startGame} disabled={this.state.gameStart}>Start Game</Button>
            </Container>
        )
    }
}

export default App
