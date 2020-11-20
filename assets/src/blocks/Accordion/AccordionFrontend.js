import { useState } from '@wordpress/element';

window.dataLayer = window.dataLayer || [];

export const AccordionFrontend = ({ title, description, tabs }) => {
  const [openTab, setOpenTab] = useState(-1);

  const toggleTab = (index, headline) => {
    const textToSend = headline.length > 50 ? `${headline.substring(0, 50)}...` : headline;
    if (index === openTab) {
      setOpenTab(-1);
      dataLayer.push({
        event: 'Close FAQ',
        Question: textToSend
      });
    } else {
      setOpenTab(index);
      dataLayer.push({
        event: 'Expand FAQ',
        Question: textToSend
      });
    }
  }

  const handleReadMoreClick = buttonText => {
    const textToSend = buttonText.length > 50 ? `${buttonText.substring(0, 50)}...` : buttonText;
    dataLayer.push({
      event: 'Read More FAQ',
      Question: textToSend
    });
  }

  return (
    <section className="block accordion-block my-0 py-0">
      {title &&
        <header>
          <h2 className="page-section-header">{title}</h2>
        </header>
      }
      {description &&
        <p className="page-section-description" dangerouslySetInnerHTML={{ __html: description }} />
      }
      {tabs.map(({ headline, text, button_text, button_url, button_new_tab }, index) => (
        <div className="accordion-content my-0 py-0">
          {headline &&
            <h4
              className="accordion-headline"
              onClick={() => toggleTab(index, headline)}
              name={headline}
            >
              {headline}
            </h4>
          }
          <div className={`panel ${openTab === index ? '' : 'panel-hidden'}`}>
            {text &&
              <p className="accordion-text" dangerouslySetInnerHTML={{ __html: text }} />
            }
            {button_text &&
              <a className="btn btn-secondary btn-accordion"
                onClick={() => handleReadMoreClick(button_text)}
                href={button_url}
                target={button_new_tab ? '_blank' : ''}
              >
                {button_text}
              </a>
            }
          </div>
        </div>
      ))}
    </section>
  );
}
