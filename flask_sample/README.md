
# flaskをgunicorn上で動かす

ローカルをpython3.6環境にする。

pip install Flask==0.12.1
touch main.py
<!-- pip freeze > requirements.txt -->
echo web: gunicorn -b 0.0.0.0:$PORT main:app  --log-file=- > Procfile
echo python-3.6.6 > runtime.txt

git init
git add .
git commit -m "initial commit"

#構築
heroku apps:create web-sample-hogehoge
git push heroku master

# これも動いた！
open https://web-sample-hogehoge.herokuapp.com

#削除
heroku apps:destroy --app web-sample-hogehoge --confirm web-sample-hogehoge


