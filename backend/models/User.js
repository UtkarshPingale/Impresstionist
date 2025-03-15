const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  console.log("\n=== Password Hashing ===");

  // Only hash if password is modified
  if (!this.isModified("password")) {
    console.log("Password not modified, skipping hash");
    return next();
  }

  try {
    console.log("Generating salt...");
    const salt = await bcrypt.genSalt(10);

    console.log("Hashing password...");
    console.log("Original password length:", this.password.length);

    this.password = await bcrypt.hash(this.password, salt);

    console.log("Password hashed successfully");
    console.log("Hashed password length:", this.password.length);

    next();
  } catch (error) {
    console.error("Error in password hashing:", error);
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    if (!this.password) {
      console.log("No password available on the current document");
      const user = await this.model("User")
        .findOne({ _id: this._id })
        .select("+password");

      if (!user || !user.password) {
        console.log("No user or password found");
        return false;
      }

      return bcrypt.compare(candidatePassword, user.password);
    }

    return bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
