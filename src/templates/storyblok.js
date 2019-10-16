import React from 'react';
import {Helmet} from 'react-helmet';

import siteMetadata from '../constant/siteMetadata';
import formatDate from '../utils/prettyDate';
import {getTimeToRead} from '../utils';

import Layout from '../layouts/layout';
import Ending from '../components/Ending';
import Text from '../components/Text';

export default ({pageContext}) => {
  const {blocks, category, createdAt, description, image, slug, title} = pageContext;
  const date = createdAt && category ? formatDate(createdAt, category) : undefined;
  const timeToRead = blocks ? getTimeToRead(blocks) : undefined;

  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {siteMetadata.title}
        </title>
        <meta name='description' content={description} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={`${title} - ${siteMetadata.title}`} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:image:secure_url' content={image} />
        <meta property='og:url' content={`${siteMetadata.url}/${slug}/`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta name='twitter:image:alt' content={title} />
      </Helmet>

      {image && (
        <div className='hero'>
          <img className='hero__image' src={image} alt={title} />
        </div>
      )}

      <main className='post'>
        {date && <p className='post__date'>{date}</p>}
        {title && <h1 className='post__title'>{title}</h1>}
        {timeToRead && (
          <p className='post__reading-time'>
            {timeToRead} minute{timeToRead > 1 ? 's' : ''} de lecture
          </p>
        )}

        {blocks &&
          blocks.map(({component, _uid, content}) => {
            switch (component) {
              case 'text':
                return <Text key={_uid} text={content} />;
              default:
                return null;
            }
          })}

        <Ending>End of Story</Ending>
      </main>
    </Layout>
  );
};
