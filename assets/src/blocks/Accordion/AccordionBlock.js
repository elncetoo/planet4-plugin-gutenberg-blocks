import { Component } from '@wordpress/element';
import { AccordionEditor } from './AccordionEditor';
import { frontendRendered } from '../frontendRendered';

const BLOCK_NAME = 'planet4-blocks/accordion';

export class AccordionBlock extends Component {
  constructor (props) {
    super(props);
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;

    const attributes = {
      title: {
        type: 'string',
        default: '',
      },
      description: {
        type: 'string',
        default: '',
      },
      tabs: {
        type: 'array',
        default: [],
      },
    };

    registerBlockType(BLOCK_NAME, {
      title: __('Accordion', 'planet4-blocks-backend'),
      icon: 'menu',
      category: 'planet4-blocks-beta',
      keywords: [
        __(BLOCK_NAME),
        __('faq'),
        __('collapsible')
      ],
      attributes,
      edit: AccordionEditor,
      save: frontendRendered(BLOCK_NAME),
      deprecated: [
        {
          attributes,
          save () {
            return null;
          }
        }
      ],
    });
  }
}
