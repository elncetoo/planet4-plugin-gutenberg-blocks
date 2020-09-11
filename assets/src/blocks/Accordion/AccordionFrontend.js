import { Component, Fragment } from '@wordpress/element';
import { Button } from '@wordpress/components';

export class AccordionFrontend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeContent = this.onChangeContent.bind(this);

  }

  componentDidMount() {
    // Rendering component`s values depending on props
    this.onChangeContent();
    console.log("componentDidMount OK");

  }

  componentDidUpdate() {

    console.log("componentDidUpdate OK");
  }

  onChangeContent() {
    console.log("onChangeContent OK");


  }


  render() {
    const {
      // className,
      accordion_title,
      accordion_description,
      accordion_rows,
      accordion_headline,
      accordion_text,
      isEditing
    } = this.props;

      

    // let style = this.props.style || 'minimal'; // Needed to convert existing blocks
    // if (className) {
    //   style = className.split('is-style-')[1];
    // }

    // let accordionClassName = `block accordion-block my-1 accordion-style-${style}`;
    // if (isEditing) accordionClassName += ` editing`;

    const onPanelClick = () => {
      let acc = document.getElementsByClassName('accordion');
      let i;
      // for (i = 0; i < acc.length; i++) {
      //   acc[i].addEventListener("click", function() {
      //     this.classList.toggle("active");
      //     let panel = this.nextElementSibling;
      //     panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
      //   });
      // }

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          let panel = this.nextElementSibling;
          panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
        });
      }

    }; 
  

    return (
      <Fragment>
        <section className="block accordion-block my-3">
            <header>
              {accordion_title && !isEditing &&
                <h2 className="page-section-header">{accordion_title}</h2>
              }
              {/* <h2 className="page-section-header"> Test Title</h2> */}
              {accordion_description && !isEditing &&
                <p className="page-section-description" dangerouslySetInnerHTML={{ __html: accordion_description }} />
              }
              {/* <p className="page-section-description"> Test Description</p> */}
            </header>

            <div className="accordion-content my-2">
              <header className="accordion" onClick={onPanelClick}>   
                           
                  {/* <h4 className="accordion-headline"> 
                    1. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </h4>  */}
                  {accordion_headline && !isEditing &&
                    <h4 className="accordion-headline">{accordion_headline}</h4>
                  }
                
              </header>
              <div className="panel">
                {accordion_text && !isEditing &&
                  <p className="accordion-text" dangerouslySetInnerHTML={{ __html: accordion_text }} />
                }
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
                <button className="btn btn-secondary btn-accordion">
                  Read More
                </button>
              </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
