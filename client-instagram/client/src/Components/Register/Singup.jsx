import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo electrónico inválido").required("Campo obligatorio"),
  username: Yup.string()
    .min(4, "El usuario debe tener al menos 4 caracteres")
    .required("Campo obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Campo obligatorio"),
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("Campo obligatorio"),
});

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", name:"" };
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
  const navigate=useNavigate();
  const toast = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  
  console.log("auth :-",auth.signup?.username)

  const handleSubmit = (values,actions) => {
    setIsRegistering(true);
    dispatch(signupAction(values))
    console.log("signup",values);
    actions.setSubmitting(false);
  };

  useEffect(()=>{
    if(auth.signup?.username && isRegistering){
      setIsRegistering(false);
      navigate("/login")
      toast({
        title: 'Cuenta creada exitosamente',
        description: 'Ahora puedes iniciar sesión con tus credenciales',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  },[auth.signup, isRegistering, navigate, toast])

  return (
    <div>
        <div className="border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 ">
      <Box p={8} display="flex" flexDirection="column" alignItems="center">
        <img
          className="border border-red-800"
          src="https://i.imgur.com/zqpwkLQ.png"
          alt=""
        />
        <p className="font-bold opacity-50 text-lg mb-10 text-center text-black dark:text-gray-100">
          Regístrate para ver fotos y videos de tus amigos.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="w-full">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb={4}
                  >
                    <Input
                      className="w-full"
                      {...field}
                      id="email"
                      placeholder="Correo electrónico o número de teléfono"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                    mb={4}
                  >
                    <Input {...field} id="username" placeholder="Usuario" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb={4}
                  >
                    <Input {...field} id="name" placeholder="Nombre completo" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mb={4}
                  >
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <p className="text-center text-black dark:text-gray-100">
                Las personas que usan nuestro servicio pueden haber subido tu información de contacto a Instagram. Más información
              </p>
              <p className="mt-5 text-center text-black dark:text-gray-100">
                Al registrarte, aceptas nuestros Términos, Política de privacidad y Política de cookies.
              </p>
              <Button
                className="w-full"
                mt={4}
                colorScheme="blue"
                type="submit"
                isLoading={formikProps.isSubmitting}
              >
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
    <div className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 mt-5">
       <p className="text-center py-2 text-black dark:text-gray-100">¿Ya tienes una cuenta? <span onClick={()=>navigate("/login")} className="ml-2 text-blue-700 dark:text-blue-400 cursor-pointer">Inicia sesión</span></p>
    </div>
    </div>
  
  );
};

export default Signup;
