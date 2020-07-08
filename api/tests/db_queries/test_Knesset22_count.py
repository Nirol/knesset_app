import unittest
from app import create_app, db
from queries.knesset22 import query_knesset22_kalfi_all, \
    query_knesset_22_kalfi_count
from tests import YESHUV_SN_FOR_TESTING,  YESHUV_SN_FOR_TESTING_B, YESHUV_SN_FOR_TESTING_C, YESHUV_SN_FOR_TESTING_D


class TestKnesset_22(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()


    def tearDown(self):
        db.session.remove()
        self.app_context.pop()


    def test_kalfi_knesset_query_count_one(self):
        num = query_knesset_22_kalfi_count(YESHUV_SN_FOR_TESTING)
        self.assertEqual(num, 667)

    def test_kalfi_knesset_query_count_two(self):
        num = query_knesset_22_kalfi_count(YESHUV_SN_FOR_TESTING_B)
        self.assertEqual(num, 2)

    def test_kalfi_knesset_query_count_three(self):
        num = query_knesset_22_kalfi_count(YESHUV_SN_FOR_TESTING_C)
        self.assertEqual(num, 16)


    def test_kalfi_knesset_query_count_three(self):
        num = query_knesset_22_kalfi_count(YESHUV_SN_FOR_TESTING_D)
        self.assertEqual(num, 6)