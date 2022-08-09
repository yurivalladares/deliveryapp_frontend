import {
    React,
    useState
} from 'react';

import {
    FormControl,
    ButtonGroup,
    FormLabel,
    Box,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    Text,
} from '@chakra-ui/react';
import { Form, useField } from "react-final-form";
import TableRoute from './tableRoute';


const SearchRoute = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [displayResult, setDisplayResult] = useState('none');
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('none');

    const validate = (values) => {
        const errors = {}
        if (!values.origin) {
            errors.origin = 'Required'
        }
        if (!values.destiny) {
            errors.destiny = 'Required'
        }

        return errors
    }

    const Control = ({ name, ...rest }) => {
        const { meta: { error, touched } } = useField(name, { subscription: { touched: true, error: true } });

        return <FormControl {...rest} isInvalid={error && touched} />;
    };

    const Error = ({ name }) => {
        const {
            meta: { error }
        } = useField(name, { subscription: { error: true } });
        return <FormErrorMessage>{error}</FormErrorMessage>;
    };

    const InputControl = ({ name, label, placeholder }) => {
        const { input, meta } = useField(name);
        return (
            <Control name={name} my={4}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Input
                    {...input}
                    isInvalid={meta.error && meta.touched}
                    id={name}
                    placeholder={placeholder}
                />
                <Error name={name} />
            </Control>
        );
    };

    const getDistance = (values) => {
        setError('none')
        setIsLoading(true)
        setDisplayResult('none')

        const initRequest = {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(
                {
                    "origin_location": values.origin,
                    "destiny_location": values.destiny
                }
            )
        };


        fetch('https://deliveryapp-challenge.herokuapp.com/', initRequest)
            .then(function (response) {
                if (!response.ok) {
                    setIsLoading(false);
                    setError('block');
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                setResponse(data);
                setIsLoading(false);
                setDisplayResult('block');
            })


    };

    const getSearchHistory = () => {

        const initRequest = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
        };

        setIsLoading(true)

        fetch('https://deliveryapp-challenge.herokuapp.com/', initRequest)
            .then(response => response.json())
            .then(data => {
                setResponse(data);
                setIsLoading(false);
                setDisplayResult('block');
            })
    }


    return (
        <VStack w='100vh' spacing={6} align='center'>
            <VStack w='80vh' spacing={3} align='stretch'>

                <Form
                    onSubmit={getDistance}
                    validate={validate}
                    render={({
                        handleSubmit,
                        form,
                        errors,
                        submitting,
                        pristine,
                        values
                    }) => (
                        <Box
                            as="form"
                            p={4}
                            onSubmit={handleSubmit}>

                            <InputControl name="origin" label="Origin" placeholder='Street, City' />
                            <InputControl name="destiny" label="Destiny" placeholder='Street, City' />
                            <ButtonGroup spacing={4}>
                                <Button
                                    isLoading={isLoading}
                                    colorScheme='green'
                                    variant='solid'
                                    type='submit'
                                >Calculate</Button>
                                <Button
                                    isLoading={isLoading}
                                    colorScheme='green'
                                    variant='outline'
                                    onClick={getSearchHistory}
                                >Search History</Button>
                            </ButtonGroup>
                        </Box>
                    )}
                />
                <Text display={error}>Route not found, check the addresses.</Text>
            </VStack>
            <VStack display={displayResult} w='100vh' spacing={3} align='stretch'>
                <TableRoute data={response} />
            </VStack >
        </VStack>
    );
}

export default SearchRoute;