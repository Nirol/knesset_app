import abc
from typing import List, Type, Dict
import json

from sqlalchemy import JSON

from db_helper import query_helper_kalfi_meta_top_or_bottom
from queries.kalfi import query_kalfi_metadata

from queries.knesset22 import query_knesset22_kalfi_all, \
    query_knesset22_kalfi_top_n_by_voters, \
    query_knesset22_kalfi_bottom_n_voters, query_knesset_22_kalfi_count
from constants import KalfiDisplayType
from models import Kalfi, Knesset_22, YeshuvKnesset
import constants
from queries.yeshuv_knesset import query_yeshuvknesset_by_sn
from yeshuv_queries import query_yeshuv_type_by_sn

# append the kalfi_data to the json dict kalfi_data key.
def _fill_data_dict(kalfi_data:List[Knesset_22], data_dict: List[JSON]):
    for kalfi in kalfi_data:
        dict = {
            'Kalfi_Num': kalfi.Kalfi_Num,
            'BZB': kalfi.BZB,
            'Voters': kalfi.Voters,
            'Error_Voters': kalfi.Error_Voters,
            'Vote_Percent': kalfi.Vote_Percent,
            'Error_Vote_Percent': kalfi.Error_Vote_Percent,
        }
        data_dict.append(dict)
# append the kalfi_meta to the json dict kalfi_meta key.
def _fill_meta_dict(kalfi_meta: List[Kalfi], meta_dict :List[JSON]):
    for kalfi in kalfi_meta:
        dict = {
            'sub_kalfi_num': kalfi.sub_kalfi_num,
            'address': kalfi.address,
            'location': kalfi.location,
            'accessible': kalfi.accessible,
            'special_accessible': kalfi.special_accessible,
            'arabic_printing': kalfi.arabic_printing
        }
        meta_dict.append(dict)




class KalfiDisplay:
    """
       An abstract class used to represent an a display of a yeshuv full kalfi data.
       Two sub-classes available, one represents big yeshuv where only the top and
       bottom kalfis are shown and the other represents small yeshuv where
       all kalfis are shown.

       Consists of:
       A. Display type.
       B. Kalfi data array:  eac object consists of:
        1. kalfi num (kalfi id)
        2. BZB registered in the kalfi.
        3. Voters (on the 22 elections)
        4. Error Voters (on the 22 elections)
        5. Vote Percent of the kalfi registerd voters (BZB).
        6. Error Vote Percent
       C. kalfi meta:
        1. 

       ...

       Attributes
       ----------
       display : KalfiDisplayType
            the display type of the kalfi, either all kalfis or top and bottom N kalfis.
           
        """
    def __init__(self, display: KalfiDisplayType):
        """
       Parameters
       ----------
       display : KalfiDisplayType
           the display type of the kalfi, either all kalfis or top and bottom N kalfis.

        """
        self.display = display

    @abc.abstractmethod
    def to_json_dict(self):
        """Abstract method to turn the kalfi data saved in the object into a
         json dictionary.


         """


class KalfiAllDisplay(KalfiDisplay):
    """
       KalfiDisplay sub- class for small size yeshuv holding all kalfis data

       ...

       Attributes
       ----------
       display : KalfiDisplayType
            the display type of the kalfi, either all kalfis or top and bottom N kalfis.

        """
    def __init__(self, diplay: KalfiDisplayType, kalfi_data_list: List[Knesset_22], kalfi_meta_list: List[Kalfi]):
        super().__init__(diplay)
        self.kalfi_data_list = kalfi_data_list
        self.kalfi_meta_list = kalfi_meta_list

    def to_json_dict(self) -> Dict[str, str]:
        data = {}
        data['display'] = "All"
        data['kalfi_data'] = []
        data['kalfi_meta'] = []
        _fill_data_dict(self.kalfi_data_list, data['kalfi_data'])

        _fill_meta_dict(self.kalfi_meta_list, data['kalfi_meta'])
        print("KalfiAllDisplay result full dict:")
        print(data)
        return data





