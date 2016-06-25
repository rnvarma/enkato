from django.contrib.auth.models import User
from django.test import TestCase

from backend.models import *

# Create your tests here.

class LoginTest(TestCase):
    def setUp(self):
        user = User.objects.create(username="test")
        user.set_password("test")
        user.save()

        cu = CustomUser(user=user)
        cu.save()

    def tearDown(self):
        self.client.logout()

    def test_load_page(self):
        response = self.client.get('/login', follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'authentication/login.html')

    def test_complete_login(self):
        response = self.client.post('/login', {
            'user_name': 'test',
            'password': 'test'
        })
        self.assertJSONEqual(response.content, {'status': True})

    def test_already_logged_in(self):
        self.client.login(username="test", password="test")
        response = self.client.get('/login', follow=True)
        self.assertRedirects(response, '/')
        self.assertEqual(response.status_code, 200)

    def test_incorrect_user_name(self):
        response = self.client.post('/login', {
            'user_name': 'woo',
            'password': 'test'
        })
        self.assertJSONEqual(response.content, {'status': False, 'issue': 'Incorrect username or password'})

    def test_incorrect_password(self):
        response = self.client.post('/login', {
            'user_name': 'test',
            'password': 'wooo'
        })
        self.assertJSONEqual(response.content, {'status': False, 'issue': 'Incorrect username or password'})

class RegistrationTest(TestCase):
    def setUp(self):
        user = User.objects.create(username="test")
        user.set_password("test")
        user.save()

        cu = CustomUser(user=user)
        cu.save()

    def tearDown(self):
        self.client.logout()

    def test_load_page(self):
        response = self.client.get('/register', follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'authentication/register.html')

    def test_already_logged_in(self):
        self.client.login(username="test", password="test")
        response = self.client.get('/register', follow=True)
        self.assertRedirects(response, '/')
        self.assertEqual(response.status_code, 200)

    def test_succesful_register(self):
        response = self.client.post('/register', {
            'user_name': 'test1',
            'password': 'test1',
            'email': 'test1@test1.com',
            'first_name': 'test1',
            'last_name': 'test1'
        })
        self.assertJSONEqual(response.content, {'status': True})
        
        user = User.objects.get(username='test1')
        self.assertEqual(user.email, 'test1@test1.com')
        self.assertEqual(user.first_name, 'test1')
        self.assertEqual(user.last_name, 'test1')

        cu = CustomUser.objects.get(user=user)
        self.assertEqual(cu.user, user)
        self.assertEqual(cu.email, 'test1@test1.com')
        self.assertEqual(cu.username, 'test1')
        self.assertEqual(cu.first_name, 'test1')
        self.assertEqual(cu.last_name, 'test1')

        result = self.client.login(username='test1', password='test1')
        self.assertTrue(result)

    def test_register_existing_username(self):
        response = self.client.post('/register', {
            'user_name': 'test',
            'password': 'test1',
            'email': 'test1@test1.com',
            'first_name': 'test1',
            'last_name': 'test1'
        })
        self.assertJSONEqual(response.content, {'status': False, 'issue': 'Username already exists'})

class LogoutTest(TestCase):
    def setUp(self):
        user = User.objects.create(username="test")
        user.set_password("test")
        user.save()

        cu = CustomUser(user=user)
        cu.save()

    def tearDown(self):
        self.client.logout()

    def test_load_page_anonymously(self):
        response = self.client.get('/logout', follow=True)
        self.assertRedirects(response, '/')
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        self.client.login(username='test', password='test')
        response = self.client.get('/logout', follow=True)
        self.assertRedirects(response, '/login')
        self.assertEqual(response.status_code, 200)




