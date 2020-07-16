from app import db
from constants import KnessetVars, KNESSETS_LIST




class Yeshuv(db.Model):
    """
       A class used to represent the Yeshuv db table.

       ...

       Attributes
       ----------
       yeshuv_sn : int [orimary key]
           The yeshuv serial number taken from israel db ( info about input sources
           on the elections readme repo)
       yeshuv_type : int
           the yeshuv type code (e.g. city 50k-100k \ Kibbtz )
       yeshuv_name_en : str
           Yeshuv name in english
       yeshuv_name_hebrew : int
           Yeshuv name in hebrew

       Realtionships
       ----------
        yeshuv_type - foreign key to yeshuv_type table.
        Knesset_22 - foreign key

    """
    __tablename__ = 'yeshuv'
    yeshuv_sn = db.Column(db.Integer, primary_key=True)
    yeshuv_type = db.Column(db.Integer, db.ForeignKey('yeshuv_type.type_sn'),
                       primary_key=True, nullable=False)
    yeshuv_name_en = db.Column(db.Text)
    yeshuv_name_hebrew = db.Column(db.Text)
    Knesset_22 = db.relationship('Knesset_22', backref='yeshuv', lazy=True)
    Kalfi = db.relationship('Kalfi', backref='yeshuv', lazy=True)
    YeshuvKnesset = db.relationship('YeshuvKnesset', backref='yeshuv', lazy=True)


class Kalfi(db.Model):
    """
       A class used to represent the Kalfi db table.
       ...
       Attributes
       ----------
       primary key [yeshuv_sn,sub_kalfi_num,kalfi_num_int]

       yeshuv_sn : int
       kalfi_num: in each yeshuv (distinct yeshu sn) the kalfis are numerated
       from 1 to the number of kalfis. The kalfi number is essentali the kalfi
       id.

       sub_kalfi_num: Some kalfis are composed from up to 5 actual kalfis
       inside them, with same number of BZB  in each sub kalfis.
       this kalfis all share the same kalfi num and are classified by
       sub kalfi num.

       location: The kalfi building location, (e.g. school, youth center).

       address: the formal adress of the kalfi location

       accessible: Taken from the offical data table, I think this means
       accessible for handicapped people.

       special_accessible: Taken from the offical data table, not sure what
       the meaning is.

       arabic_printing: the voting parties printouts contain arabic printing in this
       kalfi.

       Realtionships
       ----------
        yeshuv_sn - foreign key to yeshuv table.

       Methods
       -------
        cmp_kalfi_num_order( other)
           compare kalfis objects based on kalfi number, used to order.

        __eq__( other)
            Used for db model comparision between kalfis, check if too kalfis are
            equal based on kalfi num and kalfi sub nm.

        __gt__( kalfi_2):
            used for db model comparision between kalfis.

        get_address():
            getter for address field.

        get_location():
            getter for location field

        update_address(clean_address: str):
            update address after cleaning of hebrew symbols.

        update_location(clean_location: str):
            update location after cleaning of hebrew symbols.
    """
    __tablename__ = 'kalfi'
    yeshuv_sn =  db.Column(db.Integer, db.ForeignKey('yeshuv.yeshuv_sn'),
                       primary_key=True, nullable=False)
    kalfi_num_int = db.Column(db.Integer, primary_key=True)
    sub_kalfi_num = db.Column(db.Integer, primary_key=True)

    location = db.Column(db.Text)
    address = db.Column(db.Text)
    accessible = db.Column(db.Integer)
    special_accessible = db.Column(db.Integer)
    arabic_printing = db.Column(db.Integer)
    @staticmethod
    def cmp_kalfi_num_order(self, other):
        return self.kalfi_num_int < other.kalfi_num_int

    def __eq__(self, other):
        if not self._is_valid_operand(other):
            return NotImplemented
        return ((self.kalfi_num_int, self.sub_kalfi_num) ==
                (other.kalfi_num_int, other.kalfi_num))

    def __gt__(self, kalfi_2):
        return ((self.kalfi_num_int, self.sub_kalfi_num) <
                (kalfi_2.kalfi_num_int, kalfi_2.kalfi_num))

    def get_address(self) -> str:
        return self.address

    def get_location(self) -> str:
        return self.location

    def update_address(self, clean_address: str) -> None:
        self.address = clean_address

    def update_location(self, clean_location: str)  -> None:
        self.location = clean_location

    def __repr__(self):
        return str(self.__dict__)







