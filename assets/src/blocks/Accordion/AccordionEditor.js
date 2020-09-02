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

const { RichText } = wp.editor;
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
    const { attributes,className } = this.props;

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
    const { attributes, className } = this.props;
    console.log(  "Attributes are: " +  this.props.name );

    return <Fragment>
      <section>
        <div className="block accordion-block">
          <div className="drop-shadow">
            <div className="my-1 accordion-headline">
            <RichText
              tagName="h3"
              className="accordion mt-1 pt-2"
              placeholder={__('Enter the headline here for the section', 'planet4-blocks-backend')}
              value={attributes.accordion_headline}
              onChange={this.toAttribute('accordion_headline')}
              keepPlaceholderOnFocus={true}
              withoutInteractiveFormatting
              characterLimit={60}
              multiline="false"
            /> 
            </div>
            <RichText
              tagName="p"
              className="accordion-text"
              placeholder={__('Enter some text here.. ', 'planet4-blocks-backend')}
              value={attributes.accordion_text}
              onChange={this.toAttribute('accordion_text')}
              keepPlaceholderOnFocus={true}
              multiline="p"
            />
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

