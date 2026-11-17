import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

function generateToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'campo_enterprise_erp_jwt_secret_key_2025_secure',
    { expiresIn: '7d' }
  );
}

// @desc    Authenticate admin & return JWT
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error('[Auth Controller] Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
}

// @desc    Get currently authenticated admin
// @route   GET /api/auth/me
// @access  Private
export async function getMe(req, res) {
  try {
    res.json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Helper: Seed initial admin account if database is empty
export async function seedInitialAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = (process.env.ADMIN_EMAIL || 'admin@campo.co.in').toLowerCase().trim();
      const password = process.env.ADMIN_PASSWORD || 'admin';
      const name = process.env.ADMIN_NAME || 'Campo Super Admin';

      await Admin.create({
        name,
        email,
        password,
        role: 'Super Admin',
      });

      console.log(`[Seed] Initial Admin created successfully:`);
      console.log(`       Email:    ${email}`);
      console.log(`       Password: ${password}`);
    }
  } catch (error) {
    console.error('[Seed] Error creating initial admin:', error.message);
  }
}
