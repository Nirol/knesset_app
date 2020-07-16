from exceptions import ValidationError
from models import YeshuvType
import json


def __query_yeshuv_type_info(yeshuv_type):
    yeshuv_type_info = YeshuvType.query.filter_by(type_sn=yeshuv_type).first()
    if yeshuv_type_info is None:
        raise ValidationError
    return yeshuv_type_info


def __turn_yeshuv_type_into_json(yeshuv_type_info: YeshuvType):
    result_dict = {}
    result_dict["type_sn"] = yeshuv_type_info.type_sn
    result_dict["type_name"] = yeshuv_type_info.type_name
    result_dict["type_vote_percent"] = yeshuv_type_info.type_vote_percent
    result_dict["type_error_vote_percent"] = yeshuv_type_info.type_error_vote_percent
    result_dict["type_avg_bzb"] = yeshuv_type_info.type_avg_bzb


    json_answer_ready = json.dumps(result_dict,
                                        ensure_ascii=False)
    return json_answer_ready




# all yeshuv types info was transfered to the frontend, since its small
# size data that is needed repeatedly.
def query_yeshuv_type_json_by_sn(yeshuv_type: int):
    yeshuv_type_info = __query_yeshuv_type_info(yeshuv_type)
    json_answer_ready = __turn_yeshuv_type_into_json(yeshuv_type_info)
    return json_answer_ready