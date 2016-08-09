module.exports = function(Userforhistory) {
  Userforhistory.afterRemote("login", function(context, model, next){
    Userforhistory.findOne({where:{id: context.result.userId}}, function(err, user){
      context.result.isTeacher = user.isTeacher;
      context.result.username = user.username;
      context.result.email = user.email;
      return next();
    });
  });
};
