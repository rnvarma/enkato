from django.contrib.auth.models import User
from django.test import TestCase

from backend.models import *

# Create your tests here.

class UploadVideoTest(TestCase):
    def setUp(self):
        user = User.objects.create(username="test")
        user.set_password("test")
        user.save()

        cu = CustomUser(user=user)
        cu.save()

    def tearDown(self):
        self.client.logout()

    def test_anonymous_user(self):
        response = self.client.get('/upload', follow=True)
        self.assertRedirects(response, '/login?next=/upload')
        response = self.client.get('/upload', follow=True)
        self.assertRedirects(response, '/login?next=/upload')

    def test_logged_in_user(self):
        response = self.client.get('/upload', follow=True)
        self.assertRedirects(response, '/login?next=/upload')
        self.client.login(username="test", password="test")
        response = self.client.get('/upload', follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'upload/upload.html')

    def test_create_video_post(self):
        self.client.login(username="test", password="test")
        user = User.objects.get(username="test")
        cu = user.customuser
        response = self.client.post('/upload', {
            'source': 'youtube',
            'url': 'https://www.youtube.com/watch?v=WPvGqX-TXP0&list=PLGLfVvz_LVvSPjWpLPFEfOCbezi6vATIh'
        })
        video = Video.objects.all()
        self.assertEqual(len(video), 1)
        video = video[0]
        self.assertEqual(video.name, "Java Programming")
        self.assertEqual(video.duration, 2070)
        self.assertEqual(video.source, "youtube")
        self.assertEqual(video.vid_id, "WPvGqX-TXP0")
        self.assertEqual(video.creator, cu)
        self.assertEqual(cu.video_uploads.get(uuid=video.uuid), video)
        self.assertJSONEqual(response.content, {'v_uuid': video.uuid})



