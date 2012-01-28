({
    appDir: "./",
    baseUrl: "./",
    paths: {
	order: 'libs/require/order',
	jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
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
