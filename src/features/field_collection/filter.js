import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeFilter } from './fieldCollectionSlice';
import styles from './fieldCollection.module.css';
import Select from 'react-select';
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Col, FormControl, InputGroup, Row, Button } from 'react-bootstrap';

function Filter() {
    const dispatch = useDispatch();
    const isShowFilter = useSelector(state => state.fieldCollection.isShowFilter);
    const masterData = useSelector(state => state.fieldCollection.masterData);

    //filter states
    const [agreementNo, setAgreementNo] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [idNo, setIdNo] = useState('');
    const [fcs, setFcs] = useState([]);
    const [visitResult, setVisitResult] = useState([]);
    const [product, setProduct] = useState([]);
    const [begin, setBegin] = useState([]);
    const [paidStatus, setPaidStatus] = useState([]);
    const [allocationStatus, setAllocationStatus] = useState([]);

    const clearFilter = () => {
        setAgreementNo('');
        setCustomerName('');
        setIdNo('');
        setFcs([]);
        setVisitResult([]);
        setProduct([]);
        setBegin([]);
        setPaidStatus([]);
        setAllocationStatus([]);
        setSelectedState([]);
        setSelectedDistrict([]);
    }

    const onApply = () => {
        const filter = {
            agreementNo: agreementNo, customerName: customerName, idNo: idNo,
            fcs: fcs.map(x => { return x.value }), visitResult: visitResult.map(x => { return x.value }), product: product.map(x => { return x.value }),
            begin: begin.map(x => { return x.value }), selectedState: selectedState.map(x => { return x.value }), selectedDistrict: selectedDistrict.map(x => { return x.value }),
            dateRange: dateRange, paidStatus: paidStatus.map(x => { return x.value }), allocationStatus: allocationStatus.map(x => { return x.value })
        }
        console.log(filter);
    }

    //handle state and district change
    const [selectedState, setSelectedState] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const stateOptions = masterData?.areas?.map((area) => ({
        label: area.label,
        value: area.value,
    })) || [];
    const selectedStateValues = selectedState.map((state) => state.value);
    const districtOptions = selectedState.length > 0 ? masterData.areas
        .filter((area) => selectedStateValues.includes(area.value))
        .flatMap((area) => area.districts) : [];
    const handleStateChange = (selectedState) => {
        setSelectedState(selectedState);
        if (!selectedState.length) {
            setSelectedDistrict([]);
        }
    };
    const handleDistrictChange = (selectedDistrict) => {
        setSelectedDistrict(selectedDistrict);
    };

    //date range picker
    const [dateRange, setDateRange] = useState(null);
    var today = new Date()
    var firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    var lastDay = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    const close = () => {//close filter
        dispatch(closeFilter());
    }



    const customSelectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            marginBottom: '0.5rem'
        }),
    };

    return (
        <Modal show={isShowFilter} onHide={close} size='lg'>
            <Modal.Header closeButton><h4>Filter</h4></Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Row>
                    <Col md={6}>
                        <label>Agreement no</label>
                        <input className="form-control shadow-none" style={{ height: '2.9rem' }} value={agreementNo} onChange={event => setAgreementNo(event.target.value)} />
                        <label>Customer name</label>
                        <input className="form-control shadow-none" style={{ height: '2.9rem' }} value={customerName} onChange={event => setCustomerName(event.target.value)} />
                        <label>Id no</label>
                        <input className="form-control shadow-none" style={{ height: '2.9rem' }} value={idNo} onChange={event => setIdNo(event.target.value)} />
                        <label>FC</label>
                        <Select styles={customSelectStyles}
                            options={masterData?.fcs}
                            isMulti
                            value={fcs}
                            onChange={(data) => setFcs(data)}
                        />
                        <label>Visit result</label>
                        <Select styles={customSelectStyles}
                            options={masterData?.statuses}
                            isMulti
                            value={visitResult}
                            onChange={(data) => setVisitResult(data)}
                        />
                        <label>Product</label>
                        <Select styles={customSelectStyles}
                            options={masterData?.products}
                            isMulti
                            value={product}
                            onChange={(data) => setProduct(data)}
                        />
                    </Col>
                    <Col md={6}>
                        <label>Begin</label>
                        <Select styles={customSelectStyles}
                            options={masterData?.begins}
                            isMulti
                            value={begin}
                            onChange={(data) => setBegin(data)}
                        />
                        <label>State</label>
                        <Select styles={customSelectStyles}
                            options={stateOptions}
                            value={selectedState}
                            onChange={handleStateChange}
                            isMulti
                        />
                        <label>District</label>
                        <Select styles={customSelectStyles}
                            options={districtOptions}
                            isMulti
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            isDisabled={selectedState.length === 0}
                        />
                        <label>Last visit date</label>
                        <DateRangePicker
                            initialSettings={{
                                startDate: firstDay, endDate: lastDay, locale: {
                                    format: 'DD/MM/YYYY'
                                }

                            }}
                            onCallback={(start, end, label) => {
                                var range = moment(start).format('DD/MM/yyyy') + ' - ' + moment(end).format('DD/MM/yyyy')
                                setDateRange(range)
                            }}
                        >
                            <input type="text" id="daterangepicker" className="form-control shadow-none" style={{ height: '2.9rem' }}></input>
                        </DateRangePicker>
                        <label>Paid status</label>
                        <Select styles={customSelectStyles}
                            options={[{ label: 'All', value: 'All' }, { label: 'Paid', value: 'Paid' }, { label: 'Not yet pay', value: 'Not yet pay' }]}
                            isMulti
                            value={paidStatus}
                            onChange={(data) => setPaidStatus(data)}
                        />
                        <label>Allocation status</label>
                        <Select styles={customSelectStyles}
                            options={[{ label: 'New', value: 'New' }, { label: 'Allocated', value: 'Allocated' }, { label: 'Revoked', value: 'Revoked' }]}
                            isMulti
                            value={allocationStatus}
                            onChange={(data) => setAllocationStatus(data)}
                        />
                    </Col>
                </Row>


            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button className={styles.footerBtn} onClick={onApply}>Apply</Button>
                    <Button className={styles.footerBtn} onClick={clearFilter}>Clear</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default Filter;