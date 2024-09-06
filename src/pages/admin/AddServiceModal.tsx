import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAddServiceMutation } from "../../redux/features/service/serviceApi";

interface AddServiceModalProps {
  toggleModal: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ toggleModal }) => {
  const [addService] = useAddServiceMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string>("");
  const toast = useToast();
  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files || files.length === 0) {
      console.error("No file selected for upload");
      toast({
        title: "No file selected for upload",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const formData = new FormData();
      formData.append("image", base64.split(",")[1]);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();

        if (response.ok) {
          const imageUrl = result.data.url;
          setImage(imageUrl);
          toast({
            title: "Image uploaded successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw new Error(result.error.message);
        }
      } catch (error) {
        console.error("Error uploading file to ImgBB:", error);
        toast({
          title: "Error uploading file",
          description: (error as Error).message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast({
        title: "Image is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const service = {
      name,
      description,
      duration: parseFloat(duration),
      price: parseFloat(price),
      image,
      isDeleted: false,
    };

    try {
      await addService(service).unwrap();
      toggleModal();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to save service",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={true} onClose={toggleModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Type service description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="duration">Duration (in hours)</FormLabel>
              <Input
                id="duration"
                type="number"
                placeholder="Service Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="price">Price (in USD)</FormLabel>
              <Input
                id="price"
                type="number"
                placeholder="Service Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="image">Upload Image</FormLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal}>Cancel</Button>
          <Button colorScheme="blue" ml={3} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddServiceModal;
