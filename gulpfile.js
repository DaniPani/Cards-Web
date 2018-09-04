'use strict';

/* const del = require('del');
const mergeStream = require('merge-stream');
const polymerBuild = require('polymer-build');

const polymerProject = new polymerBuild.PolymerProject(require('./polymer.json'));
const buildDirectory = 'build';

function waitFor(stream) {
    return new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
    });
}

async function build() {
    console.log(`Deleting ${buildDirectory} directory...`);
    await del([buildDirectory])
    let sourcesStream = polymerProject.sources()
    let dependenciesStream = polymerProject.dependencies()
    let buildStream = mergeStream(sourcesStream, dependenciesStream)
        .once('data', () => {
            console.log('Analyzing build dependencies...');
        });

    buildStream = buildStream.pipe(gulp.dest(buildDirectory));

    await waitFor(buildStream)

    console.log('Build complete!');
} */

const gulp = require('gulp')
const exec = require('child_process').exec;

gulp.task('build', cb =>
    exec('polymer build', (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
)

gulp.task('build:watch', () => gulp.watch(['src/**/*', 'config.js', 'index.html'],{delay : 1500}, gulp.parallel('build')))

gulp.task('default', gulp.parallel('build','build:watch'))