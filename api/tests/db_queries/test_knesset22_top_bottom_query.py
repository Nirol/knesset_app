import unittest
from app import create_app
from queries.yeshuv_knesset import *
from queries.knesset22 import query_knesset22_kalfi_top_n_by_voters, \
    query_knesset22_kalfi_bottom_n_voters
from tests import YESHUV_SN_FOR_TESTING


class TestKnesset22TopBott(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()



    def tearDown(self):
        db.session.remove()
        self.app_context.pop()


    def test_kalfi_knesset_top_bottom_working(self):
        knesset_22_data_bottom = query_knesset22_kalfi_bottom_n_voters(YESHUV_SN_FOR_TESTING)
        self.assertIsNotNone(knesset_22_data_bottom)
        knesset_22_data_top = query_knesset22_kalfi_top_n_by_voters(YESHUV_SN_FOR_TESTING)
        self.assertIsNotNone(knesset_22_data_top)

    def test_kalfi_knesset_query_bottom(self):
        knesset_22_data_bottom = query_knesset22_kalfi_bottom_n_voters(YESHUV_SN_FOR_TESTING)


        knesset_22_data_first_kalfi = knesset_22_data_bottom[0]
        self.assertEqual(knesset_22_data_first_kalfi.BZB , 301)
        self.assertEqual(knesset_22_data_first_kalfi.Error_Voters , 0)
        self.assertEqual(knesset_22_data_first_kalfi.Kalfi_Num , 994)
        self.assertEqual(knesset_22_data_first_kalfi.Voters , 18)

        knesset_22_data_second_kalfi = knesset_22_data_bottom[1]
        self.assertEqual(knesset_22_data_second_kalfi.BZB , 389)
        self.assertEqual(knesset_22_data_second_kalfi.Error_Voters , 0)
        self.assertEqual(knesset_22_data_second_kalfi.Kalfi_Num , 742)
        self.assertEqual(knesset_22_data_second_kalfi.Voters , 38)


        knesset_22_data_third_kalfi = knesset_22_data_bottom[2]
        self.assertEqual(knesset_22_data_third_kalfi.BZB , 481)
        self.assertEqual(knesset_22_data_third_kalfi.Error_Voters ,1)
        self.assertEqual(knesset_22_data_third_kalfi.Kalfi_Num , 545)
        self.assertEqual(knesset_22_data_third_kalfi.Voters , 79)


        knesset_22_data_fifth = knesset_22_data_bottom[3]
        self.assertEqual(688, knesset_22_data_fifth.BZB)
        self.assertEqual(knesset_22_data_fifth.Error_Voters , 4)
        self.assertEqual(knesset_22_data_fifth.Kalfi_Num , 519)
        self.assertEqual(knesset_22_data_fifth.Voters , 82)

        knesset_22_data_fifth = knesset_22_data_bottom[4]
        self.assertEqual(781, knesset_22_data_fifth.BZB)
        self.assertEqual(knesset_22_data_fifth.Error_Voters , 1)
        self.assertEqual(knesset_22_data_fifth.Kalfi_Num , 832)
        self.assertEqual(knesset_22_data_fifth.Voters , 85)



    def test_kalfi_knesset_query_top(self):
        knesset_22_data_bottom = query_knesset22_kalfi_top_n_by_voters(YESHUV_SN_FOR_TESTING)

        knesset_22_data_first_kalfi = knesset_22_data_bottom[0]
        self.assertEqual(knesset_22_data_first_kalfi.BZB , 773)
        self.assertEqual(knesset_22_data_first_kalfi.Error_Voters , 14)
        self.assertEqual(knesset_22_data_first_kalfi.Kalfi_Num , 575)
        self.assertEqual(knesset_22_data_first_kalfi.Voters , 673)


        knesset_22_data_second_kalfi = knesset_22_data_bottom[1]
        self.assertEqual(knesset_22_data_second_kalfi.BZB , 755)
        self.assertEqual(knesset_22_data_second_kalfi.Error_Voters , 6)
        self.assertEqual(knesset_22_data_second_kalfi.Kalfi_Num , 801)
        self.assertEqual(knesset_22_data_second_kalfi.Voters , 634)

        knesset_22_data_third_kalfi = knesset_22_data_bottom[2]
        self.assertEqual(knesset_22_data_third_kalfi.BZB , 752)
        self.assertEqual(knesset_22_data_third_kalfi.Error_Voters , 8)
        self.assertEqual(knesset_22_data_third_kalfi.Kalfi_Num , 811)
        self.assertEqual(knesset_22_data_third_kalfi.Voters , 633)

        knesset_22_data_fourth = knesset_22_data_bottom[4]
        self.assertEqual(knesset_22_data_fourth.BZB , 780)
        self.assertEqual(knesset_22_data_fourth.Error_Voters , 9)
        self.assertEqual(knesset_22_data_fourth.Kalfi_Num , 827)
        self.assertEqual(knesset_22_data_fourth.Voters ,632)