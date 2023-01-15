// * title, content, meta, slug, tags, thumbnails. author, date

import { model, models, Schema, ObjectId, Model } from "mongoose";

export interface PostModelSchema {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string;
  meta: string;
  tags: string[];
  thumbnail?: { url: string; public_id: string };
  author: ObjectId;
  createdAt: Date;
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = models?.Post || model("Post", PostSchema);

export default Post as Model<PostModelSchema>;