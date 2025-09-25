import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Text,
  Heading,
  Link,
  HStack,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import Logo from "../../assets/logo/logo_with_text.svg?react";
import { createClient } from "@supabase/supabase-js";
import CustomAlert from "../../components/CustomAlert/CustomAlert.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    if (location.state?.success) {
      setSignupSuccess(location.state.success);
      // clear from history so it won’t reappear on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            <CustomAlert
              status="error"
              alertMessage={error}
              onClose={() => setError("")}
            />
          )}
          {signupSuccess && (
            <CustomAlert
              status="success"
              alertMessage={signupSuccess}
              onClose={() => setSignupSuccess("")}
            />
          )}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Field.Root required>
                <Field.Label>Email</Field.Label>
                <Input
                  value={email}
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  borderColor="#79a5b2"
                  css={{ "--focus-color": "#275765" }}
                />
                <Field.ErrorText>{error}</Field.ErrorText>
              </Field.Root>
              <Field.Root required>
                <Field.Label>Password</Field.Label>
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
                _hover={{ bg: "#d87f8c", borderColor: "transparent" }}
                width="100%"
              >
                Login
              </Button>
              <HStack justify="space-between" w="100%">
                <Link
                  as={RouterLink}
                  to="/forgot-password"
                  color="#275765"
                  fontSize="sm"
                  _hover={{ color: "#d87f8c", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
                <Link
                  as={RouterLink}
                  to="/signup"
                  color="#275765"
                  fontSize="sm"
                  _hover={{ color: "#d87f8c", textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </HStack>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}

export default LoginPage;
