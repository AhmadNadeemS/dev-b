import { UserProfile } from "./../../../utils/types";
import { IncomingPost } from "./[postId]";
import formidable from "formidable";
import {
  formatPosts,
  isAdmin,
  readFile,
  readPostsFromDb,
} from "./../../../lib/utils";
import { postValidationSchema } from "./../../../lib/validator";
import Joi from "joi";
import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import { validateSchema } from "../../../lib/validator";
import Post from "../../../models/Post";
import cloudinary from "../../../lib/cloudinary";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return readPosts(req, res);
    case "POST":
      return createNewPost(req, res);
    default:
      break;
  }
};

const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo, skip } = req.query as {
      limit: string;
      pageNo: string;
      skip: string;
    };
    const posts = await readPostsFromDb(
      parseInt(limit),
      parseInt(pageNo),
      parseInt(skip)
    );
    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(401).json({ error: "unauthorized request!" });
  const { files, body } = await readFile<IncomingPost>(req);
  let tags = [];
  // converting string to array
  if (body.tags) tags = JSON.parse(body.tags as string);
  const error = validateSchema(postValidationSchema, { ...body, tags });

  if (error) return res.status(404).json({ error });

  const { title, meta, content, slug } = body;

  await dbConnect();

  const alreadyExists = await Post.findOne({ slug });
  if (alreadyExists)
    return res.status(400).json({ error: "slug needs to be unique" });

  // creating new post

  const newPost = new Post({
    title,
    meta,
    content,
    slug,
    tags,
  });

  // uploading thumbnails if there is any

  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "dev-blogs",
      }
    );
    newPost.thumbnail = { url, public_id };
  }
  await newPost.save();
  res.json({ post: newPost });
};

export default handler;