class Knesset_22(db.Model):
    """
       A class used to represent the Knesset 22 elections results db table.
       ...
       Attributes
       ----------
       primary key = [index,yeshuv_sn,Kalfi_Num]

       yeshuv_sn: int
       kalfi_num: int
       BZB: int, bali zchut bhira.
       Voters: int, people who voted in this kalfi on the Knesset 22 elections.
       Error_Voters int, disqualified voters in this kalfi.




       location: The kalfi building location, (e.g. school, youth center).

       address: the formal adress of the kalfi location

       accessible: Taken from the offical data table, I think this means
       accessible for handicapped people.

       special_accessible: Taken from the offical data table, not sure what
       the meaning is.

       arabic_printing: the voting parties printouts contain arabic printing in this
       kalfi.

       Realtionships
       ----------
        yeshuv_sn - foreign key to yeshuv table.

       Methods
       -------
        cmp_kalfi_num_order( other)
           compare kalfis objects based on kalfi number, used to order.

        __eq__( other)
            Used for db model comparision between kalfis, check if too kalfis are
            equal based on kalfi num and kalfi sub nm.

        __gt__( kalfi_2):
            used for db model comparision between kalfis.

        get_address():
            getter for address field.

        get_location():
            getter for location field

        update_address(clean_address: str):
            update address after cleaning of hebrew symbols.

        update_location(clean_location: str):
            update location after cleaning of hebrew symbols.
    """
    __tablename__ = 'knesset_22'
    index = db.Column(db.Integer, primary_key=True, nullable=False )
    yeshuv_sn = db.Column(db.Integer, db.ForeignKey('yeshuv.yeshuv_sn'),
                   primary_key=True, nullable=False)
    Kalfi_Num = db.Column(db.Integer, primary_key=True, nullable=False)
    BZB = db.Column(db.Integer, nullable=False)
    Voters = db.Column(db.Integer, nullable=False)
    Error_Voters = db.Column(db.Integer, nullable=False)
    Vote_Percent = db.Column(db.Float, nullable=False)
    Error_Vote_Percent = db.Column(db.Float, nullable=False)


    def __eq__(self, other):
        return self.rank == other.rank and self.suit == other.suit

    def __lt__(self, other):
        return self.rank < other.rank



    @staticmethod
    def cmp_vote_percent_order(self, other):
        return self.vote_percent < other.vote_percent

    @staticmethod
    def cmp_kalfi_num_order(self, other):
        return self.Kalfi_Num < other.Kalfi_Num

    # def __gt__(self, knesset_22_2):
    #     return self.Kalfi_Num > knesset_22_2.Kalfi_Num


