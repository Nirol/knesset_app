import constants
from queries.yeshuv_knesset import query_yeshuvknesset_by_sn

from . import api
from kalfi_display import get_kalfi_meta_data_for_yeshuv_by_display
from flask import  jsonify
from app import db
from models import  Yeshuv


@api.route('/yeshuv/<int:yeshuv_sn>',  methods=['GET'])
def get_yeshuv_data_api(yeshuv_sn):
 yeshuv_knesset_model_data = query_yeshuvknesset_by_sn(yeshuv_sn)
 display = constants.get_representation_by_kalfi_num(yeshuv_knesset_model_data.Kalfi_Num_22)
 kalfi_meta_display = get_kalfi_meta_data_for_yeshuv_by_display(yeshuv_sn, display)
 # return yeshuv_json_response(kalfi_meta_display, yeshuv_knesset_model_data)
 return jsonify("lol")



@api.route('/autocomplete/<string:prefix_yeshuv>', methods=['GET'])
def autocomplete(prefix_yeshuv):
    # optional_yeshuv_list = Yeshuv.query.filter(Yeshuv.yeshuv_name_hebrew.like('%' + str(search) + '%'))
    optional_yeshuv_list = db.session.query(Yeshuv.yeshuv_name_hebrew).filter(
        Yeshuv.yeshuv_name_hebrew.like('%' + str(prefix_yeshuv) + '%')).all()
    print(optional_yeshuv_list)
    return jsonify(optional_yeshuv_list)