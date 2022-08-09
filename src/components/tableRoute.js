import {
    React,
} from 'react';
import {
    VStack,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react';


const TableRoute = (props) => {
    return (
        <VStack align='left'>
        <Table size='sm' variant='simple'>
            <Thead>
                <Tr>
                    <Th>Date</Th>
                    <Th>Origin</Th>
                    <Th>Destiny</Th>
                    <Th>Distance</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.data.slice().reverse().map((item, i) => (
                    <Tr key={i}>
                        <Td>{new Date(item.created_at).toLocaleString()}</Td>
                        <Td>{item.origin_location}</Td>
                        <Td>{item.destiny_location}</Td>
                        <Td isNumeric>{item.distance_path} km</Td>
                    </Tr>
                ))}

            </Tbody>

        </Table>

        </VStack>
        
    );
}

export default TableRoute;