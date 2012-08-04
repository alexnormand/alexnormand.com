.PHONY = all, clean, build, minify-js, minify-css, build-static-site, serve, upload

BUILD.DIR = build
APPFOLDER = appengine
APPENGINEPATH = ~/tools/google_appengine
APPENGINEDEV = $(APPENGINEPATH)/dev_appserver.py
APPENGINEUPLOAD = $(APPENGINEPATH)/appcfg.py

BUILD.MAIN.JS = $(BUILD.DIR)/js/main.js
APPENGINE.MAIN.JS = $(APPFOLDER)/static/js/main.js
NO.COPYRIGHT := `tail -n +$$(sed -n '/(function/=' $(BUILD.MAIN.JS)) $(BUILD.MAIN.JS) > $(APPENGINE.MAIN.JS)`
REMOVE.TMP.FILES :=  `find $(APPFOLDER) -type f | grep '~'$ | xargs rm -f`

all : build-static-site

clean:
	@rm -rf $(APPFOLDER)/static
	@rm -rf $(BUILD.DIR)

build:
	@rm -rf $(BUILD.DIR)
	wintersmith build

minify-js:
	node $(BUILD.DIR)/js/libs/require/r.js -o $(BUILD.DIR)/js/app-build.js

minify-css:
	node $(BUILD.DIR)/js/libs/require/r.js -o cssIn=$(BUILD.DIR)/css/site.css out=$(BUILD.DIR)/css/site.css optimizeCss=standard

build-static-site: clean build minify-js minify-css
	@cp -r $(BUILD.DIR) $(APPFOLDER)/static
	@${REMOVE.TMP.FILES}
	@rm -rf $(APPFOLDER)/static/js/*
	@cp $(BUILD.MAIN.JS) $(APPENGINE.MAIN.JS)
	@${NO.COPYRIGHT}
	@echo Site generation complete

serve:
	@$(APPENGINEDEV) $(APPFOLDER)

upload:
	@$(APPENGINEUPLOAD) update $(APPFOLDER)

