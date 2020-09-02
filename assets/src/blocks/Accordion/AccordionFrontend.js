import { Component, Fragment } from '@wordpress/element';

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
      className,
      title,
      description,
      text,
      isEditing
    } = this.props;

      

    let style = this.props.style || 'minimal'; // Needed to convert existing blocks
    if (className) {
      style = className.split('is-style-')[1];
    }

    let accordionClassName = `block accordion-block my-1 accordion-style-${style}`;
    if (isEditing) accordionClassName += ` editing`;

    const onPanelClick = () => {
    let acc = document.getElementsByClassName('accordion');
    let i;
    console.log("onPanelClick OK");
    console.log(acc);

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
        <section className={accordionClassName}>
            <button className="accordion" onClick={onPanelClick}>
              <strong> The awesone headline here..</strong> 
            </button>
            <div className="panel">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </section>
      </Fragment>
    )
  }
}
