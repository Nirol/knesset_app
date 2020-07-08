from flask import Flask,  render_template
from flask_bootstrap import Bootstrap



app = Flask(__name__, static_folder='app/static')
bootstrap = Bootstrap(app)
#used to run a with a manager
#manager = Manager(app)

@app.errorhandler(404)
def page_not_found(e):
 return render_template('404.html'), 404
@app.errorhandler(500)
def internal_server_error(e):
 return render_template('500.html'), 500


if __name__ == '__main__':

    #printing map of views:
    #print(app.url_map)

    #running app
    app.run(debug='True')

    #using a manager
    #manager.run("runserver")


    #print(app.url_map)
