from django.test import TestCase

from backend.models import *

# Create your tests here.

class CreateSeriesTest(TestCase):
    def setUp(self):
        user = User.objects.create(username="test")
        user.set_password("test")
        user.save()

        cu = CustomUser(user=user)
        cu.save()

    def tearDown(self):
        self.client.logout()

    def test_anonymous_user(self):
        response = self.client.post('/createseries', {
            'name': '',
            'description': ''
        })
        self.assertJSONEqual(response.content, {'status': False, 'issue': 'Forbidden to anonymous users'})

    def test_logged_in_user(self):
        self.client.login(username="test", password="test")
        user = User.objects.get(username='test')
        cu = user.customuser
        series = Series.objects.all()
        self.assertEqual(len(series), 0)
        response = self.client.post('/createseries', {
            'name': 'test',
            'description': 'test'
        })
        series = Series.objects.all()
        self.assertEqual(len(series), 1)
        series = series[0]
        self.assertEqual(series.name, 'test')
        self.assertEqual(series.description, 'test')
        self.assertEqual(series.creator, cu)
        self.assertEqual(len(cu.created_series.filter(uuid=series.uuid)), 1)
        self.assertJSONEqual(response.content, {'status': True, 's_uuid': series.uuid})







