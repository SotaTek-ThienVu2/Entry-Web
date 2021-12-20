import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/Modal.css';
import OrderForm from './OrderForm';
const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <h1>Create Order Form</h1>
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <OrderForm hide={hide} />
                </div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;