import React, {useState, useEffect} from 'react';

import utils from '../../utils';
import Storyblok from '../templates/storyblok';

function loadStoryblokBridge(callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=Dq9tMhBqMlJxD2kIdqbrJgtt`;
  script.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(script);
}

const StoryblokEntry = () => {
  const [story, setStory] = useState(null);

  function initStoryblokEvents() {
    loadStory();

    let sb = window.storyblok;

    sb.on(['change', 'published'], () => {
      loadStory();
    });

    sb.on('input', payload => {
      if (story && payload.story.id === story.id) {
        payload.story.content = sb.addComments(payload.story.content, payload.story.id);
        setStory(payload.story);
      }
    });

    sb.pingEditor(() => {
      if (sb.inEditor) {
        sb.enterEditmode();
      }
    });
  }

  function loadStory() {
    window.storyblok.get(
      {
        slug: getPath(),
        version: 'draft',
      },
      ({story}) => {
        setStory(story);
      }
    );
  }

  useEffect(() => {
    loadStoryblokBridge(initStoryblokEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (story === null) return null;

  const pageContext = utils.createStoryblokPageContext(story);
  return <Storyblok pageContext={pageContext} />;
};

function getPath() {
  let path = '';

  window.location.search
    .substring(1)
    .split('&')
    .forEach(item => {
      let parameter = item.split('=');
      if (parameter[0] === 'path') {
        path = decodeURIComponent(parameter[1]);
      }
    });

  return path;
}

export default StoryblokEntry;
