.PHONY = all, clean, gen, minify-js, minify-css, copy-static-site, serve, upload

TOOLS = ~/tools
BUILD.DIR = deploy
SRC.JS.DIR = content/media/js
SRC.CSS.DIR = content/media/css

YUI = $(TOOLS)/yuicompressor-2.4.7.jar
REQUIREJS.OPTIMIZE= $(TOOLS)/r.js
APP.BUILD.JS = $(SRC.JS.DIR)/app-build.js


APPENGINEPATH = $(TOOLS)/google_appengine
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
	node $(REQUIREJS.OPTIMIZE) -o $(APP.BUILD.JS)\
                                   dir=../../../$(BUILD.DIR)/media/js\
                                   name=main\
                                   out=../../../$(BUILD.DIR)/media/js/main.js
	@cp $(SRC.JS.DIR)/libs/require/require-1.0.4.js $(BUILD.DIR)/media/js/libs/require
	@cp $(SRC.JS.DIR)/libs/respond.min.js $(BUILD.DIR)/media/js/libs

minify-css:
	java -jar $(YUI) -o $(BUILD.DIR)/media/css/site.css $(SRC.CSS.DIR)/site.css

copy-static-site: clean gen minify-js minify-css
	@cp -r $(BUILD.DIR) $(APPFOLDER)/static
	@echo SITE GENERATION COMPLETE

serve: copy-static-site	
	@$(APPENGINEDEV) $(APPFOLDER)

upload: copy-static-site	
	@$(APPENGINEUPLOAD) update $(APPFOLDER)


