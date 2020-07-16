from models import Yeshuv, Knesset_22, Kalfi


# foreign key knesset22 to yeshuv by yeshuv_sn
def test_db_relation_one():
    request = Knesset_22.query.first()
    print(request.yeshuv.yeshuv_name_en)

# foreign key Yeshuv to yeshuv_type by yeshuv_type
def test_db_relation_two():
    request = Yeshuv.query.first()
    print(request.type.type_name)

# foreign key Kalfi to yeshuv by yeshuv_sn
def test_db_relation_three():
    request = Kalfi.query.first()
    print(request.yeshuv.yeshuv_name_en)



# test flask sqlalchemy model definition working properly.
def all_db_relation_tests():
    test_db_relation_one()
    test_db_relation_two()
    test_db_relation_three()

