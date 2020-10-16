/* eslint-disable no-unused-vars */
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
      accordion_rows: {
        type: 'array',
        default: [],
        selector: '.accordion-content',
      },
      accordion_id: {
        type: 'integer',
        default: 1,
      },
      accordion_headline: {
        type: 'string',
        default: '',
        selector: '.accordion-headline',
      },
      accordion_text: {
        type: 'string',
        default: '',
        selector: '.accordion-text',
      },
      accordion_btn_text: {
        type: 'string',
        default: '',
      },
      accordion_btn_url: {
        type: 'url',
        default: '',
      },
      // accordion_icon: {
      //   type: 'string',
      //   default: '',
      //   selector: '.accordion-icon'
      // },
      // accordion_style: { // Needed to convert existing blocks
      //   type: 'string',
      //   default: ''
      // },

      // },
      // css_variables: CSS_VARIABLES_ATTRIBUTE,
    };

    registerBlockType( BLOCK_NAME, {
      title: __( 'Accordion', 'planet4-blocks-backend' ),
      icon: 'menu',
      category: 'planet4-blocks-beta',
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

        function addAccRow(){
          const {accordion_rows} = attributes;

          if ( accordion_rows.length < 5 ) {
            setAttributes({
              accordion_rows: [...accordion_rows, {
                accordion_id:'',
                accordion_headline:'',
                accordion_text:'',
                accordion_btn_text:'',
                accordion_btn_url:'',
              }]
            });
          }
        }

        function removeAccRow() {
          setAttributes({accordion_rows: attributes.accordion_rows.slice(0, -1) });
        }

        return <AccordionEditor
          attributes={attributes}
          setAttributes={setAttributes}
          isSelected={ isSelected }
          addAccRow={addAccRow}
          removeAccRow={removeAccRow}
        />;
      },
      save: frontendRendered( BLOCK_NAME )
    });

    // Remove the default style since it's the same as "minimal"
    // unregisterBlockStyle(BLOCK_NAME, 'default');

    // // Add our custom styles
    // registerBlockStyle(
    //   BLOCK_NAME,
    //   [
    //     {
    //       name: 'minimal',
    //       label: __( 'Minimal', 'planet4-blocks' ),
    //       isDefault: true
    //     },
    //     {
    //       name: 'solid',
    //       label: __( 'Solid color Background', 'planet4-blocks' )
    //     },
    //     {
    //       name: 'gradient',
    //       label: __( 'Gradient color Background', 'planet4-blocks' )
    //     }
    //   ]
    // );
  }
}
