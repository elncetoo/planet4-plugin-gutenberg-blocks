import {frontendRendered} from '../frontendRendered';
import {TimelineEditor} from './TimelineEditor';

const {__} = wp.i18n;
const BLOCK_NAME = 'planet4-blocks/timeline';

const attributes = {
  timeline_title: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
  google_sheets_url: {
    type: 'string',
  },
  language: {
    type: 'string',
    default: 'en',
  },
  timenav_position: {
    type: 'string',
  },
  start_at_end: {
    type: 'boolean',
  },
};

export class TimelineBlock {
  constructor() {
    const {registerBlockType} = wp.blocks;

    registerBlockType(BLOCK_NAME, {
      title: __('Timeline', 'p4ge'),
      icon: 'clock',
      category: 'planet4-blocks',

      // Transform the shortcode into a Gutenberg block
      // this is used when a user clicks "Convert to blocks"
      // on the "Classic Editor" block
      transforms: {
        from: [
          {
            type: 'shortcode',
            // Shortcode tag can also be an array of shortcode aliases
            tag: 'shortcake_timeline',
            attributes: {
              timeline_title: {
                type: 'string',
                shortcode: function (attributes) {
                  return attributes.named.timeline_title;
                }
              },
              description: {
                type: 'string',
                shortcode: function (attributes) {
                  return attributes.named.description;
                }
              },
              google_sheets_url: {
                type: 'string',
                shortcode: function (attributes) {
                  return attributes.named.google_sheets_url;
                }
              },
              language: {
                type: 'array',
                shortcode: function (attributes) {
                  return attributes.named.language;
                }
              },
              timenav_position: {
                type: 'array',
                shortcode: function (attributes) {
                  return attributes.named.timenav_position;
                }
              },
              start_at_end: {
                type: 'boolean',
                shortcode: function (attributes) {
                  return attributes.named.start_at_end;
                }
              }
            },
          },
        ]
      },
      attributes,
      edit: ({ isSelected, attributes, setAttributes }) => {
        return <TimelineEditor
          attributes={attributes}
          setAttributes={setAttributes}
          isSelected={isSelected}
        />
      },
      save: frontendRendered(BLOCK_NAME),
      deprecated: [
        {
          attributes,
          save() {
            return null;
          }
        }
      ]
    });
  };
}
