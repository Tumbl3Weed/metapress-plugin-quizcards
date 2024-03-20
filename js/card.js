/**
 * User interface for achievement notifications.
 */

 import React, { useState } from 'react'
 import { v4 as uuidv4 } from 'uuid'
 import topics from './topics'

 export default class CardUI extends React.PureComponent {

    topic = 'all'
    time = 30000
    keywords = []
    /** Initial state */
    state = {
        stage: 'start',
        keywords: []
    }

    /** Called when the card window is shown */
    componentDidMount() {

        this.topic = this.props.topic || 'all'
        this.time = this.props.time ? this.props.time * 1000 : 30000

        this.getTopic(this.topic)
    }

    /** Get the random keywords for the topic */
    getTopic(topic) {

        let keywords = []
        if (topic != 'all') {
            let selectedTopic = topics[topic]

            for (let i = 0; i < 5; i++) {
                let randomKeyword = selectedTopic[Math.floor(Math.random() * selectedTopic.length)]
                keywords.push(randomKeyword)
                let index = selectedTopic.indexOf(randomKeyword)
                selectedTopic.splice(index, 1);
            }

        } else {
            let keyTopics = []
            let array = []
            for (let t in topics) {
                array = topics[t]

                for (let i = 0; i < array.length; i++) {
                    keyTopics.push(array[i])
                }
            }

            for (let i = 0; i < 5; i++) {
                let randomKeyword = keyTopics[Math.floor(Math.random() * keyTopics.length)]
                keywords.push(randomKeyword)
                let index = keyTopics.indexOf(randomKeyword)
                keyTopics.splice(index, 1);
            }
        }

        this.setState({keywords})

        setTimeout(() => {
            this.setState({ stage: 'finish' })
        }, this.time)

    }

    finishSelection () {

        let selectElement = document.getElementById("quizcards-select");
        let value = selectElement.value;
        let points = parseInt(this.props.points) * parseInt(value)
        let scoreData = {}

        scoreData.source = 'quizcards' + uuidv4()
        scoreData.points = points

        metapress.plugins.sendEvent('gamification.score', scoreData)

        let div = document.getElementById('quizCardDiv')
        metapress.contentDiv.removeChild(div) 
    }

    /** Render UI */
    render() {
        //return <></>
        return <div style={{boxShadow: '10px 10px 20px black', height: '100%'}} className="App">
                <div style={{backgroundColor: 'white', borderRadius: 5, height: '100%'}} id="quiz-card">
                    <div style={{padding: '24px 0px'}}>
                        {this.state.stage == 'start' ?
                            this.state.keywords.map((topic) =>
                                <div style={{color: 'black', margin: '5px 50px'}}>{topic}</div>
                            ) :
                        this.state.stage == 'finish' ?
                            <div style={{padding: 30}}>
                                <label style={{color:'black', textAlign: 'center', display: 'block', padding: '10px 0px'}} for="quizcards-select">How many did you successfully explain?</label>

                                <select style={{color:'white', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', width: '100%', textAlign: 'center'}} name="Amount" id="quizcards-select">
                                    <option value="0">--Please choose the amount--</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                                <div id="finish-btn">
                                    <button style={{display: 'grid', width: '80%', position: 'absolute', margin: 10, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white'}}onClick={() => this.finishSelection()}>Finish</button>
                                </div>
                            </div> : null}
                    </div>
                </div>
            </div>
    }
            
      

 }