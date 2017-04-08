import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

const InputField = ({ id, validationState, label, errMsg, ...props }) => {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {!!errMsg && <HelpBlock>{errMsg}</HelpBlock>}
    </FormGroup>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  validationState: PropTypes.string,
  label: PropTypes.string.isRequired,
  errMsg: PropTypes.string
};

InputField.defaultProps = {
  validationState: null,
  errMsg: ''
};


export default InputField;
