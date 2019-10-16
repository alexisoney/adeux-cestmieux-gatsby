require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'Dq9tMhBqMlJxD2kIdqbrJgtt',
        homeSlug: 'home',
        version: 'draft',
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-5MP7DVR',
        includeInDevelopment: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `amsterdam.adeuxcestmieux`,
      },
    },
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
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-component',
          `gatsby-remark-responsive-iframe`,
        ],
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
        icon: `src/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