class YeshuvKnesset(db.Model):
    """
       A class used to represent the Yeshuv all 5 elections data.
       Each election parameter (BZB, Voters, Error_Voters, Kalfi_num
       vote_percent, Avg_BZB ),
       ...
       Attributes
       ----------
       primary key = [SN]

       SN: yeshuv SN
       BZB: int, bali zchut bhira.
       Voters: int, people who voted in this kalfi on the Knesset 22 elections.
       Error_Voters int, disqualified voters in this kalfi.
       Kalfi_Num: int, numbers of kalfis in this yeshuv on that election.
       vote_percent: float, the vote percent in that yeshuv on that election.
       Avg_BZB: float, the avg bzb per kalfi for that yeshuv.

       Methods
       -------
       to_json_dict()
        Create a json dict for a single YeshuvKnesset object, to be send over
        the api.

    """



    __tablename__ = 'yeshuv_knesset'
    SN = db.Column(db.Integer, db.ForeignKey('yeshuv.yeshuv_sn'),
                          primary_key=True, nullable=False)
    BZB_18 = db.Column(db.Integer)
    Voters_18 = db.Column(db.Integer)
    Error_Voters_18 = db.Column(db.Integer)
    Kalfi_Num_18 = db.Column(db.Integer)
    vote_percent_18 = db.Column(db.Float)
    Avg_BZB_18 = db.Column(db.Float)
    BZB_19 = db.Column(db.Integer)
    Voters_19 = db.Column(db.Integer)
    Error_Voters_19 = db.Column(db.Integer)
    Kalfi_Num_19 = db.Column(db.Integer)
    vote_percent_19 = db.Column(db.Float)
    Avg_BZB_19 = db.Column(db.Float)
    BZB_20 = db.Column(db.Integer)
    Voters_20 = db.Column(db.Integer)
    Error_Voters_20 = db.Column(db.Integer)
    Kalfi_Num_20 = db.Column(db.Integer)
    vote_percent_20 = db.Column(db.Float)
    Avg_BZB_20 = db.Column(db.Float)
    BZB_21 = db.Column(db.Integer)
    Voters_21 = db.Column(db.Integer)
    Error_Voters_21 = db.Column(db.Integer)
    Kalfi_Num_21 = db.Column(db.Integer)
    vote_percent_21 = db.Column(db.Float)
    Avg_BZB_21 = db.Column(db.Float)
    BZB_22 = db.Column(db.Integer)
    Voters_22 = db.Column(db.Integer)
    Error_Voters_22 = db.Column(db.Integer)
    Kalfi_Num_22 = db.Column(db.Integer)
    vote_percent_22 = db.Column(db.Float)
    Avg_BZB_22 = db.Column(db.Float)


    def __get_knesset_var_18(self, variabl: KnessetVars):
        if variabl == KnessetVars.BZB:
            return self.BZB_18
        elif variabl == KnessetVars.Voters:
            return self.Voters_18
        elif variabl == KnessetVars.Error_Voters:
            return self.Error_Voters_18
        elif variabl == KnessetVars.Kalfi_Num:
            return self.Kalfi_Num_18
        elif variabl == KnessetVars.vote_percent:
            return self.vote_percent_18
        elif variabl == KnessetVars.Avg_BZB:
            return self.Avg_BZB_18

    def __get_knesset_var_19(self, variabl: KnessetVars):
        if variabl == KnessetVars.BZB:
            return self.BZB_19
        elif variabl == KnessetVars.Voters:
            return self.Voters_19
        elif variabl == KnessetVars.Error_Voters:
            return self.Error_Voters_19
        elif variabl == KnessetVars.Kalfi_Num:
            return self.Kalfi_Num_19
        elif variabl == KnessetVars.vote_percent:
            return self.vote_percent_19
        elif variabl == KnessetVars.Avg_BZB:
            return self.Avg_BZB_19

    def __get_knesset_var_20(self, variabl: KnessetVars):
        if variabl == KnessetVars.BZB:
            return self.BZB_20
        elif variabl == KnessetVars.Voters:
            return self.Voters_20
        elif variabl == KnessetVars.Error_Voters:
            return self.Error_Voters_20
        elif variabl == KnessetVars.Kalfi_Num:
            return self.Kalfi_Num_20
        elif variabl == KnessetVars.vote_percent:
            return self.vote_percent_20
        elif variabl == KnessetVars.Avg_BZB:
            return self.Avg_BZB_20

    def __get_knesset_var_21(self, variabl: KnessetVars):
        if variabl == KnessetVars.BZB:
            return self.BZB_21
        elif variabl == KnessetVars.Voters:
            return self.Voters_21
        elif variabl == KnessetVars.Error_Voters:
            return self.Error_Voters_21
        elif variabl == KnessetVars.Kalfi_Num:
            return self.Kalfi_Num_21
        elif variabl == KnessetVars.vote_percent:
            return self.vote_percent_21
        elif variabl == KnessetVars.Avg_BZB:
            return self.Avg_BZB_21

    def __get_knesset_var_22(self, variabl: KnessetVars):
            if variabl == KnessetVars.BZB:
                return self.BZB_22
            elif variabl == KnessetVars.Voters:
                return self.Voters_22
            elif variabl == KnessetVars.Error_Voters:
                return self.Error_Voters_22
            elif variabl == KnessetVars.Kalfi_Num:
                return self.Kalfi_Num_22
            elif variabl == KnessetVars.vote_percent:
                return self.vote_percent_22
            elif variabl == KnessetVars.Avg_BZB:
                return self.Avg_BZB_22


    def get_knesset_var(self, variabl: KnessetVars, knesset: str):
        if knesset =='18':
            return self.__get_knesset_var_18(variabl)
        elif knesset =='19':
            return self.__get_knesset_var_19(variabl)
        elif knesset =='20':
            return self.__get_knesset_var_20(variabl)
        elif knesset =='21':
            return self.__get_knesset_var_21(variabl)
        elif knesset =='22':
            return self.__get_knesset_var_22(variabl)



    def to_json_dict(self):
        data = {}
        data["elections"] = []
        for knesset in KNESSETS_LIST:
            knesset_dict = {}
            for var in KnessetVars:
                knesset_var_value= self.get_knesset_var(var, knesset)
                knesset_dict[var.name] = knesset_var_value
            knesset_dict["knesset_num"] = knesset
            data["elections"].append(knesset_dict)
        return data



class YeshuvType(db.Model):
    """
       A class used to represent the different yeshuv types definition.

       Attributes
       ----------
       primary key = [type_sn]

       type_sn: the type serial number as described in an offical online document,
       mon info on the election repo readme.

       type_name: name of the yeshuv type.

       type_vote_percent: the vote percent of all yeshuvs belong to this
       yeshuv type.

       type_error_vote_percent: error vote percent of  all yeshuvs belong to this
       yeshuv type.

       type_avg_bzb: avg bzb per kalfi for all yeshuvs belong to this
              yeshuv type.

    """


    __tablename__ = 'yeshuv_type'
    type_sn = db.Column(db.Integer, primary_key=True, nullable=False)
    type_name = db.Column(db.Text)
    type_vote_percent =  db.Column(db.Float)
    type_error_vote_percent =  db.Column(db.Float)
    type_avg_bzb =  db.Column(db.Float)
    Yeshuv = db.relationship('Yeshuv', backref='type', lazy=True)
