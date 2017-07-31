const gulp = require('gulp');
const tripleGulp = require('meister-js-dev').gulp;
const webpackTask = require('meister-gulp-webpack-tasks');
const webpackConfig = require('./webpack.config');
const browserSyncTask = require('meister-gulp-browsersync-task');
const packageConfig = require('./package.json');

// building tasks
gulp.task('build', (done) => {
    const bundleConfig = webpackTask.createConfig('./index.js', webpackConfig.output, false, webpackConfig);
    const bundleCompiler = webpackTask.createCompiler(bundleConfig);

    webpackTask.createBuildTask(bundleCompiler)(done);
});


gulp.task('build:dist', (done) => {
    const bundleConfigDist = webpackTask.createConfig('./index.js', webpackConfig.output, true, webpackConfig);
    const bundleCompilerDist = webpackTask.createCompiler(bundleConfigDist);

    webpackTask.createBuildTask(bundleCompilerDist)(done);
});

gulp.task('build:min', (done) => {
    const bundleConfigMin = webpackTask.createConfig('./index.js', `dist/${packageConfig.main}.min.js`, true, webpackConfig);
    const bundleCompilerMin = webpackTask.createCompiler(bundleConfigMin);

    webpackTask.createBuildTask(bundleCompilerMin)(done);
});


// Documentation tasks.
gulp.task('js-docs', tripleGulp.jsdocModule.createGenerateDocs(['./src/**/*.js'], './docs/js-docs'));

// Versioning tasks.
gulp.task('bump-version', tripleGulp.versioningModule.createBumpVersion('./package.json'));

// Changelog tasks.
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));

// Cleaning tasks
gulp.task('clean:build', tripleGulp.cleanModule.createClean('./build/*'));
gulp.task('clean:dist', tripleGulp.cleanModule.createClean('./dist/*'));

// server tasks
gulp.task('server', () => {
    const entry = './index.js';
    const serverBundleConfig = webpackTask.createConfig(entry, webpackConfig.output, false, webpackConfig);
    const serverBundleConfigWithHot = webpackTask.configWithHot(serverBundleConfig);
    const serverBundleCompiler = webpackTask.createCompiler(serverBundleConfigWithHot);

    const devMiddleware = webpackTask.createDevMiddleware(serverBundleCompiler, serverBundleConfigWithHot);
    const hotMiddleware = webpackTask.createHotMiddleware(serverBundleCompiler);
    const browserSyncConfig = browserSyncTask.createConfig('.', false, 3000, [devMiddleware, hotMiddleware]);

    console.log('Creating server');

    browserSyncTask.createServer(browserSyncConfig)();
});
