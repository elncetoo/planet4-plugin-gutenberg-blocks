import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionFrontend } from './AccordionFrontend';
// import { Cards } from './Cards';
import {
  PanelBody,
  Tooltip,
  Button,
  Card,
  CardHeader,
  CardBody
} from '@wordpress/components';

const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

export class AccordionEditor extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
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
    let { accordion_rows } = attributes;

    accordion_rows = (attributes) => {
      let accordion_rows = [];
      if (attributes.accordion_headline.headline_1){
        let accordion_row = {
          accordion_headline: attributes.headline_1,
          accordion_text: attributes.text_1 || ''
        };
        accordion_rows.push(Object.assign({}, accordion_row));

        if (attributes.accordion_headline.headline_2){
          let accordion_row = {
            accordion_headline: attributes.headline_2,
            accordion_text: attributes.text_2 || ''
          };
          accordion_rows.push(Object.assign({}, accordion_row));

          if (attributes.accordion_headline.headline_3){
            let accordion_row = {
              accordion_headline: attributes.headline_3,
              accordion_text: attributes.text_3 || ''
            };
            accordion_rows.push(Object.assign({}, accordion_row));

            if (attributes.accordion_headline.headline_4){
              let accordion_row = {
                accordion_headline: attributes.headline_4,
                accordion_text: attributes.text_4 || ''
              };
              accordion_rows.push(Object.assign({}, accordion_row));

              if (attributes.accordion_headline.headline_5){
                let accordion_row = {
                  accordion_headline: attributes.headline_5,
                  accordion_text: attributes.text_5 || ''
                };
                accordion_rows.push(Object.assign({}, accordion_row));
                
              }
            }
          }
        }
      }
      return accordion_rows;
    }

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings', 'planet4-blocks-backend')}>
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
    const { attributes, className } = this.props;
    console.log(  "Attributes are: " +  this.props.name );

    return <Fragment>
        <section>
          <div className="block accordion-block my-3">
            <header>
              <RichText
                tagName="h2"
                className="page-section-header"
                placeholder={__('Enter title of the block here', 'planet4-blocks-backend')}
                value={attributes.accordion_title}
                onChange={this.toAttribute('accordion_title')}
                keepPlaceholderOnFocus={true}
                withoutInteractiveFormatting
                characterLimit={100}
                multiline="false"
              />
            
            <RichText
              tagName="p"
              className="page-section-description"
              placeholder={__('Enter description here', 'planet4-blocks-backend')}
              value={attributes.accordion_description}
              onChange={this.toAttribute('accordion_description')}
              keepPlaceholderOnFocus={true}
              withoutInteractiveFormatting
              characterLimit={400}
              multiline="false"
            />
            </header>
            <div className="accordion-content my-2">
              <header className="accordion active">
                <RichText
                  tagName="h4"
                  className="accordion-headline"
                  placeholder={__('Enter the headline here for the section', 'planet4-blocks-backend')}
                  value={attributes.accordion_headline}
                  onChange={this.toAttribute('accordion_headline')}
                  keepPlaceholderOnFocus={true}
                  withoutInteractiveFormatting
                  // characterLimit={100}
                  multiline="false"
                /> 
              </header>
              <div className="panel"> 
                <RichText
                  tagName="p"
                  className="accordion-text"
                  placeholder={__('Enter some text here.. ', 'planet4-blocks-backend')}
                  value={attributes.accordion_text}
                  onChange={this.toAttribute('accordion_text')}
                  keepPlaceholderOnFocus={true}
                  multiline="P"
                />
                {/* <button className="btn btn-secondary btn-accordion">
                  Read More
                </button> */}
              </div>
            </div>
          
          </div>
        </section>

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

