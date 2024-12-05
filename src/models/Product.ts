import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.methods.applyDiscount = function (percent: number) {
  this.price = this.price - (this.price * (percent / 100));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return this.price;
};

const Product = mongoose.model('Product', productSchema);
export default Product;
