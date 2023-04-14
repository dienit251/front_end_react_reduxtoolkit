import React, { useEffect } from 'react';
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import styles from './fieldCollection.module.css';
import Filter from './filter';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { fetchMasterData, openFilter } from './fieldCollectionSlice';


function FieldCollectionPage() {
    console.log('render field collection page');

    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(openFilter());
    }
    //fetch master data 
    useEffect(() => {
        dispatch(fetchMasterData());
    }, [])

    return (
        <div style={{ paddingLeft: '5px' }}>
            <Filter />
            <Row className={styles.customRow}>
                <Col md={3}>
                    <InputGroup>
                        <FormControl className="shadow-none"
                            placeholder="Contract no, Customer name, ID Card no"
                            aria-label="Search"
                            aria-describedby="search-icon"
                        />
                        <InputGroup.Text id="search-icon" className={styles.btnSearch}>
                            <FaSearch className={styles.searchIcon} />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col md={1}>
                    <Button variant="contained" fullWidth onClick={openModal}>Filter</Button>
                </Col>

            </Row>
        </div>
    )
}
export default FieldCollectionPage;