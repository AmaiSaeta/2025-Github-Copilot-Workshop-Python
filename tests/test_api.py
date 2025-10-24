import unittest
from flask import Flask
import app

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        app.app.config['TESTING'] = True
        self.client = app.app.test_client()

    def test_index_route(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        html = response.data.decode('utf-8')
        self.assertIn('ポモドーロタイマー', html)
        self.assertIn('id="timer-display"', html)

if __name__ == '__main__':
    unittest.main()
