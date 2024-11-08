import express from 'express'
import { signup, login} from '../controller/userController.js'
import { createAccount, listAccounts, deposit, transfer} from '../controller/accountController.js'
import authenticateToken from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/account', authenticateToken, createAccount)
router.get('/accounts', authenticateToken, listAccounts)
router.post('/deposit', authenticateToken, deposit)
router.post('/transfer', authenticateToken, transfer)

router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Acesso autorizado' });
})



export default router
