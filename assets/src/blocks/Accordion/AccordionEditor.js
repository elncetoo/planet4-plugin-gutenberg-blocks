import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionFrontend } from './AccordionFrontend';
// import { Cards } from './Cards';
import {
  PanelBody,
  Tooltip,
  Button,
  Dashicon
} from '@wordpress/components';

const { RichText, RichTextToolbarButton, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

export class AccordionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    this.handleErrors = this.handleErrors.bind(this);
    this.toAttribute = this.toAttribute.bind(this);
    this.handleCollapseClick = this.handleCollapseClick.bind(this);

  }

  handleCollapseClick() { 
    this.setState(state => ({      
    isToggleOn: !state.isToggleOn    
    }));  

    this.state.isToggleOn === true ?  $('.panel').removeClass('visibility') :  $('.panel').addClass('visibility');
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

  // addAccRow(){
  //   const {accordion_rows} = attributes;

  //   if ( accordion_rows.length < 5 ) {
  //     setAttributes({
  //       accordion_rows: [...accordion_rows, {
  //         accordion_id:'',
  //         accordion_headline:'',
  //         accordion_text:'',
  //       }]
  //     });
  //   }

  //   return <div>
  //           <RichText
  //           id={attributes.accordion_id}
  //           className="accordion-headline"
  //           placeholder={__('Enter the headline here for %s section', 'planet4-blocks-backend').replace('%s', index+1)}
  //           value={attributes.accordion_headline}
  //           onChange={this.toAttribute('accordion_headline')}
  //           keepPlaceholderOnFocus={true}
  //           />
  //           </div>
  // }

  // removeAccRow() {
  //   setAttributes({accordion_rows: attributes.accordion_rows.slice(0, -1) });
  // }
  

  // getAccordionRows(accordion_rows) {
    // accordion_rows  (attributes)  {
    //   let accordion_rows = [];
    //   if (attributes.accordion_headline.headline_1) {
    //     let accordion_row = {
    //       accordion_id: attributes.id_1,
    //       accordion_headline: attributes.headline_1,
    //       accordion_text: attributes.text_1 || '',
    //       accordion_btn_text: attributes.btn_text_1,
    //       accordion_btn_url: attributes.btn_url_1
    //     };
    //     accordion_rows.push(Object.assign({}, accordion_row));
    //   }

    //   if (attributes.accordion_headline.headline_2) {
    //     let accordion_row = {
    //       accordion_id: attributes.id_2,
    //       accordion_headline: attributes.headline_2,
    //       accordion_text: attributes.text_2 || '',
    //       accordion_btn_text: attributes.btn_text_2,
    //       accordion_btn_url: attributes.btn_url_2
    //     };
    //     accordion_rows.push(Object.assign({}, accordion_row));
    //   }

    //   if (attributes.accordion_headline.headline_3) {
    //     let accordion_row = {
    //       accordion_id: attributes.id_3,
    //       accordion_headline: attributes.headline_3,
    //       accordion_text: attributes.text_3 || '',
    //       accordion_btn_text: attributes.btn_text_3,
    //       accordion_btn_url: attributes.btn_url_3
    //     };
    //     accordion_rows.push(Object.assign({}, accordion_row));
    //   }

    //   if (attributes.accordion_headline.headline_4) {
    //     let accordion_row = {
    //       accordion_id: attributes.id_4,
    //       accordion_headline: attributes.headline_4,
    //       accordion_text: attributes.text_4 || '',
    //       accordion_btn_text: attributes.btn_text_4,
    //       accordion_btn_url: attributes.btn_url_4
    //     };
    //     accordion_rows.push(Object.assign({}, accordion_row));


    //   }

    //   if (attributes.accordion_headline.headline_5) {
    //     let accordion_row = {
    //       accordion_id: attributes.id_5,
    //       accordion_headline: attributes.headline_5,
    //       accordion_text: attributes.text_5 || '',
    //       accordion_btn_text: attributes.btn_text_5,
    //       accordion_btn_url: attributes.btn_url_5
    //     };
    //     accordion_rows.push(Object.assign({}, accordion_row));

    //   }

    //   return accordion_rows;
    // };


  //renders the settings
  renderEdit() {
    const { attributes } = this.props;


    // let { accordion_rows } = attributes;

    // accordion_rows = this.getAccordionRows(accordion_rows);

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings', 'planet4-blocks-backend')}>
            <div>
              <p> Settings are showing OK. </p>
            </div>
          </PanelBody>
        </InspectorControls>

        {/*
        {[accordion_rows].map((item, index) => {
          return (
            <div key={index}>
               { !item.accordion_headline && !item.accordion_text &&
                <div><b>{__('Please provide a title or a description for this accordion row to be displayed.', 'planet4-blocks-backend')}</b></div>
              } 

            </div>
          );
        })}
      */}
      </Fragment>
    ); 
  }


