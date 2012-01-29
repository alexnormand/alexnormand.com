from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class RemoveTrailingSlashes(webapp.RequestHandler):
   def get(self, url):
      self.redirect(url)

application = webapp.WSGIApplication(
   [('(.*)/$', RemoveTrailingSlashes)]
)

def main():
   run_wsgi_app(application)
