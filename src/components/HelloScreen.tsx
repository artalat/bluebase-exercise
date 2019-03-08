import React from 'react';
import { SafeAreaView } from 'react-native';
import { getComponent, Theme } from '@bluebase/core';

const H4 = getComponent('H4');

export const HelloScreen = (props: any) => {

	const { styles } = props;
	return (
		<SafeAreaView style={styles.root}>
			<H4 style={styles.title}>Hello World 🚀</H4>
		</SafeAreaView>
	);
};

HelloScreen.defaultStyles = (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.main
	},
	title: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},

});
