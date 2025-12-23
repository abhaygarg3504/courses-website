import User from "../Models/User.js";
import Cart from "../Models/Cart.js";
import Courses from "../Models/Course.js";

async function cartItem(req, res, next) {
  try {
    let user = await User.findOne({ email: req.session.passport.user });
    let cartItems = await Cart.findOne({ user: user._id }).populate("courses");
    if (cartItems) {
      res.status(200).send(cartItems);
    } else {
      res.status(200).send({ message: "No item in cart", courses: [] });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function addCartItem(req, res, next) {
  let course = await Courses.findOne({ _id: req.query.id });
  let user = await User.findOne({ email: req.session.passport.user });
  const cart = await Cart.findOne({ user: user._id });
  if (cart) {
    if (cart.courses.indexOf(course._id) === -1) {
      try {
        cart.courses.push(course._id);
        await cart.save();
        res.status(200).json({ message: "Item added to cart" });
      } catch (error) {
        res.status(400).json({ message: "some error occurred" });
      }
    } else {
      cart.courses.splice(cart.courses.indexOf(course._id), 1);
      cart.save();
      res.status(201).json({ message: "Item removed from cart" });
    }
  } else {
    const cart = await Cart.create({
      user: user._id,
      courses: course._id,
    });
    res.status(200).json({ message: "Item added to cart" });
  }
}

async function deleteCartItem(req, res, next) {
  try {
    const user = await User.findOne({ email: req.session.passport.user });
    const cart = await Cart.findOne({ user: user._id });
    cart.courses.splice(cart.courses.indexOf(req.query.id), 1);
    cart.save();
    res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "some error occurred" });
  }
}

async function addMulitpleItems(req, res, next) {
  let course_ids = req.body.data;
  try {
    const user = await User.findOne({ email: req.session.passport.user });
    const existedCart = await Cart.findOne({ user: user._id });
    if (!existedCart) {
      const cart = await Cart.create({
        user: user._id,
        courses: course_ids
      });
      res.status(200).json({ message: "Success", cart: cart });
    }
  } catch (error) {
    res.status(400).json({ message: "Some error occurred" });
  }
}

const cartRoutes = { cartItem, deleteCartItem, addCartItem, addMulitpleItems };

export default cartRoutes;
