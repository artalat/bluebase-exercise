const text = `
Success. You are now logged in as ***.
- Making sure project is set up correctly...
[16:55:01] Checking if there is a build in progress...

[16:55:02] Unable to find an existing Expo CLI instance for this directory, starting a new one...
[16:55:04] Starting Metro Bundler on port 19001.
[16:55:07] Tunnel ready.
[16:55:07] Publishing to channel 'default'...
[16:55:08] Building iOS bundle
[16:57:35] Building Android bundle
[16:57:35] Finished building JavaScript bundle in 108186ms.
[16:59:16] Analyzing assets
[16:59:16] Finished building JavaScript bundle in 101250ms.
[16:59:18] Finished building JavaScript bundle in 1995ms.
[16:59:20] Finished building JavaScript bundle in 1938ms.
[16:59:20] Uploading assets
[16:59:20] No assets changed, skipped.
[16:59:20] Uploading JavaScript bundles
[16:59:21] Published
[16:59:21] Your URL is

https://exp.host/@***/bluebase-project-expo

[16:59:22] Checking if this build already exists...

[16:59:22] Build started, it may take a few minutes to complete.
[16:59:22] You can check the queue length at https://expo.io/turtle-status

[16:59:22] You can monitor the build at

 https://expo.io/builds/060c57a6-775d-46c3-9341-3f3088184d6f

[16:59:22] Waiting for build to complete. You can press Ctrl+C to exit.
-
[17:04:09] Successfully built standalone app: https://expo.io/artifacts/f2f3aa70-6c04-4193-9ad5-278ae6f52115
✔ Build finished.`;

// var urlRegex = /\bhttps?:\/\/\S+/gi;

// published path
var urlRegex = /\bhttps?:\/\/exp.host\S+/gi;

// download file
var urlRegex = /\bhttps?:\/\/expo.io\/artifacts\S+/gi;

var urls = text.match(urlRegex);

console.log(urls);

const download = require('./.github/actions/expo-deploy/src/download');

const uri = 'https://expo.io/artifacts/6740822a-7010-4e1b-9247-816588219921';

// download(url, 'app.apk').catch(e => console.log('err', e));

download(uri, 'app.apk');
