import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../Styles/Document.css';

function Documents() {
    const [formData, setFormData] = useState({
        aadharCard: null,
        panCard: null,
        landRecords: null,
        rationCard: null,
        patta: null,
        identityProof: null,
        addressProof: null,
        landOwnershipRecords: null,
        cropsGrownRecords: null,
        passportPhoto: null,
        signatureVerification: null,
        existingLoansDetails: '',
        otherDocuments: ''
    });

    const handleChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        setFormData({
            aadharCard: null,
            panCard: null,
            landRecords: null,
            rationCard: null,
            patta: null,
            identityProof: null,
            addressProof: null,
            landOwnershipRecords: null,
            cropsGrownRecords: null,
            passportPhoto: null,
            signatureVerification: null,
            existingLoansDetails: '',
            otherDocuments: ''
        });
    };

    return (
        <div className="documents-page" style={{ display: 'flex' }}>
            <Sidebar />
            <div className="documents-content" style={{ flex: 1, padding: '20px' }}>
                <h1>DOCUMENTS</h1>
                <div className="document-section">
                    <h2>Basic Documents</h2>
                    <form className="document-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="aadharCard">Aadhar Card:</label>
                            <input type="file" id="aadharCard" name="aadharCard" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="panCard">PAN Card:</label>
                            <input type="file" id="panCard" name="panCard" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="landRecords">Land Records:</label>
                            <input type="file" id="landRecords" name="landRecords" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rationCard">Ration Card:</label>
                            <input type="file" id="rationCard" name="rationCard" onChange={handleChange} accept="image/*" />
                        </div>
                       
                        <div className="form-group">
                            <label htmlFor="incomeProof">Income Proof:</label>
                            <input type="file" id="incomeProof" name="incomeProof" onChange={handleChange} accept="image/*" />
                        </div>
                    </form>
                </div>
                <div className="document-section">
                    <h2>Additional Documents</h2>
                    <form className="document-form" onSubmit={handleSubmit}>
                      
                        <div className="form-group">
                            <label htmlFor="landOwnershipRecords">Land Ownership Records:</label>
                            <input type="file" id="landOwnershipRecords" name="landOwnershipRecords" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="patta">Patta:</label>
                            <input type="file" id="patta" name="patta" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cropsGrownRecords">Records of Crops Grown:</label>
                            <input type="file" id="cropsGrownRecords" name="cropsGrownRecords" onChange={handleChange} accept="image/*" />
                        </div>
                      
                        <div className="form-group">
                            <label htmlFor="existingLoansDetails">Details of Existing Loans and Repayment Track Records:</label>
                            <textarea id="existingLoansDetails" name="existingLoansDetails" value={formData.existingLoansDetails} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="otherDocuments">Any Other Document Required by the Bank:</label>
                            <textarea id="otherDocuments" name="otherDocuments" value={formData.otherDocuments} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="document-section">
                    <h2>Photographs</h2>
                    <form className="document-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label htmlFor="passportPhoto">Coloured Passport Size Photograph:</label>
                            <input type="file" id="passportPhoto" name="passportPhoto" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signatureVerification">Signature Verification of Applicants and Guarantor:</label>
                            <input type="file" id="signatureVerification" name="signatureVerification" onChange={handleChange} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="landPhoto">Land PhotoGraph:</label>
                            <input type="file" id="landPhoto" name="landPhoto" onChange={handleChange} accept="image/*" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Documents;
