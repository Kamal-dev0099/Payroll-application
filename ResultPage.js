import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import logo from './logo.jpg'; // Import your logo file
import './ResultPage.css'; // Import the ResultPage.css file for styling

const ResultPage = () => {
    const [inputData, setInputData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Simulated data (replace with actual API call or data source)
        const fetchData = async () => {
            try {
                // Example API call
                const response = await axios.get('https://api.example.com/results');
                setInputData(response.data); // Assuming response.data is an array of objects
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to download results as CSV
    const downloadResults = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            Object.keys(inputData[0]).join(',') + '\n' +
            inputData.map(data => Object.values(data).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'results.csv');
    };

    // Function to send results via email (dummy function)
    const sendByEmail = () => {
        // Implement email sending functionality here
        alert('Sending results via email');
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Implement logout functionality here
        alert('Logging out');
        // Example: Redirect to logout page or clear session
    };

    return (
        <div className="ResultPage">
            <div className="header">
                <img src={logo} alt="Company Logo" className="logo" />
                <div className="profile-icon" onClick={toggleDropdown}>
                    <img src="profile.png" alt="Profile Icon" className="profile-icon-img" />
                    {showDropdown && (
                        <div className="dropdown-content">
                            <a href="#">Settings</a>
                            <a href="#">Your Profile</a>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="content">
                <h1>Payslip</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Salary</th>
                            <th>Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inputData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.employeeName}</td>
                                <td>${data.salary}</td>
                                <td>${data.bonus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="button-container">
                    <button className="download-button" onClick={downloadResults}>Download as CSV</button>
                    <button className="email-button" onClick={sendByEmail}>Send as Email</button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
