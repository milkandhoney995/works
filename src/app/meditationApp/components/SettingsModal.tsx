'use client';

import { useEffect } from 'react';
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
}: Props) => {
  // Escapeキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  // オーバーレイクリックでモーダルを閉じる
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyCustomTime();
  };

  return (
    <div
      className={classes.meditation__modalOverlay}
      onClick={handleOverlayClick}
    >
      <div className={classes.meditation__modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">時間設定（分）</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min={1}
            value={customMinutes}
            onChange={(e) => setCustomMinutes(Number(e.target.value))}
            aria-label="カスタム時間（分）"
            autoFocus
          />
          <div className={classes.meditation__modalActions}>
            <button type="submit">設定</button>
            <button type="button" onClick={closeModal}>キャンセル</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;