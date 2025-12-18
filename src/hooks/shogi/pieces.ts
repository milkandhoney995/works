// 駒の表示マップ
export const pieceMap: Record<string, string> = {
  // 先手用（小文字）
  p: '歩', l: '香', n: '桂', s: '銀', g: '金', k: '王', r: '飛', b: '角',
  // 後手用（大文字）
  P: '歩', L: '香', N: '桂', S: '銀', G: '金', K: '玉', R: '飛', B: '角',
  // 成り駒
  '+r': '龍', '+b': '馬', '+s': '成銀', '+n': '成桂', '+l': '成香', '+p': 'と',
  '+R': '龍', '+B': '馬', '+S': '成銀', '+N': '成桂', '+L': '成香', '+P': 'と',
};

// 成れる駒と成り後の対応マップ
export const promotable: Record<string, string> = {
  p: '+p', l: '+l', n: '+n', s: '+s', r: '+r', b: '+b',
  P: '+P', L: '+L', N: '+N', S: '+S', R: '+R', B: '+B',
};

// 成駒を元に戻すマップ
export const unpromote: Record<string, string> = {
  '+p': 'p', '+l': 'l', '+n': 'n', '+s': 's', '+r': 'r', '+b': 'b',
  '+P': 'P', '+L': 'L', '+N': 'N', '+S': 'S', '+R': 'R', '+B': 'B',
};