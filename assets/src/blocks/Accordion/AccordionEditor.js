import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import withCharacterCounter from '../../components/withCharacterCounter/withCharacterCounter';
import { URLInput } from '../../components/URLInput/URLInput';
import {
  PanelBody,
  CheckboxControl,
  TextControl as BaseTextControl,
  Tooltip,
  Button,
} from '@wordpress/components';

const { RichText } = wp.blockEditor;
const { __ } = wp.i18n;
const TextControl = withCharacterCounter(BaseTextControl);

// Renders the editor view
const renderView = (attributes, setAttributes, isSelected) => {
  const toAttribute = attributeName => value => setAttributes({
    [attributeName]: value
  });

  const updateTabAttribute = (attributeName, index) => value => {
    const newTabs = attributes.tabs;
    newTabs[index][attributeName] = value;
    setAttributes({
      tabs: newTabs
    });
  };

  return (
    <div className="block accordion-block my-3">
      <Tooltip text={__('Leave empty the title and/or description of this block if you want to hide them on the front page.', 'planet4-blocks-backend')}>
        <header>
          <RichText
            tagName="h2"
            className="page-section-header mt-3"
            placeholder={__('Enter title', 'planet4-blocks-backend')}
            value={attributes.title}
            onChange={toAttribute('title')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            characterLimit={60}
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
      {attributes.tabs.map((tab, index) => (
        <div key={`accordion-content-${index}`} className="accordion-content my-2">
          <div className="accordion card-header">
            <RichText
              tagName="h4"
              className="accordion-headline"
              placeholder={__('Enter headline', 'planet4-blocks-backend')}
              value={tab.headline}
              onChange={updateTabAttribute('headline', index)}
              keepPlaceholderOnFocus={true}
              withoutInteractiveFormatting
              multiline="false"
            />
          </div>
          <div className={`panel ${isSelected ? '' : 'panel-hidden'}`}>
            <RichText
              tagName="p"
              className="accordion-text"
              placeholder={__('Enter text', 'planet4-blocks-backend')}
              value={tab.text}
              onChange={updateTabAttribute('text', index)}
              keepPlaceholderOnFocus={true}
            />
            <Tooltip text={__('Leave the button text empty to hide the button on the front page.', 'planet4-blocks-backend')}>
              <div className="btn btn-secondary btn-accordion">
                <RichText
                  tagName="div"
                  placeholder={__('Optional button', 'planet4-blocks-backend')}
                  value={tab.button_text}
                  onChange={updateTabAttribute('button_text', index)}
                  keepPlaceholderOnFocus={true}
                  withoutInteractiveFormatting
                  multiline="false"
                />
              </div>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}

// Renders the sidebar settings
const renderEdit = (attributes, setAttributes) => {

  const addTab = () => setAttributes({ tabs: [...attributes.tabs, {}] });

  const removeTab = () => setAttributes({ tabs: attributes.tabs.slice(0, attributes.tabs.length - 1) });

  const updateTabAttribute = (attributeName, index) => value => {
    const newTabs = attributes.tabs;
    newTabs[index][attributeName] = value;
    setAttributes({
      tabs: newTabs
    });
  };

  return (
    <InspectorControls>
      <PanelBody title={__('Setting', 'planet4-blocks-backend')}>
        {attributes.tabs.map((tab, index) => (
          <div key={`tab-${index}`}>
            <p>{`Tab ${index + 1}`}</p>
            <URLInput
              label={__('Button link', 'planet4-blocks-backend')}
              value={tab.button_url}
              onChange={updateTabAttribute('button_url', index)}
            />
            <CheckboxControl
              label={__('Open in a new tab', 'planet4-blocks-backend')}
              help={__('Open button link in new tab', 'planet4-blocks-backend')}
              value={tab.button_new_tab}
              checked={tab.button_new_tab}
              onChange={updateTabAttribute('button_new_tab', index)}
            />
          </div>
        ))}
        <Button
          isPrimary
          onClick={addTab}
          style={{ marginRight: 10 }}
        >
          {__('Add tab', 'planet4-blocks-backend')}
        </Button>
        <Button
          isSecondary
          disabled={attributes.tabs.length === 0}
          onClick={removeTab}
        >
          {__('Remove tab', 'planet4-blocks-backend')}
        </Button>
      </PanelBody>
    </InspectorControls>
  );
}

export const AccordionEditor = ({ attributes, isSelected, setAttributes }) => (
  <Fragment>
    {isSelected && renderEdit(attributes, setAttributes)}
    {renderView(attributes, setAttributes, isSelected)}
  </Fragment>
);
