import  { Component } from 'react';

// const CardsList = React.createClass({
export class CardsList extends React.Component {
    getInitialState() {
        return { cards: [] };
    }

    addCard() {
        const cards = this.state.cards.concat();
        cards.push({ name: "", value: undefined });
        this.setState({ cards });
    }

    renderCards() {
        const linkCard = (index, prop) => {
            return {
                value: this.state.cards[index][prop],
                requestChange: (value) => {
                    const cards = this.state.cards.concat();
                    cards[index][prop] = value;
                    this.setState({ cards });
                },
            }
        };

        const cards = [];
        return (
            this.state.cards.map((props, index) => (
                <div key={index}>
                    <input valueLink={linkCard(index, "name")} />
                    <input valueLink={linkCard(index, "value")} />
                </div>
            ))
        ),

        render() {
            return (
                <div>
                    { this.renderCards() }
                    <div onClick={this.addCard}>+</div>
                </div>
            )
        }

    }
}

