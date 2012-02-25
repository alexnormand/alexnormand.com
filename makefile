.PHONY = all, clean, gen, minify-js, minify-css, copy-static-site, serve, upload

TOOLS = ~/tools
YUI = $(TOOLS)/yuicompressor-2.4.7.jar
REQUIREJS.OPTIMIZE= $(TOOLS)/r.js
APPENGINEPATH = $(TOOLS)/google_appengine

BUILD.DIR = deploy
SRC.JS.DIR = content/media/js
SRC.CSS.DIR = content/media/css

APP.BUILD.JS = $(SRC.JS.DIR)/app-build.js

APPENGINEDEV = $(APPENGINEPATH)/dev_appserver.py
APPENGINEUPLOAD = $(APPENGINEPATH)/appcfg.py

APPFOLDER = appengine


all : copy-static-site

clean:
	@rm -rf $(APPFOLDER)/static
	@rm -rf $(BUILD.DIR)

gen:
	@rm -rf $(BUILD.DIR)
	hyde gen


minify-js: 
	rm -r $(BUILD.DIR)/media/js
	mkdir -p $(BUILD.DIR)/media/js/libs/require
	node $(REQUIREJS.OPTIMIZE) -o $(APP.BUILD.JS)\
				   findNestedDependencies=true\
                                   name=main

	@cp $(SRC.JS.DIR)/libs/require/require-1.0.4.js $(BUILD.DIR)/media/js/libs/require
	@cp $(SRC.JS.DIR)/libs/respond.min.js $(BUILD.DIR)/media/js/libs

minify-css:
	java -jar $(YUI) -o $(BUILD.DIR)/media/css/site.css $(SRC.CSS.DIR)/site.css

copy-static-site: clean gen minify-js minify-css
	@cp -r $(BUILD.DIR) $(APPFOLDER)/static
	@echo SITE GENERATION COMPLETE

serve:
	@$(APPENGINEDEV) $(APPFOLDER)

upload:
	@$(APPENGINEUPLOAD) update $(APPFOLDER)


