import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo electrónico inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Campo obligatorio"),
});

const Signin = () => {
  const initialValues = { email: "", password: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const signin = useSelector((store) => store.signin);
  const toast = useToast();

  const token = localStorage.getItem("token");
  console.log("token in signin page ",token)
  console.log("reqUser -: ", user);
  
  useEffect(() => {
    if (token && !user.reqUser) {
      dispatch(getUserProfileAction(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user?.reqUser?.username && token) {
      navigate(`/${user.reqUser?.username}`);
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [user.reqUser, token, navigate, toast]);

  const handleSubmit = async (values, actions) => {
    console.log(values);
    try {
      await dispatch(signinAction(values));
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor verifica tus credenciales",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <div className=" ">
      <div className="border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100">
        <Box p={8} display="flex" flexDirection="column" alignItems="center">
        <img
          className="border border-red-800 mb-5"
          src="https://i.imgur.com/zqpwkLQ.png"
          alt=""
        />
        
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
                Iniciar sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      </div>
      
      <div className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 mt-5">
<p className="text-center py-2 text-black dark:text-gray-100">¿No tienes una cuenta? <span onClick={()=>navigate("/signup")} className="ml-2 text-blue-700 dark:text-blue-400 cursor-pointer">Regístrate</span></p>
      </div>
    </div>
  );
};

export default Signin;
