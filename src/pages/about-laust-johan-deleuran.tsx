/** @jsx jsx */
import GatsbyImage from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import Wysiwyg from '../components/wysiwyg';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { jsx, css } from '@emotion/react';
import { Contact } from '../components/contact';

const AboutPage = () => {
	const data = useStaticQuery(graphql`
		query {
			bep: file(relativePath: { eq: "content/quotes-bep.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}

			erc: file(relativePath: { eq: "content/quotes-erc.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}

			hec: file(relativePath: { eq: "content/quotes-hec.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}

			jsc: file(relativePath: { eq: "content/quotes-jsc.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}

			mni: file(relativePath: { eq: "content/quotes-mni.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}

			mts: file(relativePath: { eq: "content/quotes-mts.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	return (
		<Layout>
			<SEO title="About" />
			<Wysiwyg component="article">
				<h1>
					Wait! <br />
					What is this? <br />
					Who are you&nbsp;even?
				</h1>
				<p>
					Relax. Don't panic. It's just a website. It's actually{' '}
					<em>my website</em>. I’m Laust and I’m a creative technologist. So,
					just sit back and enjoy it. As much as you can enjoy a personal
					website, anyway.
				</p>
				<h2>Your website? You build these&nbsp;things?</h2>
				<p>
					Yes. I actually build websites and interfaces for a living. I'm based
					in <del>New York</del> <del>Copenhagen</del> <del>Reno</del> Portland
					and I like to make stuff, especially when it's both effective and
					pretty. I've built websites since I was a mere 12 year old (back in
					1997, when{' '}
					<code
						css={css`
							animation: typeBlink 0.5s steps(1) infinite alternate;

							@keyframes typeBlink {
								0% {
									opacity: 0;
								}
								50% {
									opacity: 1;
								}
								100% {
									opacity: 0;
								}
							}
						`}
					>
						&lt;blink&gt;
					</code>{' '}
					was so cool).
				</p>
				<p>
					Now, I spend most of my time{' '}
					<del>
						working for{' '}
						<a href="http://www.vertic.com" target="_blank">
							Vertic
						</a>
					</del>{' '}
					<del>
						<a href="http://www.1508.dk" target="_blank">
							1508
						</a>
					</del>{' '}
					<del>
						{' '}
						<a href="http://www.koalition.com" target="_blank">
							Koalition
						</a>
					</del>
					<del>
						{' '}
						<a href="http://www.aws.training" target="_blank">
							AWS
						</a>
					</del>{' '}
					freelancing for amazing people who allows me to create awesome stuff,
					in the realms of user experience design, prototyping and front-end
					development. When I'm not working, I spend my time designing,
					sketching, coding half-finished web experiments and reading a lot of
					blog posts. Even though it's thoroughly nerdy I'm passionate about
					user interactions and code.
				</p>
				<p>
					You can check out some of my nerdy stuff on{' '}
					<a href="http://github.com/laustdeleuran" target="_blank">
						GitHub
					</a>
					,{' '}
					<a href="https://www.shadertoy.com/user/endymion" target="_blank">
						Shadertoy
					</a>{' '}
					or{' '}
					<a href="http://codepen.io/laustdeleuran" target="_blank">
						Codepen
					</a>
					. Feel free to shoot me a mail at{' '}
					<a href="mailto:hello@ljd.dk">hello@ljd.dk</a>, if you feel like it.
				</p>
				<h2>People say nice things about&nbsp;me</h2>
				<ul className="quotes">
					<li className="vcard">
						<blockquote>
							<GatsbyImage
								fluid={data.mni.childImageSharp.fluid}
								alt=""
								className="photo"
							/>
							<p>
								What I truly enjoy about my line of work, is that I once in a
								while come across people who make me feel I've plenty more to
								learn.
							</p>
							<cite>
								<a
									href="http://dk.linkedin.com/in/mnivertic/"
									target="_blank"
									className="fn n url"
								>
									Michael Nilsson
								</a>
							</cite>
						</blockquote>
					</li>
					<li className="vcard">
						<blockquote>
							<GatsbyImage
								fluid={data.erc.childImageSharp.fluid}
								alt=""
								className="photo"
							/>
							<p>
								Laust is one of the best, if not the best, front-end developers
								I've ever worked with.{' '}
							</p>
							<cite>
								<a
									href="http://dk.linkedin.com/in/emilchristensen/"
									target="_blank"
									className="fn n url"
								>
									Emil Rømer Christensen
								</a>
							</cite>
						</blockquote>
					</li>
					<li className="vcard">
						<blockquote>
							<GatsbyImage
								fluid={data.hec.childImageSharp.fluid}
								alt=""
								className="photo"
							/>
							<p>
								He has a passion for his craft that is rarely seen in veterans
								of the industry and spending any amount of time with him will
								challenge your notions about web design best practice &ndash;
								for the better.{' '}
							</p>
							<cite>
								<a
									href="http://www.linkedin.com/in/heckmueller/"
									target="_blank"
									className="fn n url"
								>
									Harald Eckmüller
								</a>
							</cite>
						</blockquote>
					</li>
					<li className="vcard">
						<blockquote>
							<GatsbyImage
								fluid={data.jsc.childImageSharp.fluid}
								alt=""
								className="photo"
							/>
							<p>
								Laust has been a great mentor, always up for helping anyone in
								need and sharing his research on new technologies and approaches
								to website development.
							</p>
							<cite>
								<a
									href="http://www.linkedin.com/in/janinaschill/"
									target="_blank"
									className="fn n url"
								>
									Janina Schill
								</a>
							</cite>
						</blockquote>
					</li>
					<li className="vcard">
						<blockquote>
							<GatsbyImage
								fluid={data.mts.childImageSharp.fluid}
								alt=""
								className="photo"
							/>
							<p>
								Definitely one of the most dedicated people I have ever worked
								with.
							</p>
							<cite>
								<a
									href="http://dk.linkedin.com/in/mortentsteinbach"
									target="_blank"
									className="fn n url"
								>
									Morten Steinbach
								</a>
							</cite>
						</blockquote>
					</li>
					<li className="vcard">
						<blockquote>
							<GatsbyImage
								fluid={data.bep.childImageSharp.fluid}
								alt=""
								className="photo"
							/>
							<p>
								Laust has the unique combination of technical skills and a
								business-oriented mindset.
							</p>
							<cite>
								<a
									href="http://dk.linkedin.com/in/berntelkjaer"
									target="_blank"
									className="fn n url"
								>
									Bernt Elkjær
								</a>
							</cite>
						</blockquote>
					</li>
				</ul>
				<Contact />
			</Wysiwyg>
		</Layout>
	);
};

export default AboutPage;
