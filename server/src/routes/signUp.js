import express from 'express';
import fs from 'fs';

const router = express.Router();

router.post('/signup', (req, res) => {
    console.log("req.body:", req.body);
    const usersFile = process.env.USERS_FILE;
    const { name, email, password, confirmedPassword, role } = req.body;
    if (!name || !email || !password || !confirmedPassword || !role) {
        return res.status(400).json({ error: 'Vui lòng điền vào chỗ trống.' });
    } 
    let users = [];
    try {
        const data = fs.readFileSync(usersFile, 'utf-8');
        users = JSON.parse(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.' })
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.status(400).json({ error: 'Email đã được đăng ký.' });
    }

    users.push({ name, email, password, role });

    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        res.json({ message: 'Đăng ký tài khoản thành công.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Đăng ký tài khoản thất bại. Vui lòng thử lại sau.' })
    }
})

export default router;
