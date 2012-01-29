### makefile used to upload site to appengine

MAKEFLAGS = --no-print-directory --always-make
MAKE = make $(MAKEFLAGS)

.PHONY = all, serve, upload

APPENGINEPATH = ~/tools/google_appengine
APPENGINEDEV = $(APPENGINEPATH)/dev_appserver.py
APPENGINEUPLOAD = $(APPENGINEPATH)/appcfg.py

APPFOLDER = appengine


all : gen

serve:
	@ant copy.static.site
	@$(APPENGINEDEV) $(APPFOLDER)

upload: 
	@ant copy.static.site
	@$(APPENGINEUPLOAD) update $(APPFOLDER)





