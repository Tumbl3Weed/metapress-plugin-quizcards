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
        keywords: [],
        scheme: 0
    }



    /** Called when the card window is shown */
    componentDidMount() {

        this.topic = this.props.topic || 'all'
        this.time = this.props.time ? this.props.time * 1000 : 30000

        this.getTopic(this.topic)
        this.getScheme()
    }

    getScheme() {
            this.setState({scheme: Math.floor(Math.random() * 6)})
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
      
        const colors = [
            {
             main: '#e86a77',
             title: '#e5aab2',
             heading: '#9d3a3b',
             titlebg: '#c6484a'
            },
            {
             main: '#61ddbc',
             title: '#a3fce4',
             heading: '#1b7b65',
             titlebg: '#35ba9b'
            },
            {
                main: '#fbd277',
                title: '#f0daaa',
                heading: '#ac7f29',
                titlebg: '#f5b945'
               },
               {
                main: '#b4df80',
                title: '#d1f4a6',
                heading: '#5e8a33',
                titlebg: '#89c053'
               },
               {
                main: '#b3a4ee',
                title: '#d5ccf8',
                heading: '#664ea1',
                titlebg: '#9579da'
               },
               {
                main: '#a9b0bb',
                title: '#bcc7d8',
                heading: '#333942',
                titlebg: '#424852'
               },
        ]

        //return <></>
        return <div style={{boxShadow: '10px 10px 20px black', height: '100%', borderRadius: '20px'}} className="App">
                <div style={{ display:'flex', flexDirection: 'row', borderRadius: '20px', height: '100%'}} id="quiz-card">
                    <div style={{display: 'flex', width: '60px', backgroundColor: `${colors[this.state.scheme].titlebg}`, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
                        <div style={{ transform: 'rotate(-90deg)', fontSize: '32px', color: `${colors[this.state.scheme].title}` }}>QuickCardz</div>
                    </div>
                    <div style={{padding: '10px 0px', backgroundColor: `${colors[this.state.scheme].main}`, width:'300px'}}>
                        <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: '26px', fontWeight: '900', textTransform: 'uppercase', color: `${colors[this.state.scheme].heading}` }}>{this.topic}</div>
                        <ul>
                        
                        {this.state.stage == 'start' ?
                            this.state.keywords.map((topic) =>
                                <li style={{color: 'white', margin: '5px 50px'}}>{topic}</li>
                            ) :
                        this.state.stage == 'finish' ?
                            <div style={{padding: '0 30', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <label style={{color:'white', textAlign: 'center', display: 'block', padding: '10px 0px'}} for="quizcards-select">How many did you successfully explain?</label>

                                <select style={{color:'white', backgroundColor: `${colors[this.state.scheme].titlebg}`, display: 'flex', width: '80%', textAlign: 'center', margin: '10px', padding: '15px', borderRadius: '10px' }} name="Amount" id="quizcards-select">
                                    
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                                <div id="finish-btn">
                                    <button style={{margin: 10, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', background: 'transparent', cursor: 'pointer', fontSize: '24px', textTransform: 'uppercase', border: 'none', textDecoration: 'underline'}}onClick={() => this.finishSelection()}>Finish</button>
                                </div>
                            </div> : null}
                        </ul>

                    </div>
                    <div style={{display: 'flex', width: '60px', backgroundColor: `${colors[this.state.scheme].titlebg}`, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}>
                        <div style={{ transform: 'rotate(90deg)', fontSize: '32px', color: `${colors[this.state.scheme].title}` }}>QuickCardz</div>
                    </div>
                </div>
            </div>
    }
            
      

 }