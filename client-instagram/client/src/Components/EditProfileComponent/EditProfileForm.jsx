import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetailsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { updateUserPostsProfileImage } from "../../Redux/Post/Action";
import { useToast } from "@chakra-ui/react";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";

const EditProfileForm = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile,setImageFile]=useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
    
  });
  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    console.log("reqUser", user.reqUser);
    const newValue = {};

    for (let item in initialValues) {
      if (user.reqUser && user.reqUser[item]) {
        newValue[item] = user.reqUser[item];
      }
    }

    console.log("new value -: ", newValue);

    formik.setValues(newValue);
  }, [user.reqUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (values) => {
      const data = {
        jwt: token,
        data: { ...values, id: user.reqUser?.id },
      };
      dispatch(editUserDetailsAction(data));
      toast({
        title: "Cuenta actualizada...",

        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image)
    const data = {
      jwt: token,
      data: { image, id: user.reqUser?.id },
    };
    dispatch(editUserDetailsAction(data))

    // Actualizar la imagen de perfil en todas las publicaciones del usuario
    dispatch(updateUserPostsProfileImage(user.reqUser?.id, image));

    // Actualizar el perfil del usuario para reflejar el cambio inmediatamente
    dispatch(getUserProfileAction(token))

    onClose();
  }

  const handleRemovePhoto = () => {
    const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    setImageFile(defaultImage);
    const data = {
      jwt: token,
      data: { image: defaultImage, id: user.reqUser?.id },
    };
    dispatch(editUserDetailsAction(data));

    // Actualizar la imagen de perfil en todas las publicaciones del usuario
    dispatch(updateUserPostsProfileImage(user.reqUser?.id, defaultImage));

    // Actualizar el perfil del usuario para reflejar el cambio inmediatamente
    dispatch(getUserProfileAction(token));

    onClose();
  }

  // console.log("initial value ---- ", initialValues);

  return (
    <div className="border rounded-md p-10">
      <div className="flex pb-7">
        <div className="w-[15%]">
          <img
            className="w-8 h-8 rounded-full"
            src={
              imageFile ||
              user.reqUser?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          />
        </div>

        <div>
          <p>{user.reqUser?.username}</p>
          <p
            onClick={onOpen}
            className="font-bold text-blue-800 cursor-pointer"
          >
            Cambiar foto de perfil
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="6">
          <FormControl className="flex " id="name">
            <FormLabel className="w-[15%]">Nombre</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Nombre"
                className="w-full"
                type="text"
                {...formik.getFieldProps("name")}
              />
              <FormHelperText className="text-xs">
                Ayuda a las personas a descubrir tu cuenta usando el nombre por el que te conocen: tu nombre completo, apodo o nombre de empresa.
              </FormHelperText>
              <FormHelperText className="text-xs">
                Solo puedes cambiar tu nombre dos veces en 14 días.
              </FormHelperText>
            </div>
          </FormControl>
          <FormControl className="flex " id="username">
            <FormLabel className="w-[15%]">Usuario</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Usuario"
                className="w-full"
                type="text"
                {...formik.getFieldProps("username")}
              />
              <FormHelperText className="text-xs">
                En la mayoría de los casos, podrás volver a cambiar tu usuario durante los próximos 14 días. Más información
              </FormHelperText>
            </div>
          </FormControl>
          <FormControl className="flex " id="website">
            <FormLabel className="w-[15%]">Sitio web</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Sitio web"
                className="w-full"
                type="text"
                {...formik.getFieldProps("website")}
              />
              <FormHelperText className="text-xs">
                Editar tus enlaces solo está disponible en la app móvil. Visita la app de Instagram y edita tu perfil para cambiar los sitios web en tu biografía.
              </FormHelperText>
            </div>
          </FormControl>
          <FormControl className="flex " id="bio">
            <FormLabel className="w-[15%]">Biografía</FormLabel>
            <div className="w-full">
              <Textarea
                placeholder="Biografía"
                className="w-full"
                type="text"
                {...formik.getFieldProps("bio")}
              />
            </div>
          </FormControl>

          <div className="py-10">
            <p className="font-bold text-sm">Información personal</p>
            <p className="text-xs">
              Proporciona tu información personal, incluso si la cuenta es para un negocio, una mascota u otra cosa. Esto no será parte de tu perfil público.
            </p>
          </div>

          <FormControl className="flex " id="email">
            <FormLabel className="w-[15%]">Correo electrónico</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Correo electrónico"
                className="w-full"
                type="email"
                {...formik.getFieldProps("email")}
              />
            </div>
          </FormControl>

          <FormControl className="flex " id="mobile">
            <FormLabel className="w-[15%]">Número de teléfono</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Teléfono"
                className="w-full"
                type="tel"
                {...formik.getFieldProps("mobile")}
              />
            </div>
          </FormControl>
          <FormControl className="flex " id="gender">
            <FormLabel className="w-[15%]">Género</FormLabel>
            <div className="w-full">
              <select
                className="w-full border rounded px-2 py-2"
                value={formik.values.gender}
                onChange={e => {
                  if (e.target.value !== "Personalizado") {
                    formik.setFieldValue("gender", e.target.value);
                  } else {
                    formik.setFieldValue("gender", "");
                  }
                  formik.setFieldValue("genderOption", e.target.value);
                }}
              >
                <option value="">Prefiero no contestar</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Personalizado">Personalizado</option>
              </select>
              {formik.values.genderOption === "Personalizado" && (
                <Input
                  placeholder="Escribe tu género"
                  className="w-full mt-2"
                  type="text"
                  value={formik.values.gender}
                  onChange={e => formik.setFieldValue("gender", e.target.value)}
                />
              )}
            </div>
          </FormControl>
          {/* <FormControl className="flex " id="private">
            <Checkbox {...formik.getFieldProps("private")}>
              Pr className="w-full"ivate Account
            </Checkbox>
          </FormControl> */}

          <div>
            <Button colorScheme="blue" type="submit" className="">
              Guardar cambios
            </Button>
          </div>
        </Stack>
      </form>

      <ChangeProfilePhotoModal
        handleProfileImageChange={handleProfileImageChange}
        handleRemovePhoto={handleRemovePhoto}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default EditProfileForm;
