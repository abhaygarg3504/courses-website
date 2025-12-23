// schema for FAQ
import mongoose from 'mongoose';

const Faqschema = new mongoose.Schema({
    question : String,
    answer : String,
})

const Faq = mongoose.model("faqs" , Faqschema);
export default Faq;