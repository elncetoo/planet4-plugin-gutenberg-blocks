import { useState } from "react";
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
// import { add } from "lodash";



const { RichText } = wp.editor;
const { __ } = wp.i18n;



export class AccordionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSelect = this.onSelect.bind(this);
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

  onSelect(value) {
    /* Some code for when buttons are clicked */
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

        // create an obj with json in the array with 
        let headingIds = ['headingOne', 'headingTwo', 'headingThree', 'headingFour', 'headingFive' ];
        let collapseIds = ['collapseOne', 'collapseTwo', 'collapseThree', 'collapseFour', 'collapseFive' ];
        let cardTitle = ['titleOne', 'titleTwo', 'titleThree', 'titleFour', 'titleFive' ];
        let cardText = ['textOne', 'textTwo', 'textThree', 'textFour', 'textFive' ];
        
        const cardObj = {
          type: 'div',
          props: {
            card_id: headingIds,
            collapse_id: collapseIds,
            card_title: cardTitle, 
            card_text : cardText
            
          }
        };
    
     // console.log(cardObj + "cardObj(props)");


    // headingIds.map((headingId) => <CardHeader id={headingId}/>);
    // for (let i = 0; i < 5; i++) {
    //   headingIds.push(<CardHeader key={i} />);
    // }
    // collapseIds.map((collapseId) => <CardBody id={collapseId}/>);
    // for (let ind = 0; ind < 5; ind++) {
    //   collapseIds.push(<CardBody key={ind} />);
    // }

    // $(".accordion_card").each(function(){
    //   // Test if the div element is empty if so hide from frontend
    //   if($(this).is(":empty")){
    //       $(this).css("display", "hidden");
    //   }
    // });


    //dynamically creating the variable names for the CARD`s ids
  function addMore(){
    //   let temp1,
    //       temp2,
    //       i1,
    //       i2;

    //   for (i1 = 1; i1 < 6; i1 += 1) {
    //       temp1 = {};
    //       temp1['heading' + i1] = i1;
    //       headingIds.push(temp1);
    //   }
    //   for (i2 = 1; i2 < 6; i2 += 1) {
    //     temp2 = {};
    //     temp2['collapse' + i2] = i2;
    //     collapseIds.push(temp2);
    //  }
    //   console.log(headingIds);
    //   console.log(collapseIds);
  };

  function addCard(){

    let obj = {
      length: 0,
  
      addElem: function addElem(elem) {
          // obj.length is automatically incremented 
          // every time an element is added.
          const addHeading = ['headingThree'];
          const addCollapseId = ['textThree'];
          [].push.call(this, elem)
      }
    }
    
    // Let's add some empty objects just to illustrate.
    obj.addElem({})
    console.log(obj.length);


    // const addHeading = ['headingThree'];
    // const addCollapseId = ['textThree'];

    // Array.prototype.push.apply(addHeading, addCollapseId);

    // console.log(addHeading);
    // console.log(addCollapseId);

    // console.log(headingIds);
    // console.log(collapseIds);
  }

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

      {/* <Cards name="Test works" value="Also works" className="card"/> */}

        <div className="accordion" id="planet4-accordion">
          <Card className="card mb-0 accordion_card">
          {headingIds.map((headingId, i) => 
            <CardHeader id={headingId} key={i}>
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
                  </a>
              </Button>
            </CardHeader>  
          )}
          {collapseIds.map((collapseId, ind) => 
            <CardBody id={collapseId} key={ind} 
            className="card-body collapse"
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

          <br/>
          <Button onClick={addCard}>
            Add one more row
          </Button>
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
