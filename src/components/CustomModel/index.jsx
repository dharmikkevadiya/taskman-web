import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const CustomModel = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Return null if the modal is not open
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

CustomModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModel;
