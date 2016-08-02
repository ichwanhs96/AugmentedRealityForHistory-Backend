module.exports = function(Historycontent) {
  Historycontent.addHistory = function(request, callback){
    if(request == null) {
      var err = new Error();
      err.message = "request body can't be blank";
      err.statusCode = 400;
      return callback(err);
    }
    for(var req in request){
      Historycontent.create(req, function(err, data){
        if(err){
          return callback(err);
        }
      });
    }
    var response = {
      status : "OK",
      statusCode : 200
    };
    return callback(null, response);
  };

  Historycontent.remoteMethod(
    'addHistory',
    {
      description: 'add custom histories',
      returns: {
        type: 'object', root: true
      },
      accepts: [
        { arg: 'request', type: 'object', required: true, http: {source: 'body'}}
      ],
      http: {verb: 'post', path: '/addHistory'}
    }
  );
};
