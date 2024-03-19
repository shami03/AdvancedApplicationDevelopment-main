import React from 'react';
import '../Styles/Home.css'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Agri Tech - An Agriculture Loan portal</h1>
        <p>Get the financial support you need for your agricultural endeavors.</p>
        <br/>
      <br/>
      <button class="custom-btn btn-13">Get started !</button>
      </header>
      <section className="cards">
        <div className="card">
          <img className='flex-img' src="https://franchiseindia.s3.ap-south-1.amazonaws.com/opp/article/english/images/1993519797.jpg" alt="Card 1" />
          <h2>Flexible Loan Options</h2>

          <p>
          Choose from a range of loan options including seasonal loans, equipment financing, and crop loans. Our flexible options are designed to meet the unique needs of farmers and agricultural businesses, ensuring you get the support you need.
          </p>
        </div>
        <div className="card">
          <img className='flex-img ' src="https://lendingplate.com/blog/wp-content/uploads/2023/08/Instant-Loan-Approval.png" alt="Card 2" />
          <h2>Quick Approval</h2>
<p>Experience a quick and hassle-free approval process. With our streamlined procedures and online application options, you can get approved for your agricultural loan in no time, ensuring you have access to funds when you need them.</p>
        </div>
        <div className="card">
          <img className='flex-img' src="https://t3.ftcdn.net/jpg/05/81/98/00/360_F_581980018_GZROGPMtTORPuHY1UGI5KnGTmPJ31jTT.jpg" alt="Card 3" />
          <h2>Low Intrest Rates</h2>
<p>
Benefit from competitive interest rates tailored for agricultural loans. Our rates are among the lowest in the industry, helping you save on financing costs and maximize your profits.</p>        </div>
      </section>
      <div id='ser'>
      <section>
      <header className='head'>
        <h1>OUR LOAN SERVICES</h1>
      </header>
      <div className="header">
      <div className="header-content">
  <h3>Crop Loans</h3>
  <p>Crop loans are one of the most common types of agricultural financing. These loans are specifically designed to help farmers cover the expenses associated with crop production, including purchasing seeds, fertilizers, pesticides, and other inputs necessary for cultivation.</p>
  <p>Key features of crop loans include:</p>
  <ul>
    <li><strong>Low Interest Rates:</strong> Many crop loans come with competitive interest rates, helping farmers minimize financing costs and maximize profits.</li>
    <li><strong>Collateral Options:</strong> Depending on the lender and loan terms, farmers may be able to use their crops or land as collateral to secure the loan.</li>
    <li><strong>Quick Approval:</strong> With streamlined application processes and online platforms, farmers can often get quick approval for crop loans, ensuring timely access to funds.</li>
  </ul>
  <br/>
  <p>Whether you're a small-scale farmer or a large agricultural enterprise, crop loans can provide the financial support you need to invest in your crops and achieve a successful harvest.</p>
</div>

  <div className="header-image">
    <img src="https://images.tv9telugu.com/wp-content/uploads/2023/02/interest-free-loans-for-farmers.jpg" alt="Header Image" />
  </div>
</div>
      
      </section>
      </div>
      
<footer class="footer">
  <div class="footer__addr">
    <h1 class="footer__logo">Agri Tech</h1>
        
    <h2>Contact</h2>
    
    <address>
      1234 Somewhere In  India<br/>
          
      <a class="footer__btn" href="mailto:sivasankarkuppusamy1606@gmail.com">Email Us</a>
    </address>
  </div>
  
  <ul class="footer__nav">
    <li class="nav__item">
      <h2 class="nav__title">Loans</h2>

      <ul class="nav__ul">
        <li>
          <Link to="loan-list">Crop Loan</Link>
        </li>

        <li>
          <a href="#">Intrest</a>
        </li>
            
        <li>
          <Link to='loan-calculator'>Emi calculator</Link>
        </li>
      </ul>
    </li>
    
    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">Lenders</h2>
      
      <ul class="nav__ul nav__ul--extra">
        <li>
        <Link to="loan-list">Bank</Link>
        </li>
        
        <li>
          <a href="#">Private Lenders</a>
        </li>
        
        <li>
          <a href="#">Documents</a>
        </li>
        
        <li>
        <Link to="/login">Login</Link>
        </li>
        
        <li>
        <Link to="/register">Register</Link>
        </li>
        
        <li>
          <a href="#">Complaints</a>
        </li>
      </ul>
    </li>
    
    <li class="nav__item">
      <h2 class="nav__title">Legal</h2>
      
      <ul class="nav__ul">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        
        <li>
          <a href="#">Terms of Use</a>
        </li>
        
        <li>
          <a href="#">Sitemap</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div class="legal">
    <p>&copy; 2024 AgriTech. All rights reserved.</p>
    
    <div class="legal__links">
      <span>Made with <span class="heart">♥</span> by Siva</span>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;
