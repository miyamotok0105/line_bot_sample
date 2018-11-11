

```
pip install line-bot-sdk
pip install flask
```


```
#削除
git remote rm heroku
#作成
heroku apps:create line-bot-sample-hogehoge
#環境変数
heroku config:set MISOJI_CHANNEL_ACCESS_TOKEN=hogehogehoge

heroku config:set MISOJI_CHANNEL_SECRET=hogehogehoge

#push
git push heroku master

#ip確認してLine@に指定
エラーの出てるip入れようね
fixieは関係ない気がした
fixie:tricycle
#log
heroku login
heroku logs --tail
heroku logs --tail --app line-bot-sample-hogehoge


#削除
heroku apps:destroy --app line-bot-sample-hogehoge --confirm line-bot-sample-hogehoge

```


get2started.herokuapp.com:443/linebot/callback


# runtime.txt

```
python-3.7.0 on all (cedar-14, heroku-16, and heroku-18) runtime stacks
python-3.6.6 on all (cedar-14, heroku-16, and heroku-18) runtime stacks
python-2.7.15 on all (cedar-14, heroku-16, and heroku-18) runtime stacks
```


https://devcenter.heroku.com/articles/python-support


古いけどphpのサンプル
https://ledge.ai/line-messaging-api-exp/

