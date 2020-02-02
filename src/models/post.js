const mongoose = require("mongoose");
const uuidv4 = require('uuid/v4');

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  id: {
    type: String,
    default: uuidv4()
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true,
  }
});

PostSchema.virtual("createdAt")
  .get(function() {
    return this.datetime;
  });

const Post = model("Post", PostSchema);

// const myTestPost = new Post({
//     title: "task-force",
//     content:
//       "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
//     author: "Sheilah Poltun"
// });

// myTestPost.save()
//   .then(response => {
//     console.log(response);
//   }).catch(console.error);

module.exports = Post;