const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookeParser = require("cookie-parser");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const productRouter = require("./router/Product");
const brandsRouter = require("./router/Brand");
const categoryRouter = require("./router/Category");
const userRouter = require("./router/User");
const authRouter = require("./router/Auth");
const cartRouter = require("./router/Cart");
const orderRouter = require("./router/Order");
const { User } = require("./model/User");
const {
  sanitizeUser,
  SECRET_KEY,
  isAuth,
  cookieExtractor,
} = require("./services/common");
const cookieParser = require("cookie-parser");

// JWT options
var opts = {};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;
server.use(cookieParser());
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
server.use(express.static("dist"));
// Local strategy
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: email });
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
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          return done(null, { token });
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
// JWT strategy
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(error, false);
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
server.use("/users", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", orderRouter.router);

// passport
passport.serializeUser(function (user, cb) {
  console.log("serializing user " + user);
  process.nextTick(function () {
    return cb(null, sanitizeUser(user));
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializing user " + user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
