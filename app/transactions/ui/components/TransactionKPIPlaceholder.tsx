'use client'

import { useContext, useEffect, useState } from "react";
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

export const TransactionKPIPlaceholder: React.FC = () => {

    return (
        <>
            <Placeholder animation="wave">
                <Row className='col-12 mb-5'>
                    <Col className='text-center my-auto' ><Placeholder style={{ width: '10rem', height: '10rem' }} bg="secondary" className="rounded-circle me-2" /></Col>
                    <Col className='text-center  my-auto'>
                        <Row className='dflex justify-content-center'><Placeholder as="h1" xs={4} /></Row>
                        <Row><br /></Row>
                        <Row className='dflex justify-content-center'><Placeholder as="h1" xs={2} /></Row>
                    </Col>
                </Row>
            </Placeholder>
        </>
    );
}