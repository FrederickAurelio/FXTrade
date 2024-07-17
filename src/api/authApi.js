import AV from "leancloud-storage/";

export async function login({ email, pass }) {
  try {
    const user = await AV.User.logIn(email, pass)
    return user
  } catch (err) {
    throw new Error("Failed to login",)
  }
}