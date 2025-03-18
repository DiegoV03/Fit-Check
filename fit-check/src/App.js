import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './WelcomeScreen';
import SignInPage from './SignInPage';
import EmailPage from './EmailPage';
import NewUserPasswordPage from './NewUserPasswordPage';
import NewUserScreen from './NewUserScreen';
import LandingPage from './LandingPage';
import WelcomeBackScreen from './WelcomeBackScreen';
import FAQPage from './FAQPage';
import AccountPage from './AccountPage';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentPage('signin')} />;
      case 'signin':
        return <SignInPage onNewUser={() => setCurrentPage('email')} onReturningUser={() => setCurrentPage('welcomeBack')} />;
      case 'email':
        return <EmailPage onEmailSubmit={() => setCurrentPage('newUserPassword')} />;
      case 'newUserPassword':
        return <NewUserPasswordPage onPasswordSubmit={() => setCurrentPage('newUserScreen')} />;
      case 'newUserScreen':
        return <NewUserScreen 
                  onYes={() => setCurrentPage('wardrobe')} 
                  onGoHome={() => setCurrentPage('landing')} />;
      case 'welcomeBack':
        return <WelcomeBackScreen onGoHome={() => setCurrentPage('landing')} />;
      case 'landing':
        return <LandingPage 
                  onFAQ={() => setCurrentPage('faq')} 
                  onAccount={() => setCurrentPage('account')} 
               />;
      case 'faq':
        return <FAQPage onGoHome={() => setCurrentPage('landing')} />;
      case 'account':
        return <AccountPage onGoHome={() => setCurrentPage('landing')} />;
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentPage('signin')} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;