from flask import Flask
import os
from flask_cors import CORS, cross_origin
import json
from HorribleSubs import horribleParser

app = Flask(__name__)
app.config.from_pyfile(os.path.join('..', 'env.cfg'))
CORS(app, resources={r"/*": {"origins": "*"}})

# TODO: database setup, etc...
with open('series-db.json') as db:
    series_db = json.load(db)

def paginate_series_db(series_db):
    # each page should contain 10 elements
    items = series_db.items()
    current_page = 1
    paginated_db = {}
    for i in range(len(items)-1, 10, -10):
        paginated_db[current_page] = dict( list(items)[i-10 : i] )
        current_page += 1

    return paginated_db
pg_db = paginate_series_db(series_db)
parser = horribleParser.HorribleSubsParser()

from HorribleSubs import routes

