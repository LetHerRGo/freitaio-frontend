import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmError("Passwords do not match!");
    } else {
      setConfirmError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All field are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: "John",
          age: 27,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data?.user) {
      navigate("/login");
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
            Sign up
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Field.Root required>
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
              </Field.Root>
              <Field.Root invalid={!!confirmError} required>
                <Field.Label>
                  Password
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  borderColor={confirmError ? "red.400" : "#79a5b2"}
                  css={{ "--focus-color": "#275765" }}
                />
              </Field.Root>
              <Field.Root invalid={!!confirmError} required>
                <Field.Label>
                  Confirm password
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  borderColor={confirmError ? "red.400" : "#79a5b2"}
                  css={{ "--focus-color": "#275765" }}
                />
                <Field.ErrorText>{confirmError}</Field.ErrorText>
              </Field.Root>
              <Button
                type="submit"
                color="white"
                bg="#e1929b"
                _hover={{ bg: "#d87f8c", borderColor: "transparent" }}
                width="100%"
              >
                Sign up
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}

export default SignupPage;
