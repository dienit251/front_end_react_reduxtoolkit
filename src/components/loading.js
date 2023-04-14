import React from 'react';
import { Modal } from 'react-bootstrap';

function Loading() {
    return (
        <Modal show={true}>
            <Modal.Body>
                <h1 style={{ textAlign: 'center' }}>Loading...</h1>
            </Modal.Body>
        </Modal>
    )
}

export default Loading;