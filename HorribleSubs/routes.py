from flask import request, jsonify
import json
import pprint

from HorribleSubs import app, pg_db, parser

@app.route('/horriblesubs/get-all', methods=['GET'])
def get_main_page():
    # shows = parser.get_all_shows()
    current_page = int(request.args.get('page', '1'))
    
    return jsonify(
        pg_db[current_page]
    )

@app.route('/horriblesubs/get-latest')
def get_latest_releases():
    parser.get_current_season_releases()
    with open('series-db.json') as db:
        latest_db = json.load(db)
    # Add show information to the show dict
    info = {}
    
    for key in parser.current_season:
        if key in latest_db:
            info[key] = latest_db[key]
        else:
            info[key] = {'desc': 'null', 'img': 'null'}

    return jsonify(
        info
    )

# TODO: Create database to store shows and their links in for easier search
@app.route('/horriblesubs/search')
def search_horriblesubs():
    show_name = request.args.get('q')
    show = {show_name: parser.shows_dict.get(show_name, 'not found')}
    return jsonify(show)

