import React from "react";
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionFrontend } from './AccordionFrontend';
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

  addOneRow ( ) {
    

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
    console.log(this.props.toString() + "renderView(props)");

    const headingIds = ["headingOne", "headingTwo", "headingThree", "headingFour", "headingFive"];
    const collapseIds = ["textOne", "textTwo", "textThree", "textFour", "textFive"];
    // const listIds = headingIds.map((headingId) =>  
    // <CardHeader id={headingId}/>);
    // for (let i = 0; i < 5; i++) {
    //   headingIds.push(<CardHeader key={i} />);
    // }
    

    $(".accordion_card").each(function(){
      // Test if the div element is empty if so hide from frontend
      if($(this).is(":empty")){
          $(this).css("display", "hidden");
      }
    });

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
      <div >

      {/* <button onClick={toggleRow}>Click me</button> */}
        <div className="accordion" id="planet4-accordion">
          <Card className="accordion_card">
          {headingIds.map((headingId, i) => <CardHeader id={headingId} key={i}>
            <Button
              className="accordion-btn btn-link"
              data-toggle="collapse" 
              data-target="#collapseOne" 
              aria-expanded="true" 
              aria-controls="collapseOne">
                <RichText
                  tagName="h3"
                  className="accordion-headline my-0"
                  placeholder={__('Enter the headline here for Section 1', 'planet4-blocks-backend')}
                  value={attributes.accordion_headline}
                  onChange={this.toAttribute('accordion_headline')}
                  keepPlaceholderOnFocus={true}
                  withoutInteractiveFormatting
                  characterLimit={60}
                  multiline="false"
                />
            </Button>
          </CardHeader>  
          )}
          {collapseIds.map((collapseId, i) => 
            <CardBody 
            id={collapseId} key={i} 
            className="collapse show"
            aria-labelledby="headingOne" 
            data-parent="#planet4-accordion"
            >
            <RichText
              tagName="p"
              className="accordion-text"
              placeholder={__('Enter the text here.. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'planet4-blocks-backend')}
              value={attributes.accordion_text}
              onChange={this.toAttribute('accordion_text')}
              keepPlaceholderOnFocus={true}
              multiline="p"
            />
            </CardBody>
          )}
          </Card>
          {/* <button onClick={addOneRow}>
            Add one more row
          </button> */}
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
