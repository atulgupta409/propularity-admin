import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiCheckSquare } from "react-icons/fi";

const Approve = ({ handleFunction, isEnabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const handleApprove = () => {
    handleFunction();
    onClose()
  }

  if (!isEnabled) {
    return (
      <button disabled style={{ fontSize: "20px", cursor: "not-allowed", color: "gray" }}>
        <FiCheckSquare />
      </button>
    );
  }
  return (
    <>
     <button   style={{ fontSize: "20px", cursor: "pointer", color: "rgb(63 211 17)" }}>
     <FiCheckSquare
        onClick={onOpen}
    
      />
      </button>
     

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Approve
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to Approve this Project.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleApprove} ml={3}>
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Approve;
