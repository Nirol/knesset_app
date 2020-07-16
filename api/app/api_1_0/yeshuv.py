from flask_sqlalchemy import get_debug_queries

from exceptions import ValidationError
import os
from text_helper import combine_yeshuv_jsons
from yeshuv import query_validate_yeshuv_exist_by_sn
from . import api
from kalfi_display import get_yeshuv_knesset_elections_data_json, get_yeshuv_kalfi_json
from flask import  jsonify, current_app
from app import db
from models import  Yeshuv


@api.route('/yeshuvHebrewList', methods=['GET'])
def full_yeshuv_list():
    optional_yeshuv_list_of_lists = db.session.query(Yeshuv.yeshuv_name_hebrew).all()
    yeshuv_list = [item for sublist in optional_yeshuv_list_of_lists for item in sublist]
    return jsonify(yeshuv_list)

@api.route('/yeshuv/sn/<int:yeshuv_sn>',  methods=['GET'])
def get_yeshuv_data_api_sn(yeshuv_sn):
    is_sn_valid = query_validate_yeshuv_exist_by_sn(yeshuv_sn)
    if is_sn_valid == -1:
        raise ValidationError('illegal yeshuv chosen')

    elec_data_json = get_yeshuv_knesset_elections_data_json(yeshuv_sn)
    kalfi_data_json = get_yeshuv_kalfi_json(yeshuv_sn)

    full_json = combine_yeshuv_jsons(elec_data_json, kalfi_data_json)
    print(full_json)
    return jsonify(full_json)

@api.route('/autocomplete/<string:prefix_yeshuv>', methods=['GET'])
def autocomplete(prefix_yeshuv):
    optional_yeshuv_list = db.session.query(Yeshuv.yeshuv_name_hebrew).filter(
        Yeshuv.yeshuv_name_hebrew.like('%' + str(prefix_yeshuv) + '%')).all()
    print(optional_yeshuv_list)
    return jsonify(optional_yeshuv_list)



@api.after_app_request
def after_request(response):

    if os.environ.get('FLASK_Profiling') and os.environ.get(
            'FLASK_Profiling') == 1:
        for query in get_debug_queries():
            print("duration:")
            print(query.duration)
            if query.duration >= current_app.config['FLASKY_DB_QUERY_TIMEOUT']:
                current_app.logger.warning(
                    'Slow query: %s\nParameters: %s\nDuration: %fs\nContext: %s\n'
                    % (query.statement, query.parameters, query.duration,
                       query.context))
    return response