from flask import Flask
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_pyfile(os.path.join('..', 'env.cfg'))
CORS(app, resources={r"/*": {"origins": "*"}})

# TODO: database setup, etc...

from HorribleSubs import routes

