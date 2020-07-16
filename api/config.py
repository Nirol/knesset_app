import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    JSON_AS_ASCII = False
    SQLALCHEMY_RECORD_QUERIES = False

    @staticmethod
    def init_app(app):
        pass




class DevelopmentConfig(Config):
    DEBUG = True



class TestingConfig(Config):
    TESTING = True

    db_username =os.environ.get('LOCAL_DB_USERNAME')
    db_password =os.environ.get('LOCAL_DB_PASSWORD')
    db_host = os.environ.get('LOCAL_DB_HOST') + "/"
    db_name = os.environ.get('LOCAL_DB_NAME')
    FULL_DB_URL = 'mysql+pymysql://' + db_username + ":" + db_password + "@" + db_host + db_name
    SQLALCHEMY_DATABASE_URI =       FULL_DB_URL


class ProductionConfig(Config):
    print("prod")
    PRODUCTION = True
    db_username =os.environ.get('LOCAL_DB_USERNAME')
    db_password =os.environ.get('LOCAL_DB_PASSWORD')
    db_host = os.environ.get('LOCAL_DB_HOST') + "/"
    db_name = os.environ.get('LOCAL_DB_NAME')
    FULL_DB_URL = 'mysql+pymysql://' + db_username + ":" + db_password + "@" + db_host + db_name
    SQLALCHEMY_DATABASE_URI =       FULL_DB_URL
    # db_username =os.environ.get('PROD_DB_USERNAME')
    # db_password =os.environ.get('PROD_DB_PASSWORD')
    # db_host = os.environ.get('PROD_DB_HOST') + "/"
    # db_name = os.environ.get('PROD_DB_NAME')
    # FULL_DB_URL = 'mysql+pymysql://' + db_username + ":" + db_password + "@" + db_host + db_name
    # SQLALCHEMY_DATABASE_URI =       FULL_DB_URL


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
