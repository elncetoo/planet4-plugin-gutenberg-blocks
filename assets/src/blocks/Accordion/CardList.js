import React, { Component, PropTypes } from 'react';
import { cards } from './Cards';

const CardList = ({ cards }) => {
    const cardsArray = cards.map(card => (
      <Card
        title={card.title}
        text={card.text}
        id={card.id} />
    ));
  
    return (
      <div>
        {cardsArray}
      </div>
    );
  };

