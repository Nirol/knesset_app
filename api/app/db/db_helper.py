from typing import List

from queries import kalfi
from models import Knesset_22, Kalfi

#extracting kalfi numbers from Knesset_22 objects.
def __parse_knesset22_query_for_sn(query_result: List[Knesset_22]) -> List[int]:
    kalfi_num_list = [x.Kalfi_Num for x in query_result]
    return kalfi_num_list


#Ordering the list of Kalfi meta objets on the same kalfi number order as the
# kalfi data.
def __fix_meta_n_order(kalfi_meta_n: List[Kalfi],
                       kalfi_data_top_or_bottom_n:List[Knesset_22]) -> List[Kalfi]:
    ans =[]
    for kalfi_data in kalfi_data_top_or_bottom_n:
        kalfi_num = kalfi_data.Kalfi_Num
        for kalfi_meta in kalfi_meta_n:
            if kalfi_meta.kalfi_num_int == kalfi_num:
                ans.append(kalfi_meta)
    return ans


#extract list of Kalfi meta objects based on Knesset_22 objects.
def query_helper_kalfi_meta_top_or_bottom(yeshuv_sn: int,
                                          kalfi_data_top_or_bottom_n: List[
                                              Knesset_22]) -> List[Kalfi]:
    yeshuv_kalfi_list_from_knesset22_query = __parse_knesset22_query_for_sn(
        kalfi_data_top_or_bottom_n)
    kalfi_meta_n = kalfi.query_kalfi_metadata_by_list(yeshuv_sn,
                                                               yeshuv_kalfi_list_from_knesset22_query)
    sorted_kalfi_meta_n = __fix_meta_n_order(kalfi_meta_n, kalfi_data_top_or_bottom_n )
    return sorted_kalfi_meta_n
