import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import '../Styles/LoanCalculator.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTerm, setLoanTerm] = useState(2);
  const [repaymentTerm, setRepaymentTerm] = useState(12);
  const [totalPayment, setTotalPayment] = useState(0);
  const [interestPayment, setInterestPayment] = useState(0);
  const [principalPayment, setPrincipalPayment] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState(0);

  useEffect(() => {
    calculateLoan();
  }, []);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; 
    const term = parseFloat(loanTerm) * 12; 
    const monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -term));
    const totalPaymentValue = monthlyPayment * term;
    const totalInterestPayment = totalPaymentValue - principal;
    setTotalPayment(totalPaymentValue.toFixed(2));
    setInterestPayment(totalInterestPayment.toFixed(2));
    setPrincipalPayment(principal.toFixed(2));
  };

  const calculateRepayment = () => {
    const term = parseFloat(repaymentTerm);
    const totalPaymentValue = parseFloat(totalPayment);
    const repayment = totalPaymentValue / term;
    setRepaymentAmount(repayment.toFixed(2));
  };

  const handleCalculate = () => {
    calculateLoan();
  };

  const handleCalculateRepayment = () => {
    calculateRepayment();
  };

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Loan Payment Distribution',
    },
    data: [{
      type: 'pie',
      startAngle: 75,
      toolTipContent: '<b>{label}</b>: {y}',
      showInLegend: 'true',
      legendText: '{label}',
      indexLabelFontSize: 16,
      indexLabel: '{label} - {y}',
      dataPoints: [
        { y: parseFloat(interestPayment), label: 'Interest Payment' },
        { y: parseFloat(principalPayment), label: 'Principal Payment' },
      ],
    }],
  };

  return (
  <body className='calc-body'>
     <div className='calc'> 
    <h2>Loan Calculator</h2>
      <div className='loan-calculator'>
       
      <div className='calculator-container'>
        <label className='label'>
          Loan Amount:
          <input className='input-field' type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        </label>
        <label className='label'>
          Interest Rate (%):
          <input className='input-field' type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        </label>
        <label className='label'>
          Loan Term (Years):
          <input className='input-field' type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
        </label>
        <button className='button' onClick={handleCalculate}>Calculate</button>
      </div>

      {totalPayment > 0 && (
        <div className='summary-container'>
          <h3>Loan Summary</h3>
          <p>Total Payment: ${totalPayment}</p>
          <p>Interest Payment: ${interestPayment}</p>
          <p>Principal Payment: ${principalPayment}</p>
              <h3>Repayment Details</h3>
          <label className='label'>
            Repayment Term (Months):
            <input className='input-field' type="number" value={repaymentTerm} onChange={(e) => setRepaymentTerm(e.target.value)} />
          </label>
          <button className='button' onClick={handleCalculateRepayment}>Calculate Repayment</button>
          {repaymentAmount > 0 && (
            <p>Repayment Amount per Month: ${repaymentAmount}</p>
          )}
        </div>
      )}

      {totalPayment > 0 && (
        <div className='chart-container'>
          <CanvasJSChart className='chart' options={options} />
        </div>
      )}
      </div>
    </div>
      </body>
 
  );
};

export default LoanCalculator;
