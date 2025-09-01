# 🏗️ Arquitetura da Aplicação CodingType

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── AnimatedLogo.js     # Logo com animação de máquina de escrever
│   ├── ControlPanel.js     # Controles (linguagem, timer, próximo código)
│   ├── CodeDisplay.js      # Exibição do código com destaque das palavras
│   ├── TypingInput.js      # Campo de entrada de texto
│   ├── ProgressDisplay.js  # Barra de progresso e estatísticas
│   ├── ResultsModal.js     # Modal de resultados finais
│   └── index.js            # Arquivo de exportação dos componentes
├── contexts/            # Context API para gerenciamento de estado
│   └── TypingContext.js    # Estado global da aplicação de digitação
├── hooks/               # Hooks customizados
│   ├── useTimer.js         # Lógica do timer de 1 minuto
│   └── useTypingLogic.js   # Lógica de digitação e validação
├── utils/               # Utilitários e configurações
│   └── theme.js            # Tema customizado do Material-UI
├── mocks/               # Dados mockados
│   └── codes.mocks.js      # Códigos de exemplo para as linguagens
└── App.js               # Componente principal da aplicação
```

## 🔧 Tecnologias Utilizadas

### **Frontend Framework**
- **React 19** - Framework principal
- **Material-UI v5** - Biblioteca de componentes
- **Emotion** - CSS-in-JS para estilização

### **Gerenciamento de Estado**
- **Context API** - Estado global da aplicação
- **useReducer** - Gerenciamento complexo de estado
- **Custom Hooks** - Lógica reutilizável

### **Fontes e Tipografia**
- **Orbitron** - Logo e títulos
- **JetBrains Mono** - Código e interface
- **Roboto** - Texto geral (Material-UI)

## 🎯 Padrões de Arquitetura

### **1. Separação de Responsabilidades**
- **Componentes**: Apenas apresentação e UI
- **Hooks**: Lógica de negócio e efeitos colaterais
- **Context**: Estado global e actions
- **Utils**: Configurações e utilitários

### **2. Context Pattern**
```javascript
// Estado centralizado com reducer
const [state, dispatch] = useReducer(typingReducer, initialState);

// Actions tipadas
export const TYPING_ACTIONS = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_USER_INPUT: 'SET_USER_INPUT',
  // ...
};
```

### **3. Custom Hooks**
```javascript
// Hook para timer
const { timer, isRunning, start, stop } = useTimer();

// Hook para lógica de digitação
const { handleInputChange, getInputStatus } = useTypingLogic();
```

### **4. Component Composition**
```javascript
// Composição de componentes no App
<TypingProvider>
  <AnimatedLogo />
  <ControlPanel />
  <CodeDisplay />
  <TypingInput />
  <ProgressDisplay />
  <ResultsModal />
</TypingProvider>
```

## 🎨 Sistema de Design

### **Paleta de Cores**
- **Primary**: `#5a4b7c` (Roxo principal)
- **Secondary**: `#6b5a91` (Roxo secundário)
- **Success**: `#4CAF50` (Verde para acertos)
- **Error**: `#f44336` (Vermelho para erros)
- **Warning**: `#ff9800` (Laranja para destacar)

### **Tipografia**
- **Display**: Orbitron (Logo e títulos principais)
- **Code**: JetBrains Mono (Código e input)
- **Body**: Roboto (Texto geral)

### **Componentes Customizados**
- **Styled Components** com tema dinâmico
- **Animações CSS** integradas ao Material-UI
- **Responsividade** mobile-first

## 🔄 Fluxo de Dados

### **1. Inicialização**
```
App → TypingProvider → Estado Inicial
```

### **2. Digitação**
```
TypingInput → useTypingLogic → Context Actions → Estado Atualizado → Componentes Re-renderizam
```

### **3. Timer**
```
useTimer → setInterval → Dispatch Timer Actions → Estado do Timer
```

### **4. Resultados**
```
Timer = 0 → Mostrar Modal → Calcular Estatísticas → Exibir Resultados
```

## 📊 Estado da Aplicação

### **Estado Principal (TypingContext)**
```javascript
{
  selectedLanguage: 'react',
  currentCodeIndex: 0,
  userInput: '',
  currentWordIndex: 0,
  timer: 60,
  isTimerRunning: false,
  showResults: false,
  correctWords: 0,
  incorrectWords: 0,
  totalTypedWords: 0,
  wordStatus: [],
  completedCodes: 0,
  correctCharacters: 0,
  incorrectCharacters: 0,
  totalTypedCharacters: 0,
  hasStartedTyping: false,
}
```

## 🎭 Componentes Detalhados

### **AnimatedLogo**
- Logo com animação de máquina de escrever
- Para animação quando digitação começar
- Responsivo para mobile

### **ControlPanel**
- Seletor de linguagem
- Timer visual
- Botão próximo código
- Layout responsivo (flex → column em mobile)

### **CodeDisplay**
- Exibição do código com syntax highlight
- Destaque de palavras (corretas/incorretas/atual)
- Scroll automático para palavras longas

### **TypingInput**
- Campo de texto com validação visual
- Feedback de cores (verde/vermelho)
- Auto-focus e desabilitado quando timer = 0

### **ProgressDisplay**
- Barra de progresso linear
- Contador de palavras
- Percentual de conclusão

### **ResultsModal**
- Modal responsivo com estatísticas
- Cards organizados em grid
- Ações (tentar novamente / próximo código)

## 🚀 Benefícios da Refatoração

### **Antes (Monolítico)**
- 1 arquivo App.js com 376 linhas
- Estado local complexo com useState
- Lógica misturada com apresentação
- CSS separado e difícil de manter

### **Depois (Modular)**
- 7 componentes especializados
- Estado global com Context + Reducer
- Hooks customizados para lógica
- Estilização integrada com Material-UI
- Tema centralizando design system

### **Vantagens**
- ✅ **Manutenibilidade**: Código organizado e modular
- ✅ **Testabilidade**: Componentes e hooks isolados
- ✅ **Reutilização**: Componentes independentes
- ✅ **Escalabilidade**: Fácil adicionar novas features
- ✅ **Design System**: Tema consistente
- ✅ **Performance**: Re-renders otimizados
- ✅ **Acessibilidade**: Material-UI built-in a11y

## 🛠️ Como Estender

### **Adicionar Nova Linguagem**
1. Atualizar `codes.mocks.js`
2. Adicionar option no `ControlPanel.js`

### **Novo Componente**
1. Criar arquivo em `/components`
2. Usar hooks `useTyping` e `useTypingLogic`
3. Seguir padrões de estilização do tema

### **Nova Feature**
1. Adicionar action em `TypingContext`
2. Implementar no reducer
3. Criar hook se necessário
4. Atualizar componentes