//renders the editor view
  renderView() {
    const { attributes, className } = this.props;
    console.log(  "Attributes are: " +  this.props.name );

    let { accordion_rows } = attributes;
    // accordion_rows = this.getAccordionRows(accordion_rows);

    return <Fragment>
        <section>
          <div className="block accordion-block my-3">
            <header>
              <RichText
                tagName="h2"
                className="page-section-header mt-3"
                placeholder={__('Enter title for the block or leave empty to hide it.', 'planet4-blocks-backend')}
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
                placeholder={__('Enter the description of the block or leave empty to hide it on the front page.', 'planet4-blocks-backend')}
                value={attributes.accordion_description}
                onChange={this.toAttribute('accordion_description')}
                keepPlaceholderOnFocus={true}
                withoutInteractiveFormatting
                characterLimit={400}
                multiline="false"
              />
            </header>

            {[accordion_rows].map((accordion_row, index) => {
              return (
                <div key={index}>
                  <div className="accordion-content my-2">
                    <div className="accordion card-header"
                        onClick={this.handleCollapseClick}
                        id={attributes.accordion_id, index+1}
                        >
                      <RichText
                        label={__('Row %s: Header', 'planet4-blocks-backend')}
                        tagName="h4"
                        className="accordion-headline"
                        placeholder={__('Write title for the block here', 'planet4-blocks-backend')}
                        value={attributes.accordion_headline}
                        onChange={this.toAttribute('accordion_headline')}
                        keepPlaceholderOnFocus={true}
                        withoutInteractiveFormatting
                        // characterLimit={100}
                        multiline="false"
                      /> 
                    </div>
                    <div className="panel"> 
                      <RichText
                        // id={attributes.accordion_id, index+1}
                        tagName="p"
                        className="accordion-text"
                        placeholder={__('Enter description here', 'planet4-blocks-backend')}
                        value={attributes.accordion_text}
                        onChange={this.toAttribute('accordion_text')}
                        keepPlaceholderOnFocus={true}
                      />
                    <Tooltip text={__('Add button text or leave empty to hide it on the front page.', 'planet4-blocks-backend')}>
                      <div className="btn btn-secondary btn-block">
                        <RichText
                          tagName="div"
                          placeholder={__('Add button text or leave empty to hide it.', 'planet4-blocks-backend')}
                          value={attributes.accordion_btn_text}
                          // href={attributes.accordion_btn_url}
                          onChange={ this.toAttribute('accordion_btn_text') }
                          keepPlaceholderOnFocus={true}
                          withoutInteractiveFormatting
                          multiline="false"
                        />
                      </div>
                    </Tooltip>
                    </div>
                  </div>
                  
                </div>
              );
            })}
            {/* <div className="container"> 
              { accordion_rows.length < 5 && (
                <Tooltip text={__('Add Row', 'planet4-blocks-backend')}>
                  <button
                    className={
                      "btn btn-outline-secondary btn-sm btn-mnml"
                    }
                    onClick={this.props.addAccRow}
                  >
                    {__('Add Row', 'planet4-blocks-backend')} <Dashicon icon={"plus"} size={12} />
                  </button>
                </Tooltip>
              )}

              { accordion_rows.length > 0 && (
                <Tooltip text={__('Remove Row', 'planet4-blocks-backend')}>
                  <button
                    className={ "btn btn-outline-secondary btn-sm btn-mnml" }
                    onClick={this.props.removeAccRow}
                  >
                    {__('Remove Row', 'planet4-blocks-backend')} <Dashicon icon={"minus"} size={12} />
                  </button>
                </Tooltip>
              )}
            </div> */}
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

