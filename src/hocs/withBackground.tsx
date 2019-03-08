import React from 'react';
import { View } from 'react-native';
import color from './color';

export const withBackground =
(Component: React.ComponentType<any>) => {

	return (props: any) => (
		<View style={{ backgroundColor: color }}>
			<Component {...props} />
		</View>
	);
};