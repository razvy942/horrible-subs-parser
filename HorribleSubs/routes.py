from flask import request, jsonify
import json

from HorribleSubs import app, horribleParser

parser = horribleParser.HorribleSubsParser()


@app.route('/horriblesubs/get-all', methods=['GET'])
def get_main_page():
    shows = parser.get_all_shows()
    
    for key in parser.shows_dict:
        try:
            info[key] = parser.get_show_info(parser.shows_dict[key])
        except:
            pass

    with open('series-db.json', 'w') as out_file:
        json.dump(info, out_file)

    return jsonify(
        parser.shows_dict
    )

@app.route('/horriblesubs/get-latest')
def get_latest_releases():
    parser.get_current_season_releases()
    with open('series-db.json') as db:
        series_db = json.load(db)
    # Add show information to the show dict
    info = {}
    
    for key in parser.current_season:
        if key in series_db:
            info[key] = series_db[key]
        else:
            info[key] = {'desc': 'null', 'img': 'null'}

    return jsonify(
        info
    )
# TODO: Create database to store shows and their links in for easier search
@app.route('/horriblesubs/search')
def search_horriblesubs():
    show_name = request.args.get('q')
    show ={show_name: parser.shows_dict.get(show_name, 'not found')}
    return jsonify(show)
