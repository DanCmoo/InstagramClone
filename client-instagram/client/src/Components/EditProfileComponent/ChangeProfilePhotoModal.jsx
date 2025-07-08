import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function ChangeProfilePhotoModal({ isOpen, onClose, handleProfileImageChange, handleRemovePhoto }) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Cambiar foto de perfil</ModalHeader>

          <ModalBody>
            <div className="flex flex-col items-center">
              <label
                htmlFor="profileImage"
                className="font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full"
              >
                Subir foto
              </label>

              <input onChange={handleProfileImageChange} type="file" id="profileImage" name="profileImage" />
            </div>

            <hr />

            <button
              className="font-bold py-3 text-xs text-red-600 text-center w-full hover:bg-red-50"
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={handleRemovePhoto}
            >
              Quitar foto
            </button>
            <hr />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} w="100%">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeProfilePhotoModal;
