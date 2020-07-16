from flask import Flask
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from config import config
import os




bootstrap = Bootstrap()
db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__)



    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    bootstrap.init_app(app)



    db.init_app(app)
    # USED TO CREATE TABLES
    # with app.app_context():
    #     db_queries.create_all()
    # from .main import main as main_blueprint
    # app.register_blueprint(main_blueprint)
    from .api_1_0 import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/')

    return app

if __name__ == '__main__':
    print("abc")
    create_app(os.getenv('FLASK_CONFIG') or 'default')