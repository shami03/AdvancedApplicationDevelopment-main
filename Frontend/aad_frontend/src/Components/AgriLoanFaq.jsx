import React from 'react';
import './Faq.css'
const AgriLoanFAQ = () => {
    return (
        <div className="faq-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="faq-title text-center pb-3">
                            <h2>Agricultural Loan FAQ</h2>
                        </div>
                    </div>
                    <div className="col-md-6 offset-md-3">
                        <div className="faq" id="accordion">
                            {/* Question 1 */}
                            <div className="card">
                                <div className="card-header" id="faqHeading-1">
                                    <div className="mb-0">
                                        <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-1" aria-expanded="true" aria-controls="faqCollapse-1">
                                            <span className="badge">1</span> What types of agricultural loans are available for farmers?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-1" className="collapse" aria-labelledby="faqHeading-1" data-parent="#accordion">
                                    <div className="card-body">
                                        There are various types of agricultural loans available, including operating loans, equipment loans, real estate loans, and lines of credit.
                                    </div>
                                </div>
                            </div>

                            {/* Question 2 */}
                            <div className="card">
                                <div className="card-header" id="faqHeading-2">
                                    <div className="mb-0">
                                        <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-2" aria-expanded="false" aria-controls="faqCollapse-2">
                                            <span className="badge">2</span> How can farmers apply for agricultural loans to finance their farming operations?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-2" className="collapse" aria-labelledby="faqHeading-2" data-parent="#accordion">
                                    <div className="card-body">
                                        Farmers can apply for agricultural loans through banks, credit unions, or agricultural lending institutions. They typically need to submit an application along with supporting documents such as financial statements, business plans, and collateral.
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="faqHeading-2">
                                    <div className="mb-0">
                                        <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-2" aria-expanded="false" aria-controls="faqCollapse-2">
                                            <span className="badge">3</span> How can farmers apply for agricultural loans to finance their farming operations?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-2" className="collapse" aria-labelledby="faqHeading-2" data-parent="#accordion">
                                    <div className="card-body">
                                        Farmers can apply for agricultural loans through banks, credit unions, or agricultural lending institutions. They typically need to submit an application along with supporting documents such as financial statements, business plans, and collateral.
                                    </div>
                                </div>
                            </div>

                            {/* Repeat similar structure for remaining questions */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgriLoanFAQ;
