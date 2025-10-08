import express from 'express';
import fs from 'fs';

const router = express.Router();
router.post('/signin', (req, res) => {
    const usersFile = process.env.USERS_FILE;
    const { email, password } = req.body;
    if (!email || !password ) {
        return res.status(400).json({ error: 'Vui lòng điền vào chỗ trống.'});
    } 
    let users = [];
    try {
        const data = fs.readFileSync(usersFile, 'utf-8');
        users = JSON.parse(data);
    } catch {
        res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.'})
    }
    const exists = users.find(u => u.email === email && u.password === password);
    if (exists) {
        return res.status(200).json( { message: 'Đăng nhập tài khoản thành công.',
        role: exists.role || "user", 
        email: exists.email
    })
    } else {
        res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.' })
    }   
});

export default router;
