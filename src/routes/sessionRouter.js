import { Router } from "express";
import passport from "passport";
import { login, register, sessionGithub, logout, testJWT } from "../controllers/sessionController.js";
const sessionRouter = Router()

sessionRouter.get('/login', passport.authenticate('login'), login)

sessionRouter.post('/register', passport.authenticate('register'), register)

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

sessionRouter.get('/githubSession', passport.authenticate('github'), sessionGithub)

sessionRouter.get('/logout', logout)

sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: false }), testJWT)

export default sessionRouter