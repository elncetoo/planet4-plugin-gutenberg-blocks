export const HappypointFrontend = ({
  background_src,
  background_srcset,
  background_sizes,
  background_alt,
  focus_image,
  opacity,
  mailing_list_iframe,
  iframe_url,
  engaging_network_id,
  load_iframe,
  default_image
}) => {
  let url = '';
  if (mailing_list_iframe === 'true' || iframe_url) {
    url = iframe_url || engaging_network_id;
  }
  return (
    <section className="block block-footer block-wide happy-point-block-wrap">
      {/* <picture>
        <img
          src={background_src || default_image}
          style={`object-position: ${focus_image}; opacity: ${opacity / 100}`}
          border={0}
          srcSet={background_srcset}
          sizes={background_sizes}
          alt={background_alt}
        />
      </picture> */}
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
};
