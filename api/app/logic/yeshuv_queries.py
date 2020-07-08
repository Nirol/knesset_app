
from app import db

from models import  Yeshuv, YeshuvType


def query_yeshuv_sn_by_name(yeshuv_name: str) -> int:
    print(yeshuv_name)
    yeshuv_sn = db.session.query(Yeshuv.yeshuv_sn).filter_by(
        yeshuv_name_hebrew=yeshuv_name).first()
    if yeshuv_sn:
        return yeshuv_sn[0]

    else:
        return -1



def query_yeshuv_sn_by_name_LIKE(yeshuv_name: str) -> int:
    print(yeshuv_name)


    optional_yeshuv_list = db.session.query(Yeshuv.yeshuv_sn,Yeshuv.yeshuv_name_hebrew).filter(
        Yeshuv.yeshuv_name_hebrew.like('%' + str(yeshuv_name) + '%')).all()
    print("inside like")
    print(optional_yeshuv_list)
    print(len(optional_yeshuv_list))
    print(optional_yeshuv_list[0][1])
    if optional_yeshuv_list:
        return optional_yeshuv_list[0]

    else:
        return -1





def query_yeshuv_type_by_sn(yeshuv_sn: int) -> YeshuvType:
    yeshuv_type = db.session.query(Yeshuv.yeshuv_type).filter_by(
        yeshuv_sn=yeshuv_sn).first()
    if yeshuv_type:
        return yeshuv_type[0]

    else:
        return -1