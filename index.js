const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const productRouter = require("./router/Product");
const brandsRouter = require("./router/Brand");
const categoryRouter = require("./router/Category");
const userRouter = require("./router/User");
const authRouter = require("./router/Auth");
const cartRouter = require("./router/Cart");
const orderRouter = require("./router/Order");
const { User } = require("./model/User");

server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 604800000 }, // 7 days
  })
);

// Middleware
server.use(express.json());
server.use(morgan("dev"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate("session"));

passport.use(
  "local",
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: username });
      console.log(username, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          return done(null, user);
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
// Main function
main().catch((err) => {
  console.log(err);
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
  console.log("connected to MongoDB");
}

// Routers
server.use("/products", productRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoryRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

// passport
passport.serializeUser(function (user, cb) {
  console.log("serializing user " + user);
  process.nextTick(function () {
    return cb(null, { id: user._id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializing user " + user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

function isAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send(401);
  }
}

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
