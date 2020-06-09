from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "guitar"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route('/jasmine/tests')
def test_page():
    return render_template('jasmine.html')

@app.route('/')
def home_page():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('home.html', board = board)

@app.route('/word_submit')
def handle_word_submit():
    word = request.form['word']