class KalfiTopBotDisplay(KalfiDisplay):
    def __init__(self,display: KalfiDisplayType,  kalfi_data_top_n: List[Knesset_22], kalfi_data_bottom_n: List[Knesset_22],
                 kalfi_meta_top_n: List[Kalfi], kalfi_meta_bottom_n: List[Kalfi] ):
        super().__init__(display)
        self.kalfi_data_top_n = kalfi_data_top_n
        self.kalfi_data_bottom_n = kalfi_data_bottom_n
        self.kalfi_meta_top_n = kalfi_meta_top_n
        self.kalfi_meta_bottom_n = kalfi_meta_bottom_n




    def to_json_dict(self):
        data = {}
        data['display'] = "TopN"

        data['data_top'] = []
        data['data_bot'] = []

        data['meta_top'] = []
        data['meta_bot'] = []

        _fill_data_dict(self.kalfi_data_top_n, data['data_top'])
        _fill_data_dict(self.kalfi_data_bottom_n, data['data_bot'])

        _fill_meta_dict(self.kalfi_meta_top_n, data['meta_top'])
        _fill_meta_dict(self.kalfi_meta_bottom_n, data['meta_bot'])

        return data



def __sort_kalfi_by_kalfi_num(all_kalfi_data_list: List[Knesset_22], all_kalfi_meta_data_list: List[Kalfi]):
    sorted(all_kalfi_data_list, key=lambda Knesset_22: Knesset_22.Kalfi_Num)
    sorted(all_kalfi_meta_data_list, key=lambda Kalfi: Kalfi.kalfi_num)





def get_kalfi_meta_data_for_yeshuv_by_display(yeshuv_sn: int, display: KalfiDisplayType) -> Type[KalfiDisplay]:

    if display.value is KalfiDisplayType.All.value:
        kalfi_data_list = query_knesset22_kalfi_all(yeshuv_sn)
        kalfi_meta_list = query_kalfi_metadata(yeshuv_sn)



        return KalfiAllDisplay(display, kalfi_data_list, kalfi_meta_list)

    elif display.value is KalfiDisplayType.TopN.value:
        kalfi_data_top_n = query_knesset22_kalfi_top_n_by_voters(yeshuv_sn)
        kalfi_meta_top_n = query_helper_kalfi_meta_top_or_bottom(yeshuv_sn, kalfi_data_top_n)

        kalfi_data_bottom_n = query_knesset22_kalfi_bottom_n_voters(yeshuv_sn)
        kalfi_meta_bottom_n = query_helper_kalfi_meta_top_or_bottom(yeshuv_sn, kalfi_data_bottom_n)

        return KalfiTopBotDisplay(display, kalfi_data_top_n, kalfi_data_bottom_n, kalfi_meta_top_n, kalfi_meta_bottom_n)



def __yeshuv_json_data_response(yeshuv_knesset_model_data: YeshuvKnesset):
    json_dict_yeshuv_data = yeshuv_knesset_model_data.to_json_dict()
    json_answer_ready_data = json.dumps(json_dict_yeshuv_data,
                                        ensure_ascii=False)
    return json_answer_ready_data



def get_yeshuv_knesset_elections_data_json(yeshuv_sn):
    yeshuv_knesset_model_data = query_yeshuvknesset_by_sn(yeshuv_sn)
    return __yeshuv_json_data_response(yeshuv_knesset_model_data)




def __yeshuv_json_meta_response(kalfi_meta_display: Type[KalfiDisplay], yeshuv_type: int):
    json_dict_meta_data = kalfi_meta_display.to_json_dict()
    json_dict_meta_data["type"] = yeshuv_type
    json_answer_ready_meta = json.dumps(json_dict_meta_data,
                                        ensure_ascii=False)
    return json_answer_ready_meta



def get_yeshuv_kalfi_json(yeshuv_sn: int)->[str, 'JSON']:
    num_kalfis_22 = query_knesset_22_kalfi_count(yeshuv_sn)
    display = constants.get_representation_by_kalfi_num(
        num_kalfis_22)
    kalfi_meta_display = get_kalfi_meta_data_for_yeshuv_by_display(yeshuv_sn,
                                                                   display)
    yeshuv_type = query_yeshuv_type_by_sn(yeshuv_sn)
    return __yeshuv_json_meta_response(kalfi_meta_display, yeshuv_type)

