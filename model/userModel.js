import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  type: { 
    type: String, 
    enum: ['admin', 'customer', 'worker', 'delivery'], 
    required: true,
  },
  address: { 
    type: String,
    required: true,
  },
  nic: { 
    type: String,
    required: true,
    unique: true,
    match: [
      /^(\d{9}[vV]|\d{12})$/,
      'NIC must be 9 digits followed by V/v or exactly 12 digits'
    ],
  },
  contactNo: { 
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Contact number must be exactly 10 digits'],
  },
  password: { 
    type: String, 
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character',
    ],
  },
});

const Users = mongoose.model('User', userSchema);
export default Users;