const isValidUserID = (userId, fn) => {
  User.findOne({ userId: userId }, function (err, user) {
    fn(user);
  });
};

module.exports = { isValidUserID };
