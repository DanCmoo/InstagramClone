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
  
  function EditCommentModal({ isOpen, onOpen, onClose,handleProfileImageChange }) {
  
      
  
  
    return (
      <>        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>Opciones</ModalHeader>

            <ModalBody>
              <div className="flex flex-col items-center">
                <label
                  for="profileImage"
                  className="font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full"
                >
                 Eliminar
                </label>

                <input onChange={handleProfileImageChange} type="file" id="profileImage" name="profileImage" />
              </div>

              <hr />

              <p className="font-bold py-3 text-red-600 text-center">
                Editar
              </p>
              <hr />
              <p className=" py-3 text-center" onClick={onClose}>
                Cancelar
              </p>
            </ModalBody>
            {/* <ModalFooter>
                <Button onClick={onClose}>Cerrar</Button>
              </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default EditCommentModal;
  