import { Component } from '@wordpress/element';

const { apiFetch } = wp;
const { addQueryArgs } = wp.url;

export class HappypointFrontend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };

    this.getData = this.getData.bind(this);
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { id, iframe_url, mailing_list_iframe } = this.props;
    if (
      id !== prevProps.id ||
      iframe_url !== prevProps.iframe_url ||
      mailing_list_iframe !== prevProps.mailing_list_iframe
    ) {
      this.getData();
    }
  }

  async getData() {
    const { id } = this.props;
    if (id && id > -1) {
      try {
        const queryArgs = {
          path: addQueryArgs('/planet4/v1/get-happypoint-data', {
            id
          })
        };

        const data = await apiFetch(queryArgs);
        this.setState({ data: data || {} });
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const {
      focus_image,
      opacity,
      mailing_list_iframe,
      iframe_url,
      load_iframe,
      id
    } = this.props;

    const {
      data: {
        background_src,
        background_srcset,
        background_alt,
        background_sizes,
        default_image,
        engaging_network_id
      }
    } = this.state;

    let url = '';
    if (mailing_list_iframe === 'true' || iframe_url) {
      url = iframe_url || engaging_network_id;
    }

    return id && id > -1 && (
      <section className="block block-footer block-wide happy-point-block-wrap">
        <picture>
          <img
            src={background_src || default_image}
            style={{
              objectPosition: focus_image,
              opacity: opacity ? (opacity / 100) : 0.3,
            }}
            border={0}
            srcSet={background_srcset}
            sizes={background_sizes || 'false'}
            alt={background_alt}
          />
        </picture>
        <div className="container">
          <div className="row justify-content-md-center">
            {(mailing_list_iframe === 'true' || iframe_url) &&
              <div className="col-md-10 happy-point" id="happy-point" data-src={url}>
                {load_iframe === 'true' &&
                  <iframe
                    src={url}
                    cellspacing="0"
                    allowtransparency="true"
                    frameborder="0"
                    scrolling="no"
                    width="100%"
                  />
                }
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}
