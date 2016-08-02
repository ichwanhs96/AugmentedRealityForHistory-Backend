var app = require('../server');

module.exports = function(History) {
  History.getHistoriesByUserId = function(id, callback){
    var Content = app.models.Content;
    var HistoryContent = app.models.HistoryContent;
    var UserForHistory = app.models.UserForHistory;
    var response = {};
    History.find({where:{userForHistoryId:id}}, function(err, histories){
      if(err){
        return callback(err);
      }
      histories.forEach(function(history){
        var obj = JSON.parse(JSON.stringify(history));
        obj.contents = [];
        HistoryContent.find({where:{historyId:history.id}}, function(err, historyContents){
          if(err){
            return callback(err);
          }
          historyContents.forEach(function(historyContent){
            Content.findOne({where:{id:historyContent.contentId}}, function(err, content){
              if(err){
                return callback(err);
              }
              var objContent = JSON.parse(JSON.stringify(content));
              objContent.position = historyContent.position;
              PointOfInterest.findOne({where:{id:objContent.pointOfInterestId}}, function(err, poi){
                if(err){
                  return callback(err);
                }
                UserForHistory.findOne({where:{id:obj.userForHistoryId}}, function (err, user) {
                  if(err){
                    return callback(err);
                  }
                  obj.isTeacher = user.isTeacher;
                  objContent.pointOfInterest = poi;
                  pushContentToObj(obj, objContent, historyContents.length, histories.length);
                });
              });
            });
          });
        });
      });

      function pushObjToResponse(obj, historiesLength){
        response.histories.push(obj);
        if(response.histories.length == historiesLength){
          returnResponse();
        }
      }

      function pushContentToObj(obj, content, historyContentsLength, historiesLength){
        obj.contents.push(content);
        if(obj.contents.length == historyContentsLength){
          pushObjToResponse(obj, historiesLength);
        }
      }

      function returnResponse(){
        return callback(null, response);
      }
    });
  };

  History.remoteMethod(
    'getHistoriesByUserId',
    {
      description: 'get custom histories by user id',
      returns: {
        type: 'object', root: true
      },
      accepts: {
        arg: 'id', type: 'string', required: true
      },
      http: {verb: 'get', path: '/:id/getHistoriesByUserId'}
    }
  );

  History.getHistories = function(callback){
    var Content = app.models.Content;
    var HistoryContent = app.models.HistoryContent;
    var PointOfInterest = app.models.PointOfInterest;
    var UserForHistory = app.models.UserForHistory;
    var response = {histories:[]};
    History.find({}, function(err, histories){
      if(err){
        return callback(err);
      }
      histories.forEach(function(history){
        var obj = JSON.parse(JSON.stringify(history));
        obj.contents = [];
        HistoryContent.find({where:{historyId:history.id}}, function(err, historyContents){
          if(err){
            return callback(err);
          }
          historyContents.forEach(function(historyContent){
            Content.findOne({where:{id:historyContent.contentId}}, function(err, content){
              if(err){
                return callback(err);
              }
              var objContent = JSON.parse(JSON.stringify(content));
              objContent.position = historyContent.position;
              PointOfInterest.findOne({where:{id:objContent.pointOfInterestId}}, function(err, poi){
                if(err){
                  return callback(err);
                }
                UserForHistory.findOne({where:{id:obj.userForHistoryId}}, function (err, user) {
                  if(err){
                    return callback(err);
                  }
                  obj.isTeacher = user.isTeacher;
                  objContent.pointOfInterest = poi;
                  pushContentToObj(obj, objContent, historyContents.length, histories.length);
                });
              });
            });
          });
        });
      });

      function pushObjToResponse(obj, historiesLength){
        response.histories.push(obj);
        if(response.histories.length == historiesLength){
          returnResponse();
        }
      }

      function pushContentToObj(obj, content, historyContentsLength, historiesLength){
        obj.contents.push(content);
        if(obj.contents.length == historyContentsLength){
          pushObjToResponse(obj, historiesLength);
        }
      }

      function returnResponse(){
        return callback(null, response);
      }
    });
  };

  History.remoteMethod(
    'getHistories',
    {
      description: 'get all custom histories',
      returns: {
        type: 'object', root: true
      },
      http: {verb: 'get', path: '/getHistories'}
    }
  )
};
