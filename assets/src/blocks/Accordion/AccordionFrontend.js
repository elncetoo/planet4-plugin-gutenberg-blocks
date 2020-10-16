/* eslint-disable camelcase */
import { Component, Fragment } from '@wordpress/element'
import { Button } from '@wordpress/components'

window.$ = $ || jQuery
window.dataLayer = window.dataLayer || []

export class AccordionFrontend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      accordions: [],
      select: '',
      isToggleOn: false
    }
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
    this.handleReadMoreClick = this.handleReadMoreClick.bind(this)
    this.onChangeContent = this.onChangeContent.bind(this)
  }

  // {/* Toggle panels accordion - bug event opens all on click */}
  handleCollapseClick () {
  // handleCollapseClick(index) {

    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    // select:this.state.accordions[index]
    }))

    window.onclick = e => {
    // console.log($(e.target).text());
      const txt = $(e.target).text().substring(0, 50) + '...'
      if (this.state.isToggleOn === false) {
        $('.panel').addClass('visibility')
        $('.accordion-headline:before').toggleClass('rotate')
        dataLayer.push({
          event: 'Close FAQ',
          Question: txt
        })
      } else {
      // const panel = $('.accordion').next($('.panel'));
        $('.panel').removeClass('visibility')
        $('.accordion-headline:before').toggleClass('rotate')
        dataLayer.push({
          event: 'Expand FAQ',
          Question: txt
        })
      }
    }
  }

  handleReadMoreClick () {
    window.onclick = e => {
      const btnRead = $(e.target.parentNode).text().substring(0, 50) + '...'
      dataLayer.push({
        event: 'Read More FAQ',
        Question: btnRead
      })
    }
  }

  componentDidMount () {
    // Rendering component`s values depending on props
    this._isMounted = true
    return () => {
      isMounted = false
    }
    this.handleCollapseClick()
    this.onChangeContent()
    console.log('component Did Mount OK')
    console.log(this._isMounted)
  }

  componentWillUnmount () {
    this._isMounted = false
    console.log('component Did UnMount OK')
    console.log(this._isMounted)
    this.handleCollapseClick()
    this.handleReadMoreClick()
  }

  componentDidUpdate () {
    console.log('componentDidUpdate OK')
  }

  onChangeContent () {
    console.log('onChangeContent OK')

    this.handleCollapseClick()
    this.handleReadMoreClick()
  }

  render () {
    const {
      // className,
      accordion_title,
      accordion_description,
      accordion_rows,
      // accordion_id,
      accordion_headline,
      accordion_text,
      // accordion_btn_show,
      accordion_btn_text,
      accordion_btn_url,
      button_link_new_tab,
      isEditing
    } = this.props
    // const accordions = this.state.accordions;

    { /* Toggle panels accordion - bug event opens on second click because of the double onclick event */ }
    // let acc = document.getElementsByClassName('accordion');
    // let p;
    // for (p = 0; p < acc.length; p++) {
    //   acc[p].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     let panel = this.nextElementSibling;
    //     panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
    //     //panel.classList.contains('visibility') ? panel.remove('visibility') : panel.add('visibility');
    //   });
    // }

    return (

      <Fragment>

        <section className="block accordion-block my-0 py-0">
          <header>
            {accordion_title && !isEditing &&
            <h2 className="page-section-header">{accordion_title}</h2>
            }
          </header>
          {accordion_description && !isEditing &&
            <p className="page-section-description" dangerouslySetInnerHTML={{ __html: accordion_description }} />
          }

          {/* {accordions.map(index => */}
          <div className="accordion-content my-0 py-0">
            <div className="accordion"
            // onClick={this.handleCollapseClick(index)}
              onClick={this.handleCollapseClick}
            >
              {this.state.isToggleOn ? <p>true</p> : <p>false</p>}
              {accordion_headline && !isEditing &&
                <h4 className="accordion-headline" name={accordion_headline}>{accordion_headline}</h4>
              }
            </div>
            <div className="panel visibility">
              {accordion_text && !isEditing &&
                <p className="accordion-text" dangerouslySetInnerHTML={{ __html: accordion_text }} />
              }
              {accordion_btn_text &&
                <a className="btn btn-secondary btn-accordion"
                  onClick={this.handleReadMoreClick}
                  href={accordion_btn_url}
                  target={ button_link_new_tab ? '_blank' : '' }
                >
                  {accordion_btn_text}
                </a>
              }
            </div>
          </div>
          {/* )
        } */}
        </section>

      </Fragment>
    )
  }
}
