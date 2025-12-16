// 将棋の駒のマッピング
export const pieceMap: Record<string, string> = {
  k: '王', g: '金', s: '銀', n: '桂', l: '香', b: '角', r: '飛', p: '歩',
  K: '玉', G: '金', S: '銀', N: '桂', L: '香', B: '角', R: '飛', P: '歩',
  '+s': '成銀', '+n': '成桂', '+l': '成香', '+b': '馬', '+r': '龍',
  '': ''
};

// 成れる駒と成り後の対応
export const promotable: Record<string, string> = {
  s: '+s', n: '+n', l: '+l', b: '+b', r: '+r',
  S: '+s', N: '+n', L: '+l', B: '+b', R: '+r'
};