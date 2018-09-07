'use strict'

const Hapi = require('hapi')
const Path = require('path')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'build/default/')
        }
    }
})

const init = async () => {
    await server.register(require('inert'))

    await server.register(require('bell'))

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            file: 'index.html'
        }
    });

    server.route({
        method: 'GET',
        path: '/config.js',
        handler: {
            file: 'config.js'
        }
    });

    server.route({
        method: 'GET',
        path: '/src/{param*}',
        handler: {
            directory: {
                path: './src/',
            }
        }
    });
    
    server.route({
        method: 'GET',
        path: '/node_modules/{param*}',
        handler: {
            directory: {
                path: './node_modules/',
            }
        }
    });


    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()