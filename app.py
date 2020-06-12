from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "guitar"

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route('/jasmine/tests')
def test_page():
    return render_template('jasmine.html')

@app.route('/')
def start_page():
    return render_template('start.html')

@app.route('/play')
def home_page():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('home.html', board = board)

@app.route("/check-word")
def check_word():
    """Check if word is in dictionary."""

    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})
    



