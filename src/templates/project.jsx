import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import { Link, graphql } from 'gatsby';
import { RichText } from "prismic-reactjs";
import Button from "components/_ui/Button";
import Layout from "components/Layout";
import { Carousel } from 'react-bootstrap';


const ProjectHeroContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 3.5em;

    .ProjectVideo {
        max-width: 600px;
    }
`

const ProjectTitle = styled("div") `
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
`

const ProjectBody = styled("div")`
    // max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`


const Project = ({ project, meta }) => {
    const blogContent = project.body.map((slice, index) => {
        if (slice.type === 'image_gallery') {
          const galleryContent = slice.fields.map((gallery, galleryIndex) => (
            <Carousel.Item>
              <img
                src={gallery.gallery_image.url}
                className="d-block w-100"
                alt={gallery.gallery_image.alt}
              />
            </Carousel.Item>
          ))
          return (
            <Carousel>
              {galleryContent}
            </Carousel>
          )
        // Return null by default
        }
        return null
      })


    return (
        <>
            <Helmet
                title={`${project.project_title[0].text} | Julian Nasielski`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project.project_title[0].text} | Julian Nasielski`,
                    },
                    {
                        property: `og:description`,
                        content: meta.description,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                    {
                        name: `twitter:card`,
                        content: `summary`,
                    },
                    {
                        name: `twitter:creator`,
                        content: meta.author,
                    },
                    {
                        name: `twitter:title`,
                        content: meta.title,
                    },
                    {
                        name: `twitter:description`,
                        content: meta.description,
                    },
                ].concat(meta)}
            />
            <Layout>
                <ProjectTitle>
                    {RichText.render(project.project_title)}
                </ProjectTitle>
                <ProjectHeroContainer>
                    <div dangerouslySetInnerHTML={{__html: project.project_hero_video.html}} />
                </ProjectHeroContainer>
                <ProjectBody>
                    {RichText.render(project.project_description)}
                    {blogContent}
                    <WorkLink to={"/work"}>
                        <Button className="Button--secondary">
                            See other work
                        </Button>
                    </WorkLink>
                </ProjectBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const projectContent = data.prismic.allProjects.edges[0].node;
    const meta = data.site.siteMetadata;

    if (!projectContent) return null
    return (
        <Project project={projectContent} meta={meta} />
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
};

export const query = graphql`
    query ProjectQuery($uid: String) {
        prismic {
            allProjects(uid: $uid) {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        project_hero_video
                        project_description
                        _meta {
                            uid
                        }
                        body {
                            ... on PRISMIC_ProjectBodyImage_gallery {
                              type
                              label
                              fields {
                                gallery_image
                              }
                            }
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`