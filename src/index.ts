import { HelloScreen } from './components/HelloScreen';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	key: 'hello-world',
	name: 'Hello World',

	components: {
		HomeScreen: HelloScreen,
	},

	// filters: {
	// 	'bluebase.boot.end': (bootOptions: BootOptions, _ctx: any, BB: BlueBase) => {

	// 		BB.Components.addHocs('HomeScreen', withBackground);
	// 		return bootOptions;
	// 	}
	// },
});
