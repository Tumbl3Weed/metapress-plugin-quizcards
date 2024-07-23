//
// My MetaPress Plugin
import React from 'react';

import metadata from '../package.json'
import CardModifier from './CardModifier';

export default class QuizCardsPlugin extends React.PureComponent {

    // Plugin information
    id              = metadata.metapress?.id || metadata.name
    name            = metadata.metapress?.name || metadata.name
    description     = metadata.metapress?.description || metadata.description
    version         = metadata.version
    provides        = [ 'quizcards', 'modifier:quizcards' ]
    requires        = [ 'entities' ]

    /** Create modifier */
    createModifier() {
        return new CardModifier()
    }

    /** Called on load */
    onLoad() {


    }

    /** AI knowledge base */
    $ai_getKnowledgeBaseEntries = () => [

        // Info
        {
            id: `${this.id}:quizcards`,
            type: 'info',
            name: 'Quiz Cards',
            tags: 'quizcards, how to play quiz cards',
            content: `
                Quiz Cards is a fun way to learn and test your knowledge. You can play this game with others in the same world.
                The person who picks a card has a certain time limit to explain the keywords/phrases on the card to the others without
                saying the words on the card. They get points for every keywords/phrases they succesfully explain.
            `
        },

    ]

  
}   
