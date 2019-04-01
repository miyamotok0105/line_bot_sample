//line@ api
//https://blog.pnkts.net/2018/06/03/line-messaging-api/

// line developersに書いてあるChannel Access Token
var access_token = "your token here"
// pushしたいときに送る先のuser_id or group_idを指定する
var to = "your user id or group id"
// postされたログを残すスプレッドシートのid
var spreadsheet_id = "spreed sheet id"

/**
 * 指定のuser_idにpushをする
 */
function push(text) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };
 
  var postData = {
    "to" : to,
    "messages" : [
      {
        'type':'text',
        'text':text,
      }
    ]
  };
 
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
 
  return UrlFetchApp.fetch(url, options);
}
 
/**
 * reply_tokenを使ってreplyする
 */
function reply(data) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };
  
  var user_message = data.events[0].message.text;
  var reply_messages;
  if ('かっこいい' == user_message) {
    //かっこいいと入力された際
    reply_messages = ['「' + user_message + '」ですね？\n' + '「' + user_message + '」はこちらになります。\n' + 'https://hogehoge.com',];
    var messages = reply_messages.map(function (v) {
      return {'type': 'text', 'text': v};    
    });
  } else if ('かわいい' == user_message) {
    //かわいいと入力された際
    reply_messages = ['「' + user_message + '」ですね？\n' + '「' + user_message + '」はこちらになります。\n' + 'https://hogehoge.com',];
    var messages = reply_messages.map(function (v) {
      return {'type': 'text', 'text': v};    
    });
  } else if ('普通' == user_message) {
    //普通と入力された際
    reply_messages = ['「' + user_message + '」ですね？\n' + '「' + user_message + '」はこちらになります。\n' + 'https://hogehoge.com',];
    var messages = reply_messages.map(function (v) {
      return {'type': 'text', 'text': v};    
    });
  } else if ('1' == user_message) {
    //
    reply_messages = [''];
    var messages = reply_messages.map(function (v) {
    return {
      "type": "template",
      "altText": "This is a buttons template",
      "template": {
        "type": "buttons",
        "thumbnailImageUrl": "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_641,c_fill,g_auto,h_361,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180316113418-travel-with-a-dog-3.jpg",
        "imageAspectRatio": "rectangle",
        "imageSize": "cover",
        "imageBackgroundColor": "#FFFFFF",
        "title": "Menu",
        "text": "Please select",
        "defaultAction": {
          "type": "uri",
          "label": "View detail",
          "uri": "https://777.nifty.com/cms_image/777/780/crsyakarina/machine_big.png"
        },
        "actions": [
          {
            "type": "postback",
            "label": "Buy",
            "data": "action=buy&itemid=123"
          },
          {
            "type": "postback",
            "label": "Add to cart",
            "data": "action=add&itemid=123"
          },
          {
            "type": "uri",
            "label": "View detail",
            "uri": "http://example.com/page/123"
          }
        ]
      }
    };
    });
    

  } else if ('2' == user_message) {
    //
    reply_messages = [''];
    var messages = reply_messages.map(function (v) {
    return   {
      "type": "template",
      "altText": "this is a image carousel template",
      "template": {
        "type": "image_carousel",
        "columns": [
          {
            "imageUrl": "https://777.nifty.com/cms_image/777/780/crsyakarina/machine_big.png",
            "action": {
              "type": "postback",
              "label": "Buy",
              "data": "action=buy&itemid=111"
            }
          },
          {
            "imageUrl": "https://777.nifty.com/cms_image/777/780/crsyakarina/machine_big.png",
            "action": {
              "type": "message",
              "label": "Yes",
              "text": "yes"
            }
          },
          {
            "imageUrl": "https://777.nifty.com/cms_image/777/780/crsyakarina/machine_big.png",
            "action": {
              "type": "uri",
              "label": "View detail",
              "uri": "https://777.nifty.com/pachinko/crsyakarina/"
            }
          }
        ]
      }
    };
    });
    
  }
  else {
    //かっこいい、かわいい、普通が入力されたときの処理
    reply_messages = ['「かっこいい」、「かわいい」、「普通」で入力してくださいね！'];
    var messages = reply_messages.map(function (v) {
      return {'type': 'text', 'text': v};    
    });
  }
  //var messages = reply_messages.map(function (v) {
  //  return {'type': 'text', 'text': v};    
  //});
  
  
  var postData = {
    "replyToken" : data.events[0].replyToken,
    'messages': messages,
  };
 
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
 
  return UrlFetchApp.fetch(url, options);
}


/*
function reply(data) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };
    
  var postData = {
    "replyToken" : data.events[0].replyToken,
    "messages" : [
      {
        'type':'text',
        'text':data.events[0].message.text,
      }
    ]
  };
 
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
 
  return UrlFetchApp.fetch(url, options);
}
*/
 
/*
*/
function getLastRowWithValue() {
  const sheet = SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log');
  const columnVals = sheet.getRange('B:B').getValues(); // B列の値を配列で取得
  var LastRow = columnVals.filter(String).length;  //空白を除き、配列の数を取得

  //Logger.log(LastRow);
  return LastRow;
}


/**
 * postされたときの処理
 */
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var row = getLastRowWithValue();
  
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 2).setValue(json.events[0].replyToken);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 3).setValue(json.events[0].source.type);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 4).setValue(json.events[0].source.userId);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 5).setValue(json.events[0].type);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 6).setValue(json.events[0].message.id);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 7).setValue(json.events[0].message.text);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 8).setValue(json.events[0].message.type);
  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log').getRange(row+1, 9).setValue(json.events[0].timestamp);
    
  reply(json);
}

/**
 * pushをしてみる
 */
function test() {
  push('ぱちぱち');
}

/**
 * getされたときの処理
 */
function doGet() {
  var template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

