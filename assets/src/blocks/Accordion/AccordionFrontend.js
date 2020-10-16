/* eslint-disable camelcase */
import { Component, Fragment } from '@wordpress/element'
import { Button } from '@wordpress/components'

window.$ = $ || jQuery
window.dataLayer = window.dataLayer || []

export class AccordionFrontend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _isMounted: false
    }
    this.handleReadMoreClick = this.handleReadMoreClick.bind(this)
    this.onChangeContent = this.onChangeContent.bind(this)
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
    this.onChangeContent()
    console.log('component Did Mount OK')
    console.log(this._isMounted)
    this._isMounted = true
    return () => {
      this._isMounted = false
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    console.log('component Did UnMount OK')
    console.log(this._isMounted)
    this.handleReadMoreClick()
  }

  onChangeContent () {
    console.log('onChangeContent OK')
    this.handleReadMoreClick()
  }

  render () {
    const {
      accordion_title,
      accordion_description,
      accordion_rows,
      accordion_headline,
      accordion_text,
      // accordion_btn_show,
      accordion_btn_text,
      accordion_btn_url,
      button_link_new_tab,
      isEditing
    } = this.props

    // Toggle panels accordion - bug event opens on second click because of the double onclick event
    const acc = document.getElementsByClassName('accordion')

    for (let p = 0; p < acc.length; p++) {
      acc[p].addEventListener('click', function () {
        this.classList.toggle('active')
        const panel = this.nextElementSibling
        if (panel.style.display === 'block') {
          panel.style.display = 'none'
          window.onclick = e => {
            const txt = $(e.target).text().substring(0, 50) + '...'
            $('.accordion-headline:before').removeClass('rotate')
            dataLayer.push({
              event: 'Close FAQ',
              Question: txt
            })
          }
        } else {
          panel.style.display = 'block'
          window.onclick = e => {
            const txt = $(e.target).text().substring(0, 50) + '...'
            $('.accordion-headline:before').addClass('rotate')
            dataLayer.push({
              event: 'Expand FAQ',
              Question: txt
            })
          }
        }
      })
    }

    return (
      <Fragment>
        {accordion_rows && !isEditing &&
        <section className="block accordion-block my-0 py-0">
          <header>
            {accordion_title && !isEditing &&
            <h2 className="page-section-header">{accordion_title}</h2>
            }
          </header>
          {accordion_description && !isEditing &&
            <p className="page-section-description" dangerouslySetInnerHTML={{ __html: accordion_description }} />
          }
          <div className="accordion-content my-0 py-0">
            <div className="accordion">
              {accordion_headline && !isEditing &&
                <h4 className="accordion-headline" name={accordion_headline}>{accordion_headline}</h4>
              }
            </div>
            <div className="panel" style={{ display: 'none' }}>
              {accordion_text && !isEditing &&
                <p className="accordion-text" dangerouslySetInnerHTML={{ __html: accordion_text }} />
              }
              {accordion_btn_text &&
                <a className="btn btn-secondary btn-accordion"
                  onClick={this.handleReadMoreClick}
                  href={accordion_btn_url}
                  target={ button_link_new_tab ? '_blank' : '' }
                > {accordion_btn_text}
                </a>
              }
            </div>
          </div>
        </section>
        }
      </Fragment>
    )
  }
}
