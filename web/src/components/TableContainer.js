import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Input,
} from 'reactstrap';
import './TableContainer.scss';

export const TableContainer = ({
  pageSizeOptions,
  pageSize,
  children,
  searchValue,
  className,
  handlePageSizeChange,
  handleFilterSearch,
  page,
  totalPages,
}) => (
  <Container fluid className="file-manager__filters">
    <Card className={'p-0 ' + (className ? className : '')}>
      <CardHeader className="p-1">
        <Row>
          <Col className="file-manager__filters__rows d-flex" md="6">
            <span className="table-row-text">Show</span>
            <Input
              id="table-row-width"
              type="select"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {pageSizeOptions.map((size, idx) => (
                <option key={idx} value={size}>
                  {size} {'rows'}
                </option>
              ))}
            </Input>
            {page ? (
              <span className="table-row-text">
                Page: {page} of {totalPages}
              </span>
            ) : null}
          </Col>

          <Col className="file-manager__filters__search d-flex" md="6">
            {handleFilterSearch ? (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  onChange={handleFilterSearch}
                  id="default-search"
                  value={searchValue ? searchValue : ''}
                  className="table-search-bar"
                />
              </InputGroup>
            ) : null}
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="p-0">{children}</CardBody>
    </Card>
  </Container>
);

TableContainer.defaultProps = {
  pageSizeOptions: [5, 10, 15, 20, 25, 30],
  pageSize: 10,
};
