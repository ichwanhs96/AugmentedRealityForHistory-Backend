module.exports = function(Image) {
  Image.addImages = function(request, callback){
    request.forEach(function(entry){
      Image.create(entry);
    });
    var response = [];
    return callback(null, response);
  };

  Image.remoteMethod(
    'addImages',
    {
      description: 'add array image',
      returns: {
        type: 'object', root: true
      },
      accepts: [
        { arg: 'request', type: 'object', required: true, http: {source: 'body'}}
      ],
      http: {verb: 'post', path: '/addImages'}
    }
  );
};
