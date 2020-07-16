#!/usr/bin/env python
import os
from flask_migrate import Migrate, MigrateCommand
from app import create_app, db
from models import Yeshuv


from app import *

if __name__ == '__main__':
    app = create_app(os.getenv('FLASK_CONFIG') or 'default')
    migrate = Migrate(app, db)
    app.run()