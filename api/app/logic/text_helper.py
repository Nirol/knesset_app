
import re

def __dequote(s:str ):

    if (s[0] == s[-1]) and s.startswith(("'", '"')):
        return s[1:-1]
    return s

def __remove_sequence_quote(s: str):
    s_new = re.sub('\"\"','"',s)
    return s_new



def dequote_wrapper(s: str):
    if s.count('"') == 0:
        return s
    s_new = __dequote(s)
    s_clean = __remove_sequence_quote(s_new)
    return s_clean




def combine_yeshuv_jsons(elec_data_json, kalfi_data_json):
    import json
    elec_data_json_dict = json.loads(elec_data_json)
    kalfi_data_json_dict = json.loads(kalfi_data_json)

    elec_data_json_dict.update(kalfi_data_json_dict)

    jsonString_merged = json.dumps(elec_data_json_dict)

    return jsonString_merged
