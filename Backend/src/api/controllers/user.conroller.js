const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { isValidEmail } = require('../../middleware/userValidation');


exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

       
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (password.length < 8 || !/[a-z]/.test(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one lowercase letter ([a-z])' });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
           
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
  
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

 
        const token = jwt.sign({ userId: user._id, email: user.email }, 'iness123', { expiresIn: '1h' });

        
        console.log(user.role)
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });
    }
};