import { AccordionEditor } from './AccordionEditor';
import { frontendRendered } from '../frontendRendered';
import { CSS_VARIABLES_ATTRIBUTE } from '../CssVariablesAttribute';


const BLOCK_NAME = 'planet4-blocks/accordion';

export class AccordionBlock {
  constructor() {
    const { registerBlockType, unregisterBlockStyle, registerBlockStyle } = wp.blocks;
    const { __ } = wp.i18n;

    const attributes = {
      accordion_title: {
        type: 'string',
        default: '',
        selector: '.page-section-header'
      },
      accordion_description: {
        type: 'string',
        default: '',
        selector: '.page-section-description'
      },
      headline_id: {
        type: 'number',
        default: 1,
      },
        // accordion_button: {
        //   type: 'boolean',
        //   source: 'attribute',
        //   selector: 'button',
        //   attribute: 'collapse'
        // },
        // accordion_open: {
        //   type: 'boolean',
        //   default: false,
        //   source: 'attribute',
        //   selector: 'button',
        //   attribute: 'collapse'
        // },
        accordion_headline: {
          type: 'string',
          default: '',
          selector: '.accordion-btn'
        },
        accordion_text: {
          type: 'string',
          default: '',
          selector: '.accordion-text'
        },
        // accordion_icon: {
        //   type: 'string',
        //   default: '',
        //   selector: '.accordion-icon'
        // },
        accordion_style: { // Needed to convert existing blocks
          type: 'string',
          default: ''
        },

      // },
      css_variables: CSS_VARIABLES_ATTRIBUTE,
    };

    registerBlockType( BLOCK_NAME, {
      title: __( 'Accordion', 'planet4-blocks-backend' ),
      icon: 'menu',
      category: 'planet4-blocks',
      keywords: [
        __(this.BLOCK_NAME),
        __('faq')
      ],
      attributes,
      deprecated: [
        {
          attributes,
          save() {
            return null;
          },
        }
      ],
      edit: ( { isSelected, attributes, setAttributes } ) => {
        return <AccordionEditor
          attributes={attributes}
          setAttributes={setAttributes}
          isSelected={ isSelected }
        />
      },
      save: frontendRendered( BLOCK_NAME )
    });

    // Remove the default style since it's the same as "text only"
    unregisterBlockStyle(BLOCK_NAME, 'default');

    // Add our custom styles
    registerBlockStyle(
      BLOCK_NAME,
      [
        {
          name: 'minimal',
          label: __( 'Minimal', 'planet4-blocks' ),
          isDefault: true
        },
        {
          name: 'solid',
          label: __( 'Solid color Background', 'planet4-blocks' )
        },
        {
          name: 'gradient',
          label: __( 'Gradient color Background', 'planet4-blocks' )
        }
      ]
    );
  };
}
