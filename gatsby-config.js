require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.adeux-cestmieux.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 770,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: {quality: 80},
              showCaptions: true,
            },
          },
          `gatsby-remark-responsive-iframe`,
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `amsterdam.adeuxcestmieux`,
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `À deux c'est mieux`,
        short_name: `À deux c'est mieux`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#840032`,
        display: `standalone`,
        icon: `src/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
