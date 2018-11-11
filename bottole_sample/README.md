
# bottleで動かす最小構成

ローカルをpython3.6環境にする。

pip install bottle
touch app.py
<!-- pip freeze > requirements.txt -->
echo web: python app.py > Procfile
echo python-3.6.6 > runtime.txt

git init
git add .
git commit -m "initial commit"

#削除
git remote rm heroku
#構築
heroku apps:create bottle-sample-hogehoge
git push heroku master

# これは動いた
open https://bottle-sample-hogehoge.herokuapp.com

#削除
heroku apps:destroy --app bottle-sample-hogehoge --confirm bottle-sample-hogehoge


