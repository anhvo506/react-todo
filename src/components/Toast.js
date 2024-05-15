import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Toast = ({ message, show }) => {
    return (
        show && (
            <div className="toast">
                <FontAwesomeIcon icon={faInfoCircle} className="toast-icon" />
                {message}
            </div>
        )
    );
}

export default Toast;
