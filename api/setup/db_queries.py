from typing import List

from models import Kalfi


def query_kalfi_metadata_all() -> List[Kalfi]:
    kalfi_list = Kalfi.query.all()
    return kalfi_list