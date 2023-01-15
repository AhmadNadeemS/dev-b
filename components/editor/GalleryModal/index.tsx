import Image from "next/image";
import { ChangeEventHandler, FC, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ActionButton from "../../common/ActionButton";
import ModalContainer, { ModalProps } from "../../common/ModalContainer";
import Gallery from "./Gallery";

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface Props extends ModalProps {
  onImageSelect(image: File): void;
  uploading?: boolean;
  onSelect(result: ImageSelectionResult): void;
  images: { src: string }[];
}

// const images = [
//   {
//     src: "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664784805210-9fa665e2b7e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664719772929-4e7265bb3c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664740688843-0e8ad76b07a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664725594423-3a221a3469ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664737426331-a1cde6c831d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664575198263-269a022d6e14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664745027113-0145831af78a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664750160078-254952b00ec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664777415004-d83abf07a61a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664268531721-b3a29768467b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1635774855317-edf3ee4463db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1604404157820-e90f6ff383b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1453230806017-56d81464b6c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwzMzN8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1415935701388-58a01402490d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwzMzN8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1473881823110-d94cac66318a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTUxODk5fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664480169131-899eb1aae002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664295776783-6e72b6ab1387?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664286423988-d742f1165f9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1645474886991-032013802da0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664021029310-bc881e4ebb22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1664091729644-07a158d7c4ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1663667163173-b1c11c74bb49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1663657471161-30b3d75d82cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
// ];

const GalleryModal: FC<Props> = ({
  visible,
  onClose,
  onImageSelect,
  onSelect,
  images,
  uploading,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState("");
  const [altText, setAltText] = useState("");

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    if (!file.type.startsWith("image")) return onClose && onClose();
    onImageSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return onClose && onClose();
    onSelect({ src: selectedImage, altText });
    onClose && onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="min-w-[600px] p-2 bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          {/* gallery */}
          <div className="basis-[75%] custom-scroll-bar max-h-[450px] overflow-y-auto">
            <Gallery
              images={images}
              onSelect={(src) => setSelectedImage(src)}
              selectedImage={selectedImage}
              uploading={uploading}
            />
          </div>
          {/* image selection and upload */}
          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input
                  onChange={handleOnImageChange}
                  hidden
                  type="file"
                  name=""
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <div className="w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded">
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage ? (
                <>
                  <textarea
                    className="bg-transparent resize-none w-full rounded border-2 border-secondary-dark focus:ring-2
                  text-primary dark:text-primary-dark h-32 p-1"
                    placeholder="Alt text"
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>
                  <ActionButton title="Select" onClick={handleSelection} />
                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      src={selectedImage}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;