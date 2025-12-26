'use client';

import classes from '@/app/meditationApp/page.module.scss';

interface Props {
  customMinutes: number;
  setCustomMinutes: (value: number) => void;
  applyCustomTime: () => void;
  closeModal: () => void;
}

const SettingsModal = ({
  customMinutes,
  setCustomMinutes,
  applyCustomTime,
  closeModal,
}: Props) => (
  <div className={classes.meditation__modalOverlay}>
    <div className={classes.meditation__modal}>
      <h2>時間設定（分）</h2>
      <input
        type="number"
        min={1}
        value={customMinutes}
        onChange={(e) => setCustomMinutes(Number(e.target.value))}
      />
      <div className={classes.meditation__modalActions}>
        <button onClick={applyCustomTime}>設定</button>
        <button onClick={closeModal}>キャンセル</button>
      </div>
    </div>
  </div>
);

export default SettingsModal;