import React from 'react';

function MaterialCard({ item, onGoBack }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Material Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Detailed View</h5>
          <p className="card-text">{item}</p>
          <button className="btn btn-secondary" onClick={onGoBack}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaterialCard;
