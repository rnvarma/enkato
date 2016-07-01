# enkato
Using Django (Python 2.7), React, Sass.

Code Coverage: 2%

## Installing
You should make your own python virtual environment (not necessary).

Clone the repo:
```bash
git clone https://github.com/rnvarma/structabl.git
```

Now, install the project dependencies:
```bash
cd structabl
sudo pip install -r requirements.txt
npm install
```
Make sure you use pip for *Python 2.7*.

We need to create a file for mac/pc compatibility. Create a file called "pathtoassets.js" containing the following:
```javascript
module.exports = "."
```
if mac or
```javascript
module.exports = "../.."
```
if pc.

This can be done in one command:
```bash
echo 'module.exports = "."' > pathtoassets.js
```

## Database Setup
You will need to set up migrations for your local sqlite database.

This can be done in two commands:
```bash
python manage.py migrate
python manage.py makemigrations
```

## Launch
There are two servers to launch.

The Webpack server:
```bash
./node_modules/.bin/webpack --config webpack.config.js --watch
```

The Django server:
```bash
python manage.py runserver
```

