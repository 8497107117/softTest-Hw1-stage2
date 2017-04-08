import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const InputField = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputField;
