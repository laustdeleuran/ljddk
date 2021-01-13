/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FunctionComponent } from 'react';

import { wyswiyg } from './style';

const Wysiwyg: FunctionComponent<{ component?: string }> = ({
	children,
	component = 'div',
	...rest
}) =>
	jsx(component, {
		...rest,
		css: wyswiyg,
		children,
	});

export default Wysiwyg;
