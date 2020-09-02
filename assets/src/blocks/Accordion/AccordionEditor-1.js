import React from "react";
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionFrontend } from './AccordionFrontend';
// import { Cards } from './Cards';
import {
  TextControl,
  TextareaControl,
  PanelBody,
  Tooltip,
  Button,
  Card,
  CardHeader,
  CardBody
} from '@wordpress/components';

const { RichText } = wp.editor;
const { __ } = wp.i18n;

export class AccordionEditor extends Component {
  constructor(props) {
    super(props);
    this.handleErrors = this.handleErrors.bind(this);
    this.toAttribute = this.toAttribute.bind(this);
  }

  toAttribute(attributeName) {
    const { setAttributes } = this.props;
    return value => {
      setAttributes({ [attributeName]: value });
    }
  }

  handleErrors( errors ) {
    this.setState( errors );
  }

  //renders the settings
  renderEdit() {
    const { attributes } = this.props;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Setting', 'planet4-blocks-backend')}>
            <div>
              <p> Settings are showing OK. </p>
            </div>

          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  }

//renders the editor view
  renderView() {
    const { attributes } = this.props;
    console.log(this.props.attributes + "renderView(props)");
    

    let cardsData = {
      "first": {
        "id": 1,
        "title": 'first title',
        "text": 'firstext'
        },
        "second": {
          "id": 2,
          "title": 'second title',
          "text": 'second text'
        },
        "third": {
          "id": 3,
          "title": 'third title',
          "text": 'third text'
        }
      };

    // let headingIds = ['headingOne', 'headingTwo', 'headingThree', 'headingFour', 'headingFive' ];
    // let collapseIds = ['collapseOne', 'collapseTwo', 'collapseThree', 'collapseFour', 'collapseFive' ];


    return <Fragment>
      
      <div className="accordion-block">
        <header>
          <RichText
            tagName="h2"
            className="page-section-header"
            placeholder={__('Enter title of the block here', 'planet4-blocks-backend')}
            value={attributes.accordion_title}
            onChange={this.toAttribute('accordion_title')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            characterLimit={60}
            multiline="false"
          />
        </header>
        <RichText
          tagName="p"
          className="page-section-description"
          placeholder={__('Enter description here', 'planet4-blocks-backend')}
          value={attributes.accordion_description}
          onChange={this.toAttribute('accordion_description')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting
          characterLimit={400}
          multiline="p"
        />
      </div>
      
      <div>


        <div className="accordion" id="planet4-accordion">
          <Card className="card mb-0 accordion_card">
          {Object.keys(cardsData).map(keyOuter => {
            return Object.keys(cardsData[keyOuter]).map(keyInner => {
              return (
                <CardHeader 
                >
                  <Button
                  className="accordion-btn btn-link card-header collapsed"
                  data-toggle="collapse" 
                  data-target="#collapseOne" 
                  //create here dynamic variable name  let collapseId = "collapse" + [..colapseIds]
                  aria-expanded="true" 
                  aria-controls="collapseOne">
                    <a 
                    className="card-title">
                    <RichText
                      key={`${keyInner}-${keyOuter}`}
                      tagName="h3"
                      className="accordion-headline my-0"
                      placeholder={__('Enter the headline here for Section 1', 'planet4-blocks-backend')}
                      value={attributes.accordion_headline}
                      onChange={this.toAttribute('accordion_headline')}
                      keepPlaceholderOnFocus={true}
                      withoutInteractiveFormatting
                      characterLimit={60}
                      multiline="false"
                    /> {cardsData[keyOuter][keyInner]}
                    </a>
                  </Button>
                  
                </CardHeader>
                
              );
            });
          })}
            <CardHeader id={cardsData.id}>
              
            </CardHeader>  
          {/* // )} */}
          {/* // {collapseIds.map((collapseId, i) =>  */}
            
          
          </Card>

          <br/>
          {/* <Button onClick={addMore}>
            Add one more row
          </Button> */}
        </div>
      </div>
      <AccordionFrontend isEditing {...attributes} />
    </Fragment>;
  }

  render() {
    return (
      <Fragment>
        {
          this.props.isSelected
            ? this.renderEdit()
            : null
        }
        {this.renderView()}
      </Fragment>
    );
  }
}
