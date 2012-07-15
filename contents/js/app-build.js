({
    baseUrl: "./",
    out:"main.js",
    name:"libs/require/almond",
    paths: {
	order: 'libs/require/order',
	jquery: 'libs/jquery',
        hljs:   'libs/highlight.pack',
	site: 'site'
    },
    optimize: "uglify",
    include:"main",
    wrap:true
})
