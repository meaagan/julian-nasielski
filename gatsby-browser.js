/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import 'bootstrap/dist/css/bootstrap.css';

const { registerLinkResolver } = require('@prismicio/gatsby-source-prismic-graphql');
const { linkResolver } = require('./src/utils/linkResolver');
 
registerLinkResolver(linkResolver);