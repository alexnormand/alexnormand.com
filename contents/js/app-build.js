({
    baseUrl: "./",
    out:"main.js",
    name:"libs/require/almond",
    paths: {
        order: 'libs/require/order',
        jquery: 'libs/jquery',
        noisy: 'libs/jquery.noisy.min',
        prettify: 'libs/prettify',
        site: 'site'
    },
    optimize: "uglify",
    include:"main",
    wrap:true
})
