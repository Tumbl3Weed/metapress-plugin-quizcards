/**
 * Allows users to earn points from activities.
 */
import ReactDOM from 'react-dom'
import React from 'react'

import CardUI from "./card"

 export default class QuizCardsModifier {

    /** Modifier info */
    name = 'Quiz Cards'

    get settings () {
        let settings = [
            { type: 'description', name: `Select the topic for the quiz cards.` },
            { type: 'select', id: 'quizcard_topic_select', name: 'Topic', labels: ['All', 'Information Technology', 'Movies', 'Music', 'Sports', 'Geography'], values: ['all','it', 'movies', 'music', 'sports','geography'], default: 'all', help: 'Select the topic for the card.' },
            { type: 'number', id: 'quizcard_time', name: 'Timer (s)', placeholder: 30, help: 'Time alowed to do the card.' },
            { type: 'number', id: 'quizcard_points', name: 'Points per answer', placeholder: 10, help: 'Points awarded for each correct item.' },
        ]
        return settings
    }

    /** Entity */
    entity = null

    /** Called on load */
    onLoad() {

    }

    /** Called when the modifier has been unloaded */
    onUnload() {

    }

    /** Called when the object has been clicked */
    async onClick() {

       this.container = document.createElement('div')
       this.container.id = 'quizCardDiv'
       this.container.style.position = 'absolute'
       this.container.style.left = '50%'
       this.container.style.top = '50%'
       this.container.style.width =  '380px'
       this.container.style.height =  '200px'
       this.container.style.marginLeft = '-190px'
       this.container.style.marginTop = '-100px'


       metapress.contentDiv.appendChild(this.container)

       ReactDOM.render(<CardUI topic={this.entity.quizcard_topic_select} time={this.entity.quizcard_time} points={this.entity.quizcard_points} />, this.container)

        //metapress.contentDiv.appendChild(this.container)
       // ReactDOM.render(card,this.container)
    }


}

