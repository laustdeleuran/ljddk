import { css } from '@emotion/react';
import { rgba } from '../../utils/rgba';
import { Color, Typography, fontLato, Unit } from '../../utils/style/style';

export const header = (bgColor: string = Color.WHITE) => css`
	backdrop-filter: blur(3px);
	/* background: ${bgColor}; */
	background: ${rgba(bgColor, 0.85)};
	display: flex;
	height: ${Unit.HALF}px;
	justify-content: space-between;
	left: 0;
	padding: 0 ${Unit.HALF}px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1;

	@media screen and (max-height: 500px), screen and (max-width: 500px) {
		padding: 0 ${Unit.QUART}px;
	}
`;

export const headerTitleLink = (hasBgColor) => css`
	color: ${Color.BLACK};
	margin-top: ${Typography.LINE_HEIGHT * 1}px;
	margin-bottom: ${Typography.LINE_HEIGHT * 1}px;

	&:focus,
	&:hover {
		color: ${hasBgColor ? Color.BLACK : Color.ACTION_DARK};
	}
`;

export const headerType = css`
	${fontLato}
	font-size: 18px;
	line-height: ${Typography.LINE_HEIGHT * 2}px;
	margin: 0;
`;

export const main = (hasNavigation: boolean) => css`
	padding: ${Unit.FULL}px ${Unit.HALF}px ${Unit.HALF}px;

	@media screen and (max-height: 500px), screen and (max-width: 500px) {
		padding: ${hasNavigation ? Unit.HALF : Unit.QUART}px ${Unit.QUART}px
			${Unit.QUART}px;
	}
`;

export const nav = css`
	display: flex;
`;

export const navLink = (hasBgColor) => css`
	${headerType};
	color: ${hasBgColor ? Color.BLACK : Color.GREY_MEDIUM};
	display: block;
	margin-bottom: ${Typography.LINE_HEIGHT * 1}px;
	margin-left: ${Unit.QUART}px;
	margin-top: ${Typography.LINE_HEIGHT * 1}px;

	&:focus,
	&:hover {
		color: ${hasBgColor ? Color.BLACK : Color.ACTION_DARK};
	}
`;
