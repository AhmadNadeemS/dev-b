import axios from "axios";
import { NextPage } from "next";
import Editor, { FinalPost } from "../../../../components/editor";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { generateFormData } from "../../../../utils/helper";

interface Props {}

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      // * generate form data

      const formData = generateFormData(post);
      // * submit you post

      const data = await axios.post("/api/posts", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={handleSubmit}
          //   initialValue={{
          //     title: "This is from create",
          //     meta: "This is from create",
          //     content: "<h1>This is from create</h1>",
          //     slug: "This-is-from-create",
          //     tags: "javascript",
          //     thumbnail:
          //       "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
          //   }
          //   }
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
