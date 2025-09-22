import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Logo from "../../assets/logo/logo_with_text.svg?react";
import { createClient } from "@supabase/supabase-js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email or password cannot be empty!");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data?.session) {
      localStorage.setItem("token", data.session.access_token);
      navigate("/home");
    }
  };

  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg="#d8ecee"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="flex-start"
      px={4}
    >
      <Logo style={{ width: "400px", height: "400px" }} />
      <Box
        bg="white"
        maxW="400px"
        w="100%"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={5} align="stretch">
          <Heading textAlign="center" color="#275765">
            Login
          </Heading>
          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Field.Root>
                <Field.Label>
                  Email
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  borderColor="#79a5b2"
                  css={{ "--focus-color": "#275765" }}
                />
                <Field.ErrorText>{error}</Field.ErrorText>
              </Field.Root>
              <Field.Root>
                <Field.Label>
                  Password
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  borderColor="#79a5b2"
                  css={{ "--focus-color": "#275765" }}
                />
                <Field.ErrorText>{error}</Field.ErrorText>
              </Field.Root>
              <Button
                type="submit"
                color="white"
                bg="#e1929b"
                _hover={{ bg: "#d87f8c" }}
                width="100%"
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}

export default LoginPage;
