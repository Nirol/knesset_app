#!/usr/bin/env python
import os



COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage
    COV = coverage.coverage(branch=True, include='app/*')
    COV.start()
from flask_migrate import Migrate, MigrateCommand
from app import create_app, db
from flask_script import Manager, Shell
from models import Yeshuv


app = create_app('testing')
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db_queries', MigrateCommand)



import click
@app.cli.command()
@click.option('--coverage/--no-coverage', default=False,
              help='Run tests under code coverage.')
@click.argument('test_names', nargs=-1)
@manager.command
def test(coverage=False):
    """Run the unit tests."""
    if coverage and not os.environ.get('FLASK_COVERAGE'):
        import subprocess
        import sys
        os.environ['FLASK_COVERAGE'] = '1'
        sys.exit(subprocess.call([sys.executable] + sys.argv))


    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)
    if COV:
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'tmp/coverage')
        COV.html_report(directory=covdir)
        print('HTML version: file://%s/index.html' % covdir)
        COV.erase()




@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Yeshuv=Yeshuv, app=app )

manager.add_command("shell", Shell(make_context=make_shell_context))

@manager.command
def setUp():
    from clean_hebrew_text import clean_kalfi_meta_hebrew
    clean_kalfi_meta_hebrew()


if __name__ == '__main__':
    manager.run()

