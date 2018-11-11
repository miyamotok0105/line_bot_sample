# -*- coding: utf-8 -*-
from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)

#追加
from linebot.models import (
    TemplateSendMessage, ButtonsTemplate,
    PostbackTemplateAction, MessageTemplateAction, URITemplateAction
)

import os

app = Flask(__name__)

#環境変数取得
MISOJI_CHANNEL_ACCESS_TOKEN = os.environ["hoge_CHANNEL_ACCESS_TOKEN"]
MISOJI_CHANNEL_SECRET = os.environ["hoge_CHANNEL_SECRET"]

line_bot_api = LineBotApi(MISOJI_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(MISOJI_CHANNEL_SECRET)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)

    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):

    text = ""
    # 1を含んでいた場合は1に上書きして返答
    if "1" in event.message.text:
        text = "1に上書きした！！"
        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(text=text))
    else:
        text = event.message.text

    
    line_bot_api.reply_message(
            event.reply_token,
            TemplateSendMessage(
                alt_text='Buttons template',
                template=ButtonsTemplate(
                    thumbnail_image_url='https://www.sanyobussan.co.jp/products/santhree_pk_kujilucky/images/pc-top-img04.png',
                    title='Menu',
                    text='Please select',
                    actions=[
                        PostbackTemplateAction(
                            label='postback',
                            text='postback text',
                            data='action=buy&itemid=1'
                        ),
                        MessageTemplateAction(
                            label='message',
                            text='message text'
                        ),
                        URITemplateAction(
                            label='uri',
                            uri='https://www.sanyobussan.co.jp/products/santhree_pk_kujilucky/'
                        )
                    ]
                )
            )
        )


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
    
