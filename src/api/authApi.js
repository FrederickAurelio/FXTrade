import AV from "leancloud-storage/";

export async function login({ email, pass }) {
  try {
    const user = await AV.User.logIn(email, pass)
    return user
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function signup({ email, pass, username }) {
  try {
    const user = new AV.User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(pass);

    const res = await user.signUp();

    const acl = new AV.ACL();
    acl.setReadAccess(res, true);
    acl.setWriteAccess(res, true)

    res.setACL(acl);
    await res.save();

    const userBalance = AV.Object.extend("userBalance");
    const balance = new userBalance();
    balance.set("balance", 100000);
    balance.set("user", res);
    balance.setACL(acl);
    await balance.save();

    return res;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

export async function forgot(email) {
  try {
    const user = await AV.User.requestPasswordReset(email);
    return user;
  } catch (err) {
    throw new Error(err.message)
  }
}