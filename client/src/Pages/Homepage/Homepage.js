import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeCard from '../../Components/HomeCard/HomeCard';
import './Homepage.css'
import Spinner from '../../Utility/Spinner/Spinner';

function Homepage() {
  const [Blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/blog/getallblogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response data for debugging
        console.log(response.data);

        // Update the state with the fetched data
        if (response.data.code === 200) {
          setBlog(response.data.data);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      {
        Blog.length > 0 ? Blog.map((item, index) => (
          <HomeCard key={index} data={item} />
        )) : <Spinner />
      }
    </div>
  );
}

export default Homepage;
