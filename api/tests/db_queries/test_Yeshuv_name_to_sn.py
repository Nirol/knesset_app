import unittest
from app import create_app, db

from tests import YESHUV_SN_FOR_TESTING,  YESHUV_SN_FOR_TESTING_B, YESHUV_SN_FOR_TESTING_C, YESHUV_SN_FOR_TESTING_D
from yeshuv_queries import query_yeshuv_sn_by_name, query_yeshuv_type_by_sn, \
    query_yeshuv_sn_by_name_LIKE


class TestYeshuv(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()


    def tearDown(self):
        db.session.remove()
        self.app_context.pop()


    def test_yeshuv_sn_by_name_one(self):
        num = query_yeshuv_sn_by_name("ירושלים")
        self.assertEqual(num, YESHUV_SN_FOR_TESTING)

    def test_yeshuv_sn_by_name_two(self):
        num = query_yeshuv_sn_by_name("אודים")
        self.assertEqual(num, YESHUV_SN_FOR_TESTING_B)

    def test_yeshuv_sn_by_name_three(self):
        num = query_yeshuv_sn_by_name("מזכרת בתיה")
        self.assertEqual(num, YESHUV_SN_FOR_TESTING_C)

    def test_yeshuv_sn_by_name_four(self):
        num = query_yeshuv_sn_by_name("אבו רובייעה (שבט)")
        self.assertEqual(num, YESHUV_SN_FOR_TESTING_D)


    def test_yeshuv_type_by_sn_one(self):
        num = query_yeshuv_type_by_sn(1937)
        self.assertNotEqual(num, -1)




    # def test_yeshuv_sn_by_name_like_one(self):
    #     a ='אזור באר שבע'
    #     print(a)
    #     print("test_like")
    #     num = query_yeshuv_sn_by_name_LIKE(a)
    #     print(num)
    #     self.assertEqual(num, 1937)





    def test_yeshuv_sn_by_name_fifth(self):
        a ='"אזור באר שבע מ""א 41"'
        print("test_like")
        num = query_yeshuv_sn_by_name(a)
        self.assertEqual(num, 1937)


