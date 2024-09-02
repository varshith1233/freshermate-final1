import React, { useState } from 'react';
import QuestionPaperSelect from '../../Components/QuestionPaper/QuestionPaperSelect/QuestionPaperSelect';
import FetchedQuestionPaper from '../../Components/QuestionPaper/FetchedQuestionPaper/FetchedQuestionPaper';
import QuestionPaperDetail from '../../Components/QuestionPaper/QuestionPaperDetail/QuestionPaperDetail'; // New import

function QuestionPapers() {
  const [data, setData] = useState(null); // State to store the fetched data
  const [isDataFetched, setIsDataFetched] = useState(false); // State to manage conditional rendering
  const [selectedQuestionPaper, setSelectedQuestionPaper] = useState(null); // New state for selected QuestionPaper

  const handleFetchData = (fetchedData) => {
    setData(fetchedData);
    setIsDataFetched(true); // Set flag to show data instead of form
  };

  const handleQuestionPaperClick = (item) => {
    setSelectedQuestionPaper(item); // Set selected QuestionPaper and show detail view
  };

  const handleGoBack = () => {
    setSelectedQuestionPaper(null); // Clear selected QuestionPaper and go back to QuestionPaper list
    setIsDataFetched(true); // Show the list of fetched QuestionPapers
  };

  return (
    <div>
      {selectedQuestionPaper ? (
        <QuestionPaperDetail item={selectedQuestionPaper} onGoBack={handleGoBack} />
      ) : !isDataFetched ? (
        <QuestionPaperSelect onFetchData={handleFetchData} />
      ) : (
        <FetchedQuestionPaper data={data} onGoBack={() => setIsDataFetched(false)} onQuestionPaperClick={handleQuestionPaperClick} />
      )}
    </div>
  );
}

export default QuestionPapers;
