import React, { useState, useEffect } from 'react';
import './App.css';
import codingMock from './mocks/codes.mocks';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('react');
  const [currentCodeIndex, setCurrentCodeIndex] = useState(() => {
    // Começar com um código aleatório do React
    return Math.floor(Math.random() * codingMock.data.react.length);
  });
  const [userInput, setUserInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timer, setTimer] = useState(60); // 1 minuto em segundos
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [totalTypedWords, setTotalTypedWords] = useState(0);
  const [wordStatus, setWordStatus] = useState([]); // Para rastrear status de cada palavra
  const [completedCodes, setCompletedCodes] = useState(0); // Quantidade de códigos completados
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [incorrectCharacters, setIncorrectCharacters] = useState(0);
  const [totalTypedCharacters, setTotalTypedCharacters] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false); // Para controlar a animação do logo

  // Função para obter índice aleatório de código
  const getRandomCodeIndex = (language) => {
    const codes = codingMock.data[language];
    return Math.floor(Math.random() * codes.length);
  };

  const currentCode = codingMock.data[selectedLanguage][currentCodeIndex]?.code || '';
  const words = currentCode.split(/\s+/).filter(word => word.length > 0);

  // Timer countdown (1 minuto)
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCurrentCodeIndex(getRandomCodeIndex(newLanguage));
    resetTest();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Marcar que a digitação começou na primeira tecla
    if (!hasStartedTyping && value.length > 0) {
      setHasStartedTyping(true);
    }
    
    // Iniciar timer na primeira digitação
    if (!isTimerRunning && value.length > 0 && timer === 60) {
      setIsTimerRunning(true);
    }

    // Não permitir espaços múltiplos ou espaços no início
    if (value.includes('  ') || value.startsWith(' ')) {
      return;
    }

    setUserInput(value);

    // Verificar se terminou com espaço
    if (value.endsWith(' ')) {
      checkCurrentWord();
    }
  };

  const handleKeyDown = (e) => {
    if (timer === 0) return; // Não permitir digitação após o tempo acabar

    // Permitir Shift+Enter para quebra de linha
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      checkCurrentWord();
      setUserInput(''); // Reset input
    }
    // Enter normal verifica a palavra
    else if (e.key === 'Enter') {
      e.preventDefault();
      checkCurrentWord();
      setUserInput(''); // Reset input
    }
    // Espaço verifica a palavra automaticamente pelo handleInputChange
  };

  const checkCurrentWord = () => {
    if (currentWordIndex >= words.length) return;

    const typedWord = userInput.trim();
    const currentWord = words[currentWordIndex];

    // Só verificar se há texto digitado
    if (!typedWord) {
      setUserInput(''); // Reset input se estiver vazio
      return;
    }

    if (currentWord) {
      // Comparação case-sensitive exata
      const isCorrect = typedWord === currentWord;
      
      // Contar caracteres
      const typedCharCount = typedWord.length;
      const correctCharCount = currentWord.length;
      
      if (isCorrect) {
        // Palavra correta - todos os caracteres são corretos
        setCorrectCharacters(prev => prev + correctCharCount);
      } else {
        // Palavra incorreta - contar caracteres corretos e incorretos
        let correctChars = 0;
        const minLength = Math.min(typedWord.length, currentWord.length);
        
        for (let i = 0; i < minLength; i++) {
          if (typedWord[i] === currentWord[i]) {
            correctChars++;
          }
        }
        
        setCorrectCharacters(prev => prev + correctChars);
        setIncorrectCharacters(prev => prev + (typedCharCount - correctChars) + Math.max(0, correctCharCount - typedCharCount));
      }
      
      setTotalTypedCharacters(prev => prev + typedCharCount);
      
      // Atualizar status da palavra
      setWordStatus(prev => {
        const newStatus = [...prev];
        newStatus[currentWordIndex] = isCorrect ? 'correct' : 'incorrect';
        return newStatus;
      });
      
      if (isCorrect) {
        setCorrectWords(prev => prev + 1);
      } else {
        setIncorrectWords(prev => prev + 1);
      }
      
      setTotalTypedWords(prev => prev + 1);
      setCurrentWordIndex(prev => prev + 1);
      setUserInput(''); // Reset input após verificação
      
      // Verificar se completou o código
      if (currentWordIndex + 1 >= words.length) {
        // Incrementar contador de códigos completados
        setCompletedCodes(prev => prev + 1);
        
        // Se ainda há tempo, ir para o próximo código
        if (timer > 0 && isTimerRunning) {
          setCurrentCodeIndex(getRandomCodeIndex(selectedLanguage));
          setCurrentWordIndex(0);
          setWordStatus([]); // Reset status das palavras para o novo código
        } else {
          setIsTimerRunning(false);
          setShowResults(true);
        }
      }
    }
  };

  const resetTest = () => {
    setUserInput('');
    setCurrentWordIndex(0);
    setTimer(60);
    setIsTimerRunning(false);
    setShowResults(false);
    setCorrectWords(0);
    setIncorrectWords(0);
    setTotalTypedWords(0);
    setWordStatus([]);
    setCompletedCodes(0);
    setCorrectCharacters(0);
    setIncorrectCharacters(0);
    setTotalTypedCharacters(0);
    setHasStartedTyping(false); // Reset da animação do logo
  };

  const getNextCode = () => {
    setCurrentCodeIndex(getRandomCodeIndex(selectedLanguage));
    
    // Se o timer não está rodando, resetar teste completo
    // Se está rodando, só resetar palavra atual e status
    if (!isTimerRunning) {
      resetTest();
    } else {
      setCurrentWordIndex(0);
      setUserInput('');
      setWordStatus([]);
    }
  };

  const closeResults = () => {
    setShowResults(false);
    resetTest();
  };

  const calculateWPM = () => {
    const timeElapsed = (60 - timer) / 60; // tempo em minutos
    return timeElapsed > 0 ? Math.round(correctWords / timeElapsed) : 0;
  };

  const calculateAccuracy = () => {
    return totalTypedWords > 0 ? Math.round((correctWords / totalTypedWords) * 100) : 0;
  };

  const renderCode = () => {
    return words.map((word, index) => {
      let className = '';
      if (index < currentWordIndex) {
        // Usar o status real da palavra digitada
        const status = wordStatus[index];
        if (status === 'correct') {
          className = 'word-correct';
        } else if (status === 'incorrect') {
          className = 'word-incorrect';
        }
      } else if (index === currentWordIndex) {
        className = 'word-current';
      }

      return (
        <span key={index} className={className}>
          {word}{' '}
        </span>
      );
    });
  };

  const getInputStatus = () => {
    if (!userInput || timer === 0) return '';
    
    const currentWord = words[currentWordIndex];
    const trimmedInput = userInput.trim();
    
    if (currentWord && currentWord.startsWith(trimmedInput)) {
      return 'input-correct';
    }
    return 'input-incorrect';
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="logo">
          <span className="logo-coding">typing</span>
          <span className={`logo-type ${hasStartedTyping ? 'typing-started' : ''}`}>code</span>
        </h1>
        
        <div className="controls">
          <div className="language-selector">
            <label htmlFor="language">Linguagem: </label>
            <select 
              id="language" 
              value={selectedLanguage} 
              onChange={handleLanguageChange}
            >
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="java">Java</option>
              <option value="swift">Swift</option>
            </select>
          </div>
          
          <div className="timer">
            {formatTime(timer)}
          </div>
          
          <button onClick={getNextCode} className="next-button">
            Próximo Código
          </button>
        </div>

        <div className="code-display">
          <pre>{renderCode()}</pre>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite a palavra atual..."
            className={`typing-input ${getInputStatus()}`}
            disabled={timer === 0}
          />
        </div>

        <div className="progress">
          Progresso: {currentWordIndex} / {words.length} palavras
        </div>

        {showResults && (
          <div className="modal-overlay">
            <div className="results-modal">
              <h2>Resultado</h2>
              <div className="results-content">
                <div className="result-item wpm">
                  <div className="result-value">{calculateWPM()}</div>
                  <div className="result-label">PPM</div>
                  <div className="result-subtitle">(palavras por minuto)</div>
                </div>
                
                <div className="result-item">
                  <div className="result-label">Palavras</div>
                  <div className="result-value">
                    <span className="correct">({correctWords}</span>
                    <span className="separator"> | </span>
                    <span className="incorrect">{incorrectWords})</span>
                    <span className="total"> {totalTypedWords}</span>
                  </div>
                </div>
                
                <div className="result-item">
                  <div className="result-label">Caracteres digitados</div>
                  <div className="result-value">
                    <span className="correct">({correctCharacters}</span>
                    <span className="separator"> | </span>
                    <span className="incorrect">{incorrectCharacters})</span>
                    <span className="total"> {totalTypedCharacters}</span>
                  </div>
                </div>
                
                <div className="result-item">
                  <div className="result-label">Precisão</div>
                  <div className="result-value">{calculateAccuracy()}%</div>
                </div>
                
                <div className="result-item">
                  <div className="result-label">Códigos completados</div>
                  <div className="result-value correct">{completedCodes}</div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button onClick={closeResults} className="close-button">
                  Tentar Novamente
                </button>
                <button onClick={getNextCode} className="next-code-button">
                  Próximo Código
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
