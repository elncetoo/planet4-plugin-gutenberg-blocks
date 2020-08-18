import { useScript } from './useScript';
import { useStyleSheet } from './useStyleSheet';
import { useRef, useState } from 'react';
import { uniqueId } from 'lodash';

const TIMELINE_JS_VERSION = '3.6.3';

export const TimelineFrontend = (props) => {
	const {
		timeline_title,
		description,
		isSelected,
		google_sheets_url,
		time_nav_position,
		start_at_end,
		language
	} = props;

	const [state, setState] = useState({
    googleSheetsURL: null,
		timeNavPosition: null,
		startAtEnd: null,
		language: null
  });

	const timelineNode = useRef(null);

	useStyleSheet(
    `https://cdn.knightlab.com/libs/timeline3/${TIMELINE_JS_VERSION}/css/timeline.css`
	);

  const [loaded, error] = useScript(
    `https://cdn.knightlab.com/libs/timeline3/${TIMELINE_JS_VERSION}/js/timeline-min.js`
	);

  const setupTimeline = function() {
		timelineNode.current.id = uniqueId('timeline');
		if (state.googleSheetsURL !== google_sheets_url ||
			state.timeNavPosition !== time_nav_position ||
			state.language !== language ||
			state.startAtEnd !== start_at_end) {

			console.log('timeline id', timelineNode.current.id);
			setState({
				googleSheetsURL: google_sheets_url,
				timeNavPosition: time_nav_position,
				language: language,
				startAtEnd: start_at_end,
			});

			new TL.Timeline(timelineNode.current.id, google_sheets_url, {
				"timenav_position": time_nav_position,
				"start_at_end": start_at_end,
				"language": language
			});
		}

	}

	return (
		<section className="block timeline-block">
			{
				isSelected
				? <Fragment>
						{
							timeline_title
								? <header>
										<h2 className="page-section-header">{ timeline_title }</h2>
									</header>
								: null
						}
						{
							description
								? <div className="page-section-description">{ description }</div>
								: null
						}
					</Fragment>
				: null
			}
			<div ref={ timelineNode }></div>
      { loaded && !error && setupTimeline() }
		</section>
	)
}
