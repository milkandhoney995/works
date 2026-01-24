# Works Portfolio

A modern web application showcasing three interactive tools built with cutting-edge technologies.

## 🚀 Features

### 🧮 Calculator
- Full-featured calculator with basic arithmetic operations
- Responsive design that works on all devices
- Built with TypeScript for type safety

### 🧘 Meditation App
- Guided meditation timer with customizable durations (2, 5, 10 minutes)
- Audio and video integration for immersive experience
- Circular progress indicator with smooth animations
- Sound selection (Rain, Beach themes)

### ♟️ Shogi
- Browser-based Japanese chess game
- Supports piece movement rules and promotion
- Handles captured pieces (drops)
- Implemented in `src/app/shogi` and `src/components/shogi`

### ✅ Todo List
- Redux-powered state management
- Add, complete, and delete todos
- Persistent state across sessions
- Clean, modern UI with hover effects

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19
- **Language**: TypeScript
- **Styling**: Sass/SCSS with CSS Modules
- **State Management**: Redux Toolkit
- **Font**: Google Fonts (Inter)
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src
├── app
│   ├── calculator
│   │   ├── _components
│   │   │   └── CalculatorButton.tsx
│   │   ├── _data
│   │   │   └── calculatorButton.ts
│   │   ├── _hooks
│   │   │   └── useCalculator.ts
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── meditationApp
│   │   ├── _components
│   │   │   ├── CircleProgress.tsx
│   │   │   ├── Player.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   ├── SoundPicker.tsx
│   │   │   └── TimeSelector.tsx
│   │   ├── _data
│   │   │   ├── soundOptions.ts
│   │   │   └── timeOptions.ts
│   │   ├── _hooks
│   │   │   └── useMeditationTimer.ts
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── page.module.scss
│   ├── page.tsx
│   ├── shogi
│   │   ├── _components
│   │   │   ├── Board.tsx
│   │   │   ├── Cell.tsx
│   │   │   ├── Hands.tsx
│   │   │   └── ShogiBoardWithPromotion.tsx
│   │   ├── _data
│   │   │   ├── board.ts
│   │   │   └── pieces.ts
│   │   ├── _hooks
│   │   │   └── useShogi.ts
│   │   ├── page.module.scss
│   │   └── page.tsx
│   └── todoList
│       ├── _components
│       │   ├── AddTodo
│       │   │   ├── AddTodo.module.scss
│       │   │   └── AddTodo.tsx
│       │   └── TodoItem
│       │       ├── TodoItem.module.scss
│       │       └── TodoItem.tsx
│       ├── page.module.scss
│       └── page.tsx
├── components
│   ├── Providers.tsx
│   └── card
│       ├── card.module.scss
│       └── index.tsx
├── data
│   └── cards.ts
├── features
│   └── shogi
│       ├── check
│       │   ├── findKingPosition.ts
│       │   ├── isKingInCheck.ts
│       │   └── isUchifuzume.ts
│       ├── move
│       │   ├── applyMove.ts
│       │   ├── getLegalMoves.ts
│       │   ├── moveGenerators.ts
│       │   └── moveRules.ts
│       ├── rules
│       │   └── shogiRules.ts
│       ├── state
│       │   ├── shogiReducer.ts
│       │   ├── shogiState.ts
│       │   └── types.ts
│       └── utils
│           ├── shogiHelpers.ts
│           └── withCheckState.ts
├── store
│   ├── index.ts
│   └── todoSlice.ts
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode Support**: CSS variables for theme switching
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Modern UI**: Clean, minimal design with smooth transitions
- **Sass Architecture**: Centralized variables, mixins, and modular styles

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/milkandhoney995/works.git
cd works
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Home Page (`/`)
Showcases all three applications with navigation cards.

### Calculator (`/calculator`)
- Supports addition, subtraction, multiplication, division
- Clear (AC) and delete (DEL) functions
- Decimal point support
- Real-time display updates

### Meditation App (`/meditationApp`)
- Customizable timer durations
- Background video playback
- Audio controls with play/pause
- Visual progress tracking

### Shogi (`/shogi`)
- Piece movement according to Shogi rules
- Promotion and drop mechanics
- Handles captured pieces
- Real-time board updates

### Todo List (`/todoList`)
- Add new todos
- Mark todos as complete
- Delete todos
- Redux state persistence

## 🔧 Configuration

### TypeScript
- Strict type checking enabled
- Path aliases configured (`@/*` → `./src/*`)
- JSX transform set to `react-jsx`

### Sass
- CSS Modules for component-scoped styles
- Global variables for colors, fonts, and spacing
- Mixins for responsive breakpoints and common patterns

### Redux
- Centralized state management
- Todo slice with actions and reducers
- Provider wrapper for SSR compatibility

## 📱 Responsive Breakpoints

- **Mobile**: < 450px
- **Tablet**: 450px - 700px
- **Desktop**: > 1025px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js, React, and TypeScript
