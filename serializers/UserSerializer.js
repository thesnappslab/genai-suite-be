const UserSerializer = user => {
    return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        email: user.email,
        username: user.username,
        lastLoginTime: user.lastLoginTime,
        isActivated: user.isActivated,
        forcePasswordChange: user.forcePasswordChange,
        role: user.role,
        tenant: user.tenant,
    };
};
module.exports = { UserSerializer }