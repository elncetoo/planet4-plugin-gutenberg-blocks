import { Component, Fragment } from '@wordpress/element';

export class AccordionFrontend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeContent = this.onChangeContent.bind(this);

    console.log("this.props.name is: " + this.props.name);
  }

// export const AccordionFrontend = (props) => {
//   const {
//     accordion_title,
//     accordion_description,
//     accordion_headline,
//     accordion_text,
//     accordion_icon,
//   } = props;



  componentDidMount() {
    // Rendering component`s values depending on props
    this.onChangeContent();
    console.log("componentDidMount OK");
  }

  componentDidUpdate() {
    // Update completed and remaining values depending on props
    const { accordion_title, accordion_description, accordion_headline, accordion_text } = this.props;
    // if (target !== prevTarget || completed !== prevCompleted || completed_api !== prevCompletedApi) {
    //   this.calculateRemaining();
    // }
    console.log("componentDidUpdate OK");
  }

  onChangeContent() {
    const { accordion_title, accordion_description, accordion_headline, accordion_text } = this.props;
    // const { accordion_title, accordion_description, accordion_headline, accordion_text } = this.state;
    // const COUNTER_TEXT = {
    //   '%completed%': `<span class="counter-target">${completed}</span>`,
    //   '%target%': `<span class="counter-target">${target || 0}</span>`,
    //   '%remaining%': `<span class="counter-target">${remaining}</span>`
    // };

    // return text.replace(/%completed%|%target%|%remaining%/gi, match => COUNTER_TEXT[match]);
   return console.log("onChangeContent OK");

  }

  render() {
    const {
      className,
      accordion_title,
      accordion_description,
      accordion_headline,
      accordion_text,
      accordion_icon,
      isEditing
    } = this.props;
    
    const { attributes } = this.state;

    function toggleRow(){
      let acc = $(".accordion-btn");
      let i;
  
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          let accordionText = this.nextElementSibling;
          if (panel.style.maxHeight) {
            accordionText.style.maxHeight = null;
          } else {
            accordionText.style.maxHeight = accordionText.scrollHeight + "px";
          } 
        });
      }
    }

    let style = this.props.style || 'plain'; // Needed to convert existing blocks
    if (className) {
      style = className.split('is-style-')[1];
    }

    let accordionClassName = `block container counter-block counter-style-${style}`;
    if (isEditing) accordionClassName += ` editing`;

    return (
      <Fragment>
        <section className={accordionClassName}>
          <div className="container">
            {accordion_title && !isEditing &&
              <header>
                <h2 className="page-section-header">{accordion_title}</h2>
              </header>
            }
            {accordion_description && !isEditing &&
              <p className="page-section-description" dangerouslySetInnerHTML={{ __html: accordion_description }} />
            }
          </div>
          <div className="container">
            {accordion_headline && !isEditing &&
              <header>
                <h2 className="page-section-header">{accordion_headline}</h2>
              </header>
            }
            {accordion_text && !isEditing &&
              <p className="page-section-description" dangerouslySetInnerHTML={{ __html: accordion_text }} />
            }
          </div>

          {/* <div className="content-counter">
            {(style === 'bar' || style === 'en-forms-bar') &&
              <div className="progress-container">
                <div className={`progress-bar ${style === 'en-forms-bar' ? 'enform-progress-bar' : ''}`} style={{ width: `calc(${percent}% + 20px)` }} />
              </div>
            }
            {style === 'arc' &&
              <svg className="progress-arc" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 14">
                <path className="background" d="M 2 12 A 1 1 0 1 1 22 12" />
                <path className="foreground" d="M 2 12 A 1 1 0 1 1 22 12"
                  strokeDasharray={arcLength}
                  strokeDashoffset={`${(1 - percent / 100) * arcLength}`} />
              </svg>
            }
            {text &&
              <div
                className={`counter-text ${100 <= percent ? 'counter-text-goal_reached' : ''}`}
                dangerouslySetInnerHTML={{ __html: this.getCounterText() }}
              />
            }
          </div> */}
        </section>
      </Fragment>
    )
  }
}
