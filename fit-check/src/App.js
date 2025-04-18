import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './WelcomeScreen';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage'; //Import SignUpPage
import EmailPage from './EmailPage';
import NewUserPasswordPage from './NewUserPasswordPage';
import NewUserScreen from './NewUserScreen';
import LandingPage from './LandingPage';
import WelcomeBackScreen from './WelcomeBackScreen';
import FAQPage from './FAQPage';
import AccountPage from './AccountPage';
import LinkClothingAdder from './LinkClothingAdder';
import ManualClothingAdder from './ManualClothingAdder';
import AccessCurrWardrobe from './AccessCurrWardrobe';
import OutfitSelector from './OutfitSelector';
import StyleSearch from './StyleSearch'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentPage('signin')} />;
      case 'signin':
        return <SignInPage onNewUser={() => setCurrentPage('signup')} onReturningUser={() => setCurrentPage('welcomeBack')} />;
      case 'signup':
        return <SignUpPage onSignIn={() => setCurrentPage('signin')} />;
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
                  onAddClothing={() => setCurrentPage('linkClothingAdder')} 
                  onAccessWardrobe={() => setCurrentPage('accessCurrWardrobe')} 
                  onChooseOutfit={() => setCurrentPage('outfitSelector')}
                  onSearchStyles={() => {
                    console.log('Attempting to go to styleSearch');
                    setCurrentPage('styleSearch');
                  }}
                  onBackToMenu={() => setCurrentPage('welcome')} 
               />;
      case 'faq':
        return <FAQPage onGoHome={() => setCurrentPage('landing')} />;
      case 'account':
        return <AccountPage onGoHome={() => setCurrentPage('landing')} />;
      case 'linkClothingAdder':
        return <LinkClothingAdder 
                  onEnterManually={() => setCurrentPage('manualClothingAdder')} 
                  onGoBack={() => setCurrentPage('landing')} 
               />;
      case 'manualClothingAdder':
        return <ManualClothingAdder onGoBack={() => setCurrentPage('linkClothingAdder')} />;
      case 'accessCurrWardrobe':
        return <AccessCurrWardrobe onGoBack={() => setCurrentPage('landing')} />;
      case 'outfitSelector':
        return <OutfitSelector 
                  onRemakeFit={() => setCurrentPage('outfitSelector')} 
                  onGoBack={() => setCurrentPage('landing')} 
               />;
      case 'styleSearch':
        return <StyleSearch onGoBack={() => setCurrentPage('landing')} />;
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