({
    appDir: "./",
    baseUrl: "./",
    paths: {
	order: 'libs/require/order',
	jquery: 'libs/jquery',
	site: 'site'

    },
    optimize: "uglify",
    modules: [
        {
            name: "main",
            exclude: [
                // If you prefer not to include certain libs exclude them here
            ]
        }
    ]
})
