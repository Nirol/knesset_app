# used to clean hebrew texts

import re

from db_queries import query_kalfi_metadata_all
from models import Kalfi


def __clean_address_start_end_quotes(address):
    s=address
    s=s.strip()
    if s.startswith('"') and s.endswith('"'):
        s=s[1:-1]
        s=s.strip()
    s = re.sub(r"(\")\1*", r'\1', s)

    return s


def __remove_sequence_quote(s: str):
    s_new = re.sub('\"\"','"',s)
    return s_new

def __clean_kalfi_hebrew_texts(kalfi_meta: Kalfi) -> None:
    address = kalfi_meta.get_address()
    location = kalfi_meta.get_location()
    clean_address = __clean_address_start_end_quotes(address)
    clean_location = __clean_address_start_end_quotes(location)

    final_clean_address = __clean_address_start_end_quotes(clean_address)
    final_cclean_location = __clean_address_start_end_quotes(clean_location)
    if address != final_clean_address:
        if location != final_cclean_location:
            kalfi_meta.update_location(final_cclean_location)
            kalfi_meta.update_address(final_clean_address)
        else:
            kalfi_meta.update_address(final_clean_address)
    elif location != clean_location:
        kalfi_meta.update_location(final_cclean_location)


# As part of the setup, clean hebrew texts of kalfi locations and address
# including double extra quotes chars and extra spaces on the edges.
# this script also update the DB with the clean version of the hebrew texts.
def clean_kalfi_meta_hebrew():
    kalfi_meta_data_list = query_kalfi_metadata_all()
    for knesset_meta in kalfi_meta_data_list:
        __clean_kalfi_hebrew_texts(knesset_meta)

