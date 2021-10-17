import React from 'react'
import { Row, Col, FloatingLabel, Form } from 'react-bootstrap'

const SearchInput = ({handleChange}) => {
    return (
        <div>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mt-4">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Search"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Bitcoin" onChange={handleChange} />
                    </FloatingLabel>
                </Col>
            </Row>
        </div>
    )
}

export default SearchInput
