deploy:
	export ENKATO_SERVER=PROD
	npm run webpack-prod
	python manage.py migrate
	python manage.py collectstatic
	git add .
	git commit -m “push”
	git push origin master
	git push heroku master
	export ENKATO_SERVER=
