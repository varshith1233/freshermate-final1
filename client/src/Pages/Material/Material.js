import React, { useState } from 'react';
import MaterialSelect from '../../Components/Material/MaterialSelect/MaterialSelect';
import FetchedMaterial from '../../Components/Material/FetchedMaterial/FetchedMaterial';
import MaterialDetail from '../../Components/Material/MaterialDetail/MaterialDetail'; // New import

function Material() {
  const [data, setData] = useState(null); // State to store the fetched data
  const [isDataFetched, setIsDataFetched] = useState(false); // State to manage conditional rendering
  const [selectedMaterial, setSelectedMaterial] = useState(null); // New state for selected material

  const handleFetchData = (fetchedData) => {
    setData(fetchedData);
    setIsDataFetched(true); // Set flag to show data instead of form
  };

  const handleMaterialClick = (item) => {
    setSelectedMaterial(item); // Set selected material and show detail view
  };

  const handleGoBack = () => {
    setSelectedMaterial(null); // Clear selected material and go back to material list
    setIsDataFetched(true); // Show the list of fetched materials
  };

  return (
    <div>
      {selectedMaterial ? (
        <MaterialDetail item={selectedMaterial} onGoBack={handleGoBack} />
      ) : !isDataFetched ? (
        <MaterialSelect onFetchData={handleFetchData} />
      ) : (
        <FetchedMaterial data={data} onGoBack={() => setIsDataFetched(false)} onMaterialClick={handleMaterialClick} />
      )}
    </div>
  );
}

export default Material;
