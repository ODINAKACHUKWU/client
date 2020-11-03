import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import "../assets/stylesheets/containers/modal.scss";

function Modal({ handleClose, show, component }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main p-5">
        <div
          type="button"
          className="d-flex justify-content-end mb-3"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faWindowClose} size="lg" />
        </div>
        {component}
      </section>
    </div>
  );
}

export default Modal;
