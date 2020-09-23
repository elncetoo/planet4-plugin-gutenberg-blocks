import { Component, Fragment } from '@wordpress/element';
import { Button } from '@wordpress/components';

window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];


export class AccordionFrontend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    this.handleCollapseClick = this.handleCollapseClick.bind(this);
    this.handleReadMoreClick = this.handleReadMoreClick.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);

  }
  

  handleCollapseClick() { 
    // const acc = this._acc.children;
    // for (let i = 0; i < acc.length; i++) {
    //   let a = acc[i];
    //   a.onclick = () => a.classList.toggle("active");
    // }
    this.setState(state => ({      
      isToggleOn: !state.isToggleOn     
    })); 

    
      window.onclick = e => {
          // console.log(e.target); // to get the element
          console.log($(e.target).text());

          let label = $(e.target).text();
          // $(".accordion_headline").one("click", function(event) {
          //   event.preventDefault();
          // });

          if (this.state.isToggleOn === false) {

            // $('.panel').css('display', 'none'); 
            $('.panel').addClass('visibility');

            dataLayer.push({
              'event': 'Close FAQ',
              'Question': label
            });
          
            
          } else {
           // const panel = $('.accordion').next($('.panel'));
           $('.panel').removeClass('visibility');

           dataLayer.push({
             'event': 'Expand FAQ',
             'Question': label
           });

          }
      //   let accordion_headline = $('.accordion_headline');
      // let label = 
      // this.props.accordion_headline.name.toString();

          
      }
      
      // this.state.isToggleOn ? panel.css('display', 'block') : panel.css('display', 'none');       
       // panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
 

  }

  handleReadMoreClick(){
    window.onclick = e => {

      console.log($(e.target).text());

      let btnRead = $(e.target).text();
      dataLayer.push({
        'event': 'Read More FAQ',
        'Question': btnRead
      }); 
  }

     
  }


  componentDidMount() {
    // Rendering component`s values depending on props
    this._isMounted = true;
    return () => {
      isMounted = false;
    }
    this.handleCollapseClick();
    this.onChangeContent();
    console.log("component Did Mount OK");
    console.log(this._isMounted);

  }

  componentWillUnmount() {
    this._isMounted = false;
    console.log("component Did UnMount OK");
    console.log(this._isMounted);
    this.handleCollapseClick();


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
      accordion_id,
      accordion_headline,
      accordion_text,
      accordion_open,
      isEditing,
    } = this.props;

      
   {/* Change styles */}
    // let style = this.props.style || 'minimal'; // Needed to convert existing blocks
    // if (className) {
    //   style = className.split('is-style-')[1];
    // }

    // let accordionClassName = `block accordion-block my-1 accordion-style-${style}`;
    // if (isEditing) accordionClassName += ` editing`;

    {/* Toggle panelsaccordion */}
      // let acc = document.getElementsByClassName('accordion');
      // let p;
      // for (p = 0; p < acc.length; p++) {
      //   acc[p].addEventListener("click", function() {
      //     this.classList.toggle("active");
      //         let panel = this.nextElementSibling;
      //           panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";

      //           // panel.style.visibility === "hidden" &&  panel.style.opacity === "0" 
      //           // ? panel.style.visibility === "visible" &&  panel.style.opacity === "1" 
      //           // : panel.style.visibility === "hidden" &&  panel.style.opacity === "0";
      //   });
      // }


    // document.querySelector('.accordion-content').addEventListener('click', event => {
    //  let panel = $(this).find('.panel');
    //  panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
    // })

    

    

    return (
      
      <Fragment>
        <section className="block accordion-block my-3">
            <header>
              {accordion_title && !isEditing &&
                <h2 className="page-section-header">{accordion_title}</h2>
              }
              {accordion_description && !isEditing &&
                <p className="page-section-description" dangerouslySetInnerHTML={{ __html: accordion_description }} />
              }
            </header>

            <div className="accordion-content my-2">
              <header className="accordion" 
              onClick={this.handleCollapseClick}
              > 
              {/* {this.state.isToggleOn ? panel.style.display = "none" : panel.style.display = "block"}   */}
                {accordion_headline && !isEditing &&
                  <h4 className="accordion-headline" name={accordion_headline}>{accordion_headline}</h4>
                }
              </header>
              {/* {isVisible && <MyElement/>} */}
              <div className="panel visibility">
                {accordion_text && !isEditing &&
                  <p className="accordion-text" dangerouslySetInnerHTML={{ __html: accordion_text }} />
                }
                <button className="btn btn-secondary btn-accordion" 
                // name={this.accordion_headline} 
                onClick={this.handleReadMoreClick}> 
                  Read More
                </button>
              </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
