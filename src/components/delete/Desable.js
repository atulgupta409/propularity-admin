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
import { RxCrossCircled } from "react-icons/rx";

const Desable = ({ handleFunction, isEnabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const handleReject = () => {
    handleFunction();
    onClose()
  }
  if (!isEnabled) {
    return (
      <button disabled style={{ fontSize: "20px", cursor: "not-allowed", color: "gray" }}>
        <RxCrossCircled />
      </button>
    );
  }
  return (
    <>
     <button  style={{ fontSize: "20px", cursor: "pointer", color: "#444" }}>
     <RxCrossCircled
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
              Disable
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to Disable this Project.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleReject} ml={3}>
                Disable
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Desable;
