import {useScript} from './useScript';
import {useStyleSheet} from './useStyleSheet';
import {useRef} from 'react';
import { uniqueId } from 'lodash';

const TIMELINE_JS_VERSION = '3.6.3';

export const TimelineFrontend = (props) => {
	const {
		timeline_title,
		google_sheets_url,
		timenav_position,
		start_at_end,
		language,
		description
	} = props;

	const timelineNode = useRef(null);

	useStyleSheet(
    `https://cdn.knightlab.com/libs/timeline3/${TIMELINE_JS_VERSION}/css/timeline.css`
	);

  const [loaded, error] = useScript(
    `https://cdn.knightlab.com/libs/timeline3/${TIMELINE_JS_VERSION}/js/timeline-min.js`
	);

  const setupTimeline = function() {
		timelineNode.current.id = uniqueId('timeline');
		console.log('timeline id', timelineNode.current.id);
		new TL.Timeline(timelineNode.current.id, google_sheets_url, {
			"timenav_position": timenav_position,
			"start_at_end": start_at_end,
			"language": language
		});
	}

	return (
		<section className="block timeline-block">
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
			<div ref={ timelineNode }></div>
      { loaded && !error && setupTimeline() }
		</section>
	)
}
