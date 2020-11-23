module.exports = {
  siteMetadata: {
    title: `Julian Nasielski`,
    description: `Level designer from Montreal, Quebec`,
    author: `Julian Nasielski`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: '@prismicio/gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'juliannasielski', // required
        defaultLang: 'en-us', // optional, but recommended
        path: '/preview', // optional, default: /preview
        previews: true, // optional, default: true
        pages: [ // optional
         {
          type: 'Post', // TypeName from prismic
          match: '/post/:uid', // pages will be generated under this pattern
          previewPath: '/post', // optional path for unpublished documents
          component: require.resolve('./src/templates/post.jsx'),
          sortBy: 'meta_firstPublicationDate_ASC', // optional, default: meta_lastPublicationDate_ASC; useful for pagination
        },
        {
          type: 'Project', // TypeName from prismic
          match: '/project/:uid', // pages will be generated under this pattern
          previewPath: '/project', // optional path for unpublished documents
          component: require.resolve('./src/templates/project.jsx'),
          sortBy: 'meta_lastPublicationDate_ASC', // optional, default: meta_lastPublicationDate_ASC; useful for pagination
        }
        ],
        // extraPageFields: 'article_type', // optional, extends pages query to pass extra fields
        sharpKeys: [
          /image|photo|picture/, // (default)
          'profilepic',
        ],
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-prismic-starter-prist`,
        short_name: `prist`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/JN.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    // {
    //     resolve: `gatsby-plugin-google-analytics`,
    //     options: {
    //         trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
    //         head: true,
    //     },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
