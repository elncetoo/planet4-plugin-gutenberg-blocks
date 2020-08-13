import {RawHTML, Component, Fragment} from '@wordpress/element';
import {
  // CheckboxControl,
  TextControl as BaseTextControl,
  TextareaControl as BaseTextareaControl,
	PanelBody,
	SelectControl,
	CheckboxControl,
	Tooltip
  // Tooltip
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { URLInput } from '../../components/URLInput/URLInput';
import { TimelineFrontend } from './TimelineFrontend';

const { RichText } = wp.blockEditor;
const { __ } = wp.i18n;

const languages = [
  {label: 'Afrikaans', value: 'af'},
  {label: 'Arabic', value: 'ar'},
  {label: 'Armenian', value: 'hy'},
  {label: 'Basque', value: 'eu'},
  {label: 'Belarusian', value: 'be'},
  {label: 'Bulgarian', value: 'bg'},
  {label: 'Catalan', value: 'ca'},
  {label: 'Chinese', value: 'zh-cn'},
  {label: 'Croatian / Hrvatski', value: 'hr'},
  {label: 'Czech', value: 'cz'},
  {label: 'Danish', value: 'da'},
  {label: 'Dutch', value: 'nl'},
  {label: 'English', value: 'en'},
  {label: 'English (24-hour time)', value: 'en-24hr'},
  {label: 'Esperanto', value: 'eo'},
  {label: 'Estonian', value: 'et'},
  {label: 'Faroese', value: 'fo'},
  {label: 'Farsi', value: 'fa'},
  {label: 'Finnish', value: 'fi'},
  {label: 'French', value: 'fr'},
  {label: 'Frisian', value: 'fy'},
  {label: 'Galician', value: 'gl'},
  {label: 'Georgian', value: 'ka'},
  {label: 'German / Deutsch', value: 'de'},
  {label: 'Greek', value: 'el'},
  {label: 'Hebrew', value: 'he'},
  {label: 'Hindi', value: 'hi'},
  {label: 'Hungarian', value: 'hu'},
  {label: 'Icelandic', value: 'is'},
  {label: 'Indonesian', value: 'id'},
  {label: 'Irish', value: 'ga'},
  {label: 'Italian', value: 'it'},
  {label: 'Japanese', value: 'ja'},
  {label: 'Korean', value: 'ko'},
  {label: 'Latvian', value: 'lv'},
  {label: 'Lithuanian', value: 'lt'},
  {label: 'Luxembourgish', value: 'lb'},
  {label: 'Malay', value: 'ms'},
  {label: 'Myanmar', value: 'my'},
  {label: 'Nepali', value: 'ne'},
  {label: 'Norwegian', value: 'no'},
  {label: 'Polish', value: 'pl'},
  {label: 'Portuguese', value: 'pt'},
  {label: 'pt-br', value: 'Portuguese (Brazilian)'},
  {label: 'Romanian', value: 'ro'},
  {label: 'Romansh', value: 'rm'},
  {label: 'Russian', value: 'ru'},
  {label: 'Serbian - Cyrillic', value: 'sr-cy'},
  {label: 'Serbian - Latin', value: 'sr'},
  {label: 'Sinhalese', value: 'si'},
  {label: 'Slovak', value: 'sk'},
  {label: 'Slovenian', value: 'sl'},
  {label: 'Spanish', value: 'es'},
  {label: 'Swedish', value: 'sv'},
  {label: 'Tagalog', value: 'tl'},
  {label: 'Tamil', value: 'ta'},
  {label: 'Taiwanese', value: 'zh-tw'},
  {label: 'Telugu', value: 'te'},
  {label: 'Thai', value: 'th'},
  {label: 'Turkish', value: 'tr'},
  {label: 'Ukrainian', value: 'uk'},
  {label: 'Urdu', value: 'ur'},
];

const position = [
	{label: 'Bottom', value: 'bottom'},
	{label: 'Top', value: 'top'},
]

let url_desc  = __(
	'Enter the URL of the Google Sheets spreadsheet containing your timeline data.',
	'p4ge'
);
url_desc += '<br><a href="https://timeline.knightlab.com/#make" target="_blank" rel="noopener noreferrer">';
url_desc += __(
	'See the TimelineJS website for a template GSheet.',
	'p4ge'
);
url_desc += '</a><br>';
url_desc += __(
	'Copy this, add your own timeline data, and publish to the web.',
	'p4ge'
);
url_desc += '<br>';
url_desc += __(
	"Once you have done so, use the URL from your address bar (not the one provided in Google's 'publish to web' dialog).",
	'p4ge'
);

const renderEdit = (attributes, toAttribute) => {
	return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Setting', 'planet4-blocks-backend')}>
					<URLInput
						label={__('Google Sheets URL', 'p4ge')}
						placeholder={__('Enter URL', 'p4ge')}
						help={ <RawHTML>{url_desc}</RawHTML> }
						value={attributes.google_sheets_url}
						onChange={toAttribute('google_sheets_url')}
					/>

					<SelectControl
						label={__('Language', 'p4ge')}
						value={attributes.language}
						options={languages}
						onChange={toAttribute('language')}
					/>

					<SelectControl
						label={__('Timeline navigation position', 'p4ge')}
						value={attributes.timenav_position}
						options={position}
						onChange={toAttribute('timenav_position')}
					/>

					<CheckboxControl
						label={__('Start at end', 'p4ge')}
						help={__('Begin at the end of the timeline', 'p4ge')}
						value={attributes.start_at_end}
						checked={attributes.start_at_end}
						onChange={toAttribute('start_at_end')}
					/>

				</PanelBody>
			</InspectorControls>
		</Fragment>
	)
}

const renderView = ({ attributes }, toAttribute) => {
  return (
    <Fragment>
      <Tooltip text={__('Edit text', 'planet4-blocks-backend')}>
        <header className="articles-title-container">
          <RichText
            tagName="h2"
            className="page-section-header"
            placeholder={__('Enter title', 'planet4-blocks-backend')}
            value={attributes.timeline_title}
            onChange={toAttribute('timeline_title')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            characterLimit={40}
            multiline="false"
          />
        </header>
      </Tooltip>
      <RichText
        tagName="p"
        className="page-section-description"
        placeholder={__('Enter description', 'planet4-blocks-backend')}
        value={attributes.description}
        onChange={toAttribute('description')}
        keepPlaceholderOnFocus={true}
        withoutInteractiveFormatting
        characterLimit={200}
      />
      <TimelineFrontend {...attributes} />
		</Fragment>
	)
}

export const TimelineEditor = (props) => {
	console.log('props', props)
  const { isSelected, attributes, setAttributes } = props;

  const toAttribute = attributeName => value => setAttributes({ [attributeName]: value });

  return (
    <div>
      {
        isSelected && renderEdit(attributes, toAttribute)
      }
      {renderView({ attributes }, toAttribute)}
    </div>
  );
}