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
            { type: 'select', id: 'quizcard_topic_select', name: 'Topic', labels: ['All', 'Information Technology', 'Movies', 'Music', 'Sports', 'Geography', 'Television', 'History', 'Gaming', 'Literature'], values: ['all','it', 'movies', 'music', 'sports','geography', 'television', 'history', 'gaming', 'literature'], default: 'all', help: 'Select the topic for the card.' },
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
       this.container.style.right = '40px'
       this.container.style.bottom = '50px'
       this.container.style.width =  '420px'


       metapress.contentDiv.appendChild(this.container)

       ReactDOM.render(<CardUI topic={this.entity.quizcard_topic_select} time={this.entity.quizcard_time} points={this.entity.quizcard_points} />, this.container)

        //metapress.contentDiv.appendChild(this.container)
       // ReactDOM.render(card,this.container)
    }


}

