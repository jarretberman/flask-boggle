from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    # def test_pdb(self):
    #     with app.test_client() as client:
    #         import pdb
    #         pdb.set_trace()

    def test_play_page(self):
        """Testing general functionality of the home page:
            1. Response code is 200 for the get method
            2. that Session data is properly represented in html
                -<td> elements only made through Jinja if board is formatted correctly
        """
        with app.test_client() as client:
            resp = client.get('/play')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<td>', html)
    def test_check_word(self):
        """check_word should return data to a request as JSON
        
        """
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['A','A','R','O','N'],['A','A','R','O','N'],['A','A','R','O','N'],['A','A','R','O','N'],['A','A','R','O','N']]
            resp = client.get('/check-word?word=Aaron')
            data = resp.get_data(as_text=True)

            self.assertIn("ok", data)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('json', resp.content_type)
