import React, { useState, useEffect } from 'react';
import '../css/youtube.css';

function YouTube(props) {
  const { link } = props;
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="YouTube">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <iframe
              title="YouTube Video"
              width="700"
              height="394"
              src={link}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default YouTube;
