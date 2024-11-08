import User from '../models/User.js'

export const createAccount = async (req, res) => {
    const { number } = req.body 

    if (typeof number !== 'number') {
        return res.status(400).json({ message: 'Número inválido.' })
    }

    try {
        const user = await User.findById(req.user.id)
        user.contas= number
        await user.save()
        res.status(201).json({ message: 'Conta criada com sucesso!', contas: user.contas })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar conta.', error: error.message })
    }
};


export const listAccounts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ contas: user.contas })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar contas.', error: error.message })
    }
}

export const deposit = async (req, res) => {
    const { valor } = req.body

    if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ message: 'Valor inválido para depósito.' })
    }

    try {
        const user = await User.findById(req.user.id)
        user.contas += valor
        await user.save()
        res.status(201).json({ message: 'Depósito realizado com sucesso!', conta: user.contas })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar depósito.', error: error.message })
    }
}


export const transfer = async (req, res) => {
    const { recUsername, valor } = req.body

    if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ message: 'Valor inválido para transferência.' })
    }

    try {
        const rem = await User.findById(req.user.id)
        const rec = await User.findOne({ username: recUsername })

        if (!rec) {
            return res.status(404).json({ message: 'Usuário destinatário não encontrado.' })
        }

        if (rem.contas < valor) {
            return res.status(400).json({ message: 'Saldo insuficiente para transferência.' })
        }

        rem.contas -= valor
        rec.contas += valor
        await rem.save()
        await rec.save()

        res.status(200).json({ message: 'Transferência realizada com sucesso!', conta: rem.contas })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar transferência.', error: error.message })
    }
}