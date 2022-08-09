import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Grid,
  theme,
} from '@chakra-ui/react';
import SearchRoute from './components/searchRoute';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={10}>
          <VStack spacing={8}>
            <Heading as='h1' size='xl'>
              Get distance between two places
            </Heading>
            <SearchRoute />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
