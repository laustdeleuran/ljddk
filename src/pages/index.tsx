/** @jsx jsx */
import { jsx } from '@emotion/react';

import GatsbyImage from 'gatsby-image';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import * as style from '../utils/style/style';

const ratio = 0.8532423208;

const WelcomePage = () => {
	const { portrait, site } = useStaticQuery(graphql`
		query {
			portrait: file(relativePath: { eq: "laust-johan-deleuran.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 500) {
						...GatsbyImageSharpFluid
					}
				}
			}
			site {
				siteMetadata {
					links {
						title
						link
					}
				}
			}
		}
	`);

	return (
		<Layout hasNavigation={false}>
			<SEO title="Welcome" />
			<div css={style.container}>
				<figure css={style.figure}>
					<div css={style.figureInner}>
						<h2 css={style.figureHeader}>
							<span css={style.stripe}>Hi, stranger. </span>
						</h2>
						<p css={style.figureText}>
							<span css={style.stripe}>I’m Laust. </span>
							<span css={style.stripe}>I’m a creative technologist. </span>
							<span css={style.stripe}>I’m glad you came by.</span>
						</p>
					</div>
					<GatsbyImage
						fluid={portrait.childImageSharp.fluid}
						css={style.figureImg}
					/>
				</figure>

				<nav css={style.homeNav}>
					{site.siteMetadata.links.map(({ title, link }) => (
						<Link key={link} css={style.homeNavLink} to={link}>
							{title}
						</Link>
					))}
				</nav>
			</div>
		</Layout>
	);
};

export default WelcomePage;
