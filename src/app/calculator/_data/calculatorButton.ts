export type ButtonType = 'number' | 'operator' | 'special';

export interface CalculatorButtonData {
  label: string;
  onClick?: () => void; // 実際の処理はページ側で渡す
  spanTwo?: boolean;
  type: ButtonType;
  keyMap?: string[]; // キーボード対応用
}

// 配置順に並べる
export const calculatorButtons: CalculatorButtonData[] = [
  { label: 'AC', spanTwo: true, type: 'special', keyMap: ['Escape'] },
  { label: 'DEL', type: 'special', keyMap: ['Backspace'] },
  { label: '÷', type: 'operator', keyMap: ['/'] },

  { label: '1', type: 'number', keyMap: ['1'] },
  { label: '2', type: 'number', keyMap: ['2'] },
  { label: '3', type: 'number', keyMap: ['3'] },
  { label: '*', type: 'operator', keyMap: ['*'] },

  { label: '4', type: 'number', keyMap: ['4'] },
  { label: '5', type: 'number', keyMap: ['5'] },
  { label: '6', type: 'number', keyMap: ['6'] },
  { label: '+', type: 'operator', keyMap: ['+'] },

  { label: '7', type: 'number', keyMap: ['7'] },
  { label: '8', type: 'number', keyMap: ['8'] },
  { label: '9', type: 'number', keyMap: ['9'] },
  { label: '-', type: 'operator', keyMap: ['-'] },

  { label: '.', type: 'number', keyMap: ['.'] },
  { label: '0', type: 'number', keyMap: ['0'] },
  { label: '=', spanTwo: true, type: 'special', keyMap: ['Enter', '='] },
];